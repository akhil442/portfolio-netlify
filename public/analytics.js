/* Privacy-conscious first-party analytics.
 *
 * - No third-party SDKs, no cookies, no fingerprinting, no GPS/location permission.
 * - Anonymous session id lives in sessionStorage (dies with the tab).
 * - Honors Do Not Track.
 * - Events are POSTed to this site's own /api/track endpoint (a Netlify Edge Function).
 * - Analytics must never break the site: every failure path is silent.
 */
(function () {
  'use strict';

  if (typeof navigator !== 'undefined' && navigator.doNotTrack === '1') return;

  var ENDPOINT = '/api/track';

  function getSessionId() {
    try {
      var sid = sessionStorage.getItem('pa_sid');
      if (!sid) {
        sid =
          typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : 's-' + Date.now() + '-' + Math.random().toString(36).slice(2);
        sessionStorage.setItem('pa_sid', sid);
      }
      return sid;
    } catch (e) {
      return 'ephemeral';
    }
  }
  var SESSION_ID = getSessionId();

  function send(type, label) {
    try {
      var payload = JSON.stringify({
        type: type,
        sessionId: SESSION_ID,
        page: location.pathname,
        label: (label || '').slice(0, 200),
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          ENDPOINT,
          new Blob([payload], { type: 'application/json' })
        );
      } else {
        fetch(ENDPOINT, {
          method: 'POST',
          keepalive: true,
          headers: { 'Content-Type': 'application/json' },
          body: payload,
        });
      }
    } catch (e) {
      /* never break the page */
    }
  }

  /* 1. page_view — once per page load */
  function trackPageView() {
    send('page_view', document.referrer || '(direct)');
  }
  if (document.readyState === 'complete') trackPageView();
  else window.addEventListener('load', trackPageView);

  /* 2/3/5. click classification — delegated, so dynamically rendered links work too */
  document.addEventListener('click', function (e) {
    var t = e.target;
    var a = t && t.closest ? t.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';

    if (href.indexOf('mailto:') === 0) {
      send('contact_click', 'email link');
    } else if (/resume/i.test(href) || /\.pdf(\?|#|$)/i.test(href)) {
      // NOTE: only the click is tracked — nothing is added to the PDF itself.
      send('resume_click', href.slice(0, 200));
    } else if (a.closest('#projects')) {
      var title = (a.getAttribute('aria-label') || a.textContent || href)
        .trim()
        .slice(0, 120);
      send('project_click', title);
    }
  });

  /* 4. experience_view — fires once per session, only when the section is
   * genuinely visible (>=40% for ~1.2s). Reliable enough without scroll-spam. */
  function watchExperience() {
    var el = document.getElementById('experience');
    if (!el || !('IntersectionObserver' in window)) return;
    var fired = false;
    var timer = null;
    var io = new IntersectionObserver(
      function (entries) {
        if (fired) return;
        var visible =
          entries[0].isIntersecting && entries[0].intersectionRatio >= 0.4;
        if (visible && !timer) {
          timer = setTimeout(function () {
            fired = true;
            send('experience_view', 'experience section');
            io.disconnect();
          }, 1200);
        } else if (!visible && timer) {
          clearTimeout(timer);
          timer = null;
        }
      },
      { threshold: [0, 0.4, 1] }
    );
    io.observe(el);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', watchExperience);
  } else {
    watchExperience();
  }
})();
