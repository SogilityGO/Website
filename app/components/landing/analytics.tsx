import {useEffect} from 'react';

/**
 * GA4 + Meta Pixel for the parents landing.
 *
 * IDs are the SAME accounts the main store uses (pulled from the Shopify
 * Google & YouTube / Facebook & Instagram channels). The Shopify channel pixels
 * only fire on the Online Store (Liquid) — this headless Hydrogen app needs them
 * wired manually so landing traffic + events land in the same GA4/Meta accounts.
 *
 * Analytics domains are allow-listed in the CSP (app/entry.server.tsx).
 * Cross-domain linker passes the GA client id to the checkout on www.sogilitygo.com.
 */
// GA4 properties tracked on this page. G-Z5TKEJ2070 = existing (Shopify Google
// channel); G-NKRXX9ER4G = added per Sogility request (Josh, 1 Jul 2026).
const GA4_IDS = ['G-Z5TKEJ2070', 'G-NKRXX9ER4G'];
const META_PIXEL_ID = '1654787059166470';
const LINKER_DOMAINS = ['my.sogilitygo.com', 'www.sogilitygo.com', 'sogilitygo.com'];

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue?: unknown[];
    loaded?: boolean;
    version?: string;
    push?: unknown;
  };
  _fbq?: unknown;
};

/** Loads GA4 + Meta Pixel once and fires the initial PageView. */
export function Analytics() {
  useEffect(() => {
    const w = window as AnalyticsWindow;

    // --- GA4 (gtag.js) ---
    if (!w.gtag) {
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_IDS[0]}`;
      document.head.appendChild(s);

      w.dataLayer = w.dataLayer || [];
      w.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer!.push(arguments);
      };
      w.gtag('js', new Date());
      for (const id of GA4_IDS) {
        w.gtag('config', id, {
          // pass the GA client id across to the Shopify checkout domain
          linker: {domains: LINKER_DOMAINS},
        });
      }
    }

    // --- Meta Pixel (fbevents.js) ---
    if (!w.fbq) {
      /* eslint-disable */
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        'script',
        'https://connect.facebook.net/en_US/fbevents.js',
      );
      /* eslint-enable */
      w.fbq!('init', META_PIXEL_ID);
      w.fbq!('track', 'PageView');
    }
  }, []);

  return null;
}

/**
 * Fire a "begin checkout" conversion event in GA4 + Meta when a Buy button is
 * clicked. Best-effort and non-blocking — navigation to checkout proceeds.
 */
export function trackBeginCheckout(params: {
  tierName: string;
  valueUSD: number;
  variantId?: string;
}) {
  const {tierName, valueUSD, variantId} = params;
  const w = window as AnalyticsWindow;
  const itemId = variantId ?? tierName;

  w.gtag?.('event', 'begin_checkout', {
    currency: 'USD',
    value: valueUSD,
    items: [
      {
        item_id: itemId,
        item_name: `Rebound IQ ${tierName}`,
        price: valueUSD,
        quantity: 1,
      },
    ],
  });

  w.fbq?.('track', 'InitiateCheckout', {
    currency: 'USD',
    value: valueUSD,
    content_ids: [itemId],
    content_type: 'product',
    num_items: 1,
  });
}
