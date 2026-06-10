import {useEffect} from 'react';

/**
 * Affirm monthly-payment messaging ("As low as $X/mo").
 *
 * Public API key is taken from the live Sogility theme (assets/affirmShopify.js)
 * so this landing runs on the SAME Affirm merchant as the main store. The key is a
 * public client-side key (already exposed in the live store's JS) — not a secret.
 *
 * Affirm domains are allow-listed in the CSP (app/entry.server.tsx).
 */
const AFFIRM_PUBLIC_KEY = 'CZZI3M4R3X1P99QY'; // US production key (CA shares it)
const AFFIRM_SCRIPT = 'https://cdn1.affirm.com/js/v2/affirm.js';

type AffirmWindow = Window & {
  affirm?: {ui?: {ready?: (cb: () => void) => void; refresh?: () => void}};
  _affirm_config?: Record<string, unknown>;
};

/** Loads the Affirm SDK once (client-side). Render a single instance per page. */
export function AffirmLoader() {
  useEffect(() => {
    const w = window as AffirmWindow;
    if (w.affirm) {
      w.affirm.ui?.refresh?.();
      return;
    }
    w._affirm_config = {
      public_api_key: AFFIRM_PUBLIC_KEY,
      script: AFFIRM_SCRIPT,
    };
    // Official Affirm bootstrap (verbatim from the live theme) — creates window.affirm
    // and injects the SDK <script> from cdn1.affirm.com.
    /* eslint-disable */
    (function (l: any, g: any, m: any, e: any, a: any, f: any, b: any) {
      let d,
        c = l[m] || {},
        h = document.createElement(f),
        n = document.getElementsByTagName(f)[0],
        k = function (a: any, b: any, c: any) {
          return function () {
            a[b]._.push([c, arguments]);
          };
        };
      c[e] = k(c, e, 'set');
      d = c[e];
      c[a] = {};
      c[a]._ = [];
      d._ = [];
      c[a][b] = k(c, a, b);
      a = 0;
      for (
        b = 'set add save post open empty reset on off trigger ready setProduct'.split(
          ' ',
        );
        a < b.length;
        a++
      )
        d[b[a]] = k(c, e, b[a]);
      a = 0;
      for (b = ['get', 'token', 'url', 'items']; a < b.length; a++)
        d[b[a]] = function () {};
      h.async = !0;
      h.src = g[f];
      n.parentNode.insertBefore(h, n);
      delete g[f];
      d(g);
      l[m] = c;
    })(window, w._affirm_config, 'affirm', 'checkout', 'ui', 'script', 'ready');
    /* eslint-enable */

    const aw = window as AffirmWindow;
    aw.affirm?.ui?.ready?.(() => aw.affirm?.ui?.refresh?.());
  }, []);

  return null;
}

/**
 * Affirm "as low as" line for a price. `amountCents` must be the price in cents
 * (e.g. $349 → 34900). Renders nothing until the SDK populates it.
 */
export function AffirmMessage({
  amountCents,
  className = '',
}: {
  amountCents: number;
  className?: string;
}) {
  useEffect(() => {
    (window as AffirmWindow).affirm?.ui?.refresh?.();
  }, [amountCents]);

  return (
    <p
      className={`affirm-as-low-as ${className}`}
      data-page-type="product"
      data-amount={amountCents}
      data-affirm-color="black"
    />
  );
}
