import {useEffect} from 'react';

/**
 * GA4 + Google Ads + Meta Pixel + Yahoo dot pixel for the landing pages.
 *
 * The GA4/Meta IDs are the SAME accounts the main store uses (pulled from the
 * Shopify Google & YouTube / Facebook & Instagram channels). The Shopify channel
 * pixels only fire on the Online Store (Liquid) — this headless Hydrogen app
 * needs them wired manually so landing traffic + events land in the same accounts.
 *
 * All third-party domains are allow-listed in the CSP (app/entry.server.tsx) —
 * without that they are silently blocked.
 * Cross-domain linker passes the GA client id to the checkout on www.sogilitygo.com.
 */
// GA4 properties tracked on this page. G-NKRXX9ER4G = added per Sogility request
// (Josh, 1 Jul 2026).
//
// G-Z5TKEJ2070 is correct — do not "fix" it to G-Z5TKEJ2G70. The Shopify Google
// channel's storefront config lists G-Z5TKEJ2G70, but googletagmanager 404s that
// id while it serves the full library for G-Z5TKEJ2070 (checked 17 Jul 2026).
// Loading a 404 id as the first loader kills gtag entirely — GA4 and Google Ads
// both stop firing.
const GA4_IDS = ['G-Z5TKEJ2070', 'G-NKRXX9ER4G'];
/**
 * Google Ads (Invisibly, Jul 2026). Deliberately shares the single gtag.js loader
 * below: their instructions say "don't add more than one Google tag to each page",
 * and gtag.js is already loaded here for GA4 — so this is an extra config, not a
 * second loader.
 */
const GOOGLE_ADS_ID = 'AW-18109223824';
/**
 * Yahoo dot pixel (Invisibly, Jul 2026). Enhanced matching is NOT in use, so the
 * he/hph placeholders stay exactly as Yahoo supplied them — confirmed by Payton
 * (16 Jul 2026): they don't interfere unless real values are passed.
 */
const YAHOO_PROJECT_ID = '10000';
const YAHOO_PIXEL_ID = '10220772';
const META_PIXEL_ID = '1654787059166470';
const LINKER_DOMAINS = ['my.sogilitygo.com', 'www.sogilitygo.com', 'sogilitygo.com'];

type YahooBeacon = {ywa: {I13N: {fireBeacon: (payload: unknown[]) => void}}};

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  dotq?: unknown[];
  YAHOO?: YahooBeacon;
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
      // Google Ads — same loader, extra config (one Google tag per page).
      w.gtag('config', GOOGLE_ADS_ID);
    }

    // --- Yahoo dot pixel (ytc.js) ---
    if (!w.dotq) {
      w.dotq = [];
      w.dotq.push({
        projectId: YAHOO_PROJECT_ID,
        properties: {
          pixelId: YAHOO_PIXEL_ID,
          he: '<email_address>',
          hph: '<phone_number>',
        },
      });

      const ys = document.createElement('script');
      ys.async = true;
      ys.src = 'https://s.yimg.com/wi/ytc.js';
      // Yahoo's bootstrap: once ytc.js is up, flush the queue and route further
      // pushes straight to fireBeacon.
      ys.onload = () => {
        try {
          const fireBeacon = w.YAHOO!.ywa.I13N.fireBeacon;
          const queued = w.dotq!;
          w.dotq = [];
          w.dotq.push = (payload: unknown) => {
            fireBeacon([payload]);
            return 0;
          };
          fireBeacon(queued);
        } catch {
          // pixel unavailable — non-blocking
        }
      };
      document.head.appendChild(ys);
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
