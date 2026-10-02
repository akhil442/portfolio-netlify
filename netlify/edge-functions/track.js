/* POST /api/track — first-party analytics ingestion (Netlify Edge Function).
 *
 * Privacy rules enforced here:
 * - Only an allowlist of event types is accepted.
 * - No IP addresses are stored. Location is coarse only: country + region
 *   code from Netlify's server-side geo (no GPS, nothing precise).
 * - No keystrokes, form contents, or mouse movements are ever collected
 *   (the client never sends them).
 * - Secrets (notification credentials) live in Netlify environment variables,
 *   never in client-side code.
 */
import { getStore } from "@netlify/blobs";

export const config = { path: "/api/track" };

const ALLOWED = new Set([
  "page_view",
  "resume_click",
  "project_click",
  "experience_view",
  "contact_click",
]);

function notifyText(title, event) {
  const loc = [event.region, event.country].filter(Boolean).join(", ");
  let text = `${title}\nTime: ${event.ts}\nPage: ${event.page}`;
  if (event.label) text += `\nDetail: ${event.label}`;
  if (loc) text += `\nFrom: ${loc}`;
  return text;
}

async function sendNotification(title, event) {
  const channel = (Netlify.env.get("NOTIFY_CHANNEL") || "ntfy").toLowerCase();
  const text = notifyText(title, event);
  try {
    if (channel === "ntfy") {
      // ntfy.sh: free, no signup. NTFY_TOPIC is a long random string (the secret).
      const topic = Netlify.env.get("NTFY_TOPIC");
      if (!topic) return;
      await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
        method: "POST",
        body: text,
        headers: { Title: title, Tags: "eye" },
      });
    } else if (channel === "telegram") {
      const token = Netlify.env.get("TELEGRAM_BOT_TOKEN");
      const chatId = Netlify.env.get("TELEGRAM_CHAT_ID");
      if (!token || !chatId) return;
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
    } else if (channel === "resend") {
      const apiKey = Netlify.env.get("RESEND_API_KEY");
      const to = Netlify.env.get("NOTIFY_EMAIL");
      if (!apiKey || !to) return;
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: Netlify.env.get("RESEND_FROM") || "portfolio@resend.dev",
          to: [to],
          subject: title,
          text,
        }),
      });
    }
  } catch {
    // A notification failure must never break event logging.
  }
}

export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const type = typeof body.type === "string" ? body.type : "";
  const sessionId =
    typeof body.sessionId === "string" ? body.sessionId.slice(0, 64) : "";
  if (!ALLOWED.has(type) || !sessionId) {
    return new Response("Bad request", { status: 400 });
  }

  const geo = context.geo || {};
  const event = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    type,
    sessionId,
    page: String(body.page || "/").slice(0, 200),
    label: String(body.label || "").slice(0, 200),
    ts: new Date().toISOString(),
    // Coarse only — no city, no IP, nothing precise.
    country: (geo.country && geo.country.code) || "",
    region: (geo.subdivision && geo.subdivision.code) || "",
  };

  const store = getStore("portfolio-events");
  await store.setJSON(event.id, event);

  // Notification grouping: at most one notification per event type per
  // anonymous session. experience_view is logged only (no notification).
  const stateKey = `notified:${sessionId}`;
  const state = (await store.get(stateKey, { type: "json" })) || {};
  let title = null;
  if (type === "page_view" && !state.page_view) {
    title = "👁 New portfolio visit";
    state.page_view = event.ts;
  } else if (type === "resume_click" && !state.resume_click) {
    title = "📄 Resume clicked";
    state.resume_click = event.ts;
  } else if (type === "project_click" && !state.project_click) {
    title = `🚀 Project clicked: ${event.label || "a project"}`;
    state.project_click = event.ts;
  } else if (type === "contact_click" && !state.contact_click) {
    title = "✉️ Contact link clicked";
    state.contact_click = event.ts;
  }

  if (title) {
    await store.setJSON(stateKey, state);
    await sendNotification(title, event);
  }

  return new Response("ok", { status: 200 });
};
