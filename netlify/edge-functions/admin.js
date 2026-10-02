/* GET /api/admin?key=YOUR_SECRET — private event log (Netlify Edge Function).
 *
 * - Protected by ANALYTICS_ADMIN_KEY (Netlify env var). Wrong/missing key → 401.
 * - Renders a simple HTML table: event type, timestamp, page/section,
 *   truncated anonymous session id, coarse country/region.
 * - Not linked from anywhere on the site. Keep the URL + key private.
 */
import { getStore } from "@netlify/blobs";

export const config = { path: "/api/admin" };

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[c]);
}

export default async (req) => {
  const url = new URL(req.url);
  const adminKey = Netlify.env.get("ANALYTICS_ADMIN_KEY") || "";
  if (!adminKey || url.searchParams.get("key") !== adminKey) {
    return new Response("Unauthorized", { status: 401 });
  }

  const store = getStore("portfolio-events");
  const listed = await store.list();
  const keys = (listed.blobs || [])
    .map((b) => b.key)
    .filter((k) => !k.startsWith("notified:")) // skip notification state
    .sort()
    .reverse()
    .slice(0, 200);

  const events = [];
  for (const key of keys) {
    const e = await store.get(key, { type: "json" });
    if (e) events.push(e);
  }

  const rows = events
    .map(
      (e) => `
      <tr>
        <td><span class="pill">${esc(e.type)}</span></td>
        <td class="mono">${esc(e.ts)}</td>
        <td class="mono">${esc(e.page)}</td>
        <td>${esc(e.label)}</td>
        <td class="mono">${esc(e.country)}${e.region ? " / " + esc(e.region) : ""}</td>
        <td class="mono">${esc(String(e.sessionId).slice(0, 8))}…</td>
      </tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Portfolio events (private)</title>
<style>
  body { background: #121212; color: #e5e5e5; font-family: ui-monospace, monospace; margin: 0; padding: 24px; }
  h1 { font-size: 18px; font-weight: 600; margin-bottom: 4px; }
  p.sub { color: #737373; font-size: 12px; margin-top: 0; margin-bottom: 20px; }
  table { border-collapse: collapse; width: 100%; font-size: 12px; }
  th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid rgba(255,255,255,.08); vertical-align: top; }
  th { color: #a3a3a3; text-transform: uppercase; letter-spacing: .1em; font-size: 10px; }
  .mono { white-space: nowrap; }
  .pill { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12); border-radius: 999px; padding: 2px 10px; white-space: nowrap; }
  .empty { color: #737373; padding: 32px 0; }
</style>
</head>
<body>
  <h1>Portfolio events</h1>
  <p class="sub">Private log · newest first · showing up to ${events.length} events · anonymous sessions only</p>
  ${
    events.length === 0
      ? '<p class="empty">No events recorded yet.</p>'
      : `<table>
      <thead><tr><th>Event</th><th>Timestamp (UTC)</th><th>Page</th><th>Detail</th><th>From</th><th>Session</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`
  }
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      // Never index this page.
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
};
