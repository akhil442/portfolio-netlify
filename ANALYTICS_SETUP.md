# Privacy-conscious portfolio analytics — setup guide

First-party analytics for this portfolio. No third-party tracking SDKs.
Events are collected by `public/analytics.js` and sent to the site's own
`/api/track` endpoint (a Netlify Edge Function), which stores them in
Netlify Blobs and sends notifications server-side.

## What is tracked

| Event            | Trigger                                              | Notification |
|------------------|------------------------------------------------------|--------------|
| `page_view`      | Visitor opens the portfolio                          | Yes — once per anonymous session |
| `resume_click`   | Visitor clicks the resume link (click only — nothing is added to the PDF) | Yes — once per session |
| `project_click`  | Visitor clicks a project link in the projects section | Yes — once per session |
| `contact_click`  | Visitor clicks an email (`mailto:`) link             | Yes — once per session |
| `experience_view`| Experience section visibly on screen (~1.2s, once per session) | No — logged only |

Privacy: anonymous session id in `sessionStorage` (dies with the tab), no
cookies, no fingerprinting, no GPS, no precise location (country/region code
only, from Netlify's server-side geo), Do Not Track is honored, and no
keystrokes, form contents, or mouse movements are collected.

## 1. Configure Netlify environment variables

Netlify dashboard → your site → **Site settings → Environment variables**.
Add these (all server-side only — never in frontend code):

**Required for the private log:**
- `ANALYTICS_ADMIN_KEY` — a long random secret, e.g. generated with
  `openssl rand -hex 32`. The private log lives at
  `https://YOUR-SITE.netlify.app/api/admin?key=ANALYTICS_ADMIN_KEY`.
  Keep this URL private.

**Notification channel (pick one):**

Option A — ntfy.sh (recommended: free, no signup)
- `NOTIFY_CHANNEL` = `ntfy`
- `NTFY_TOPIC` = a long random string, e.g. `openssl rand -hex 16`.
  Anyone who guesses the topic can read it, so make it unguessable.
  Install the ntfy app (iOS/Android) or open `https://ntfy.sh/YOUR_TOPIC`
  and subscribe to receive push alerts. Free tier is generous for this volume.

Option B — Telegram (free, reliable push)
- `NOTIFY_CHANNEL` = `telegram`
- `TELEGRAM_BOT_TOKEN` — create a bot with @BotFather, copy the token.
- `TELEGRAM_CHAT_ID` — message @userinfobot, copy your id.
- ~5 minutes of setup, no cost, no practical limits at this volume.

Option C — Email via Resend
- `NOTIFY_CHANNEL` = `resend`
- `RESEND_API_KEY` — from resend.com. Free: 100 emails/day.
  Note: without a verified domain, Resend test mode only delivers to your
  own address. Set `NOTIFY_EMAIL` to the destination address, and
  optionally `RESEND_FROM` (defaults to `portfolio@resend.dev`).

After changing environment variables, **redeploy** the site so edge
functions pick them up (Netlify dashboard → Deploys → Trigger deploy).

## 2. Deploy through the existing GitHub → Netlify workflow

Nothing special — this uses your normal flow:

```bash
git add public/analytics.js netlify/edge-functions/track.js netlify/edge-functions/admin.js \
  src/app/layout.tsx src/components/Footer.tsx src/components/Experience.tsx \
  src/components/Projects.tsx ANALYTICS_SETUP.md
git commit -m "Add privacy-conscious first-party analytics"
git push origin main
```

Netlify auto-detects the push, rebuilds, and deploys the edge functions
alongside the site. No `netlify.toml` changes were needed (functions use
inline path config).

## 3. Test each event

1. Open the deployed site in a **private/incognito window** (fresh session).
2. Scroll through the experience section, click the Resume button, click a
   project link, click the email link.
3. You should receive notifications: new visit, resume click, project click,
   contact click (one per type — repeat clicks in the same tab won't re-notify).
4. Open `https://YOUR-SITE.netlify.app/api/admin?key=YOUR_KEY` and confirm
   the events appear with type, UTC timestamp, page, detail, country/region,
   and session id.
5. Wrong key (`?key=nope`) must return **401 Unauthorized**.

If a notification doesn't arrive, check the edge function logs:
Netlify dashboard → your site → **Functions → track** (or admin) → logs.

## 4. Limitations (read before relying on this)

- **A resume click does not prove the PDF was read.** It only means the link
  was clicked; the PDF opens on an external site (`akhil442.github.io`).
- **Analytics cannot identify a visitor as a recruiter** — or as anyone.
  Sessions are anonymous by design; there is deliberately no identity.
- **Location is coarse** (country/region from IP geolocation). VPNs, work
  networks, and mobile carriers make it approximate or wrong.
- **Ad blockers / Do Not Track**: some blockers may block the first-party
  `/api/track` call, and Do Not Track visitors are skipped entirely. Counts
  are a lower bound, not exact.
- **Notifications are best-effort**: if the notification service (ntfy /
  Telegram / Resend) is down or misconfigured, the event is still logged
  but no alert is sent. Check the private log as the source of truth.
- **Notifications are not confirmed working** until you complete the env-var
  configuration above and the tests in section 3 succeed.
