import {useAnalytics} from '@shopify/hydrogen';
import {useEffect} from 'react';
import {getPartnerEventAttribution} from '~/lib/partner-attribution';

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
const CLARITY_PROJECT_ID = 'wp2szjohzu';
const LINKER_DOMAINS = [
  'my.sogilitygo.com',
  'www.sogilitygo.com',
  'sogilitygo.com',
];

type YahooBeacon = {ywa: {I13N: {fireBeacon: (payload: unknown[]) => void}}};
type ClarityFunction = ((...args: unknown[]) => void) & {q?: unknown[][]};

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
  clarity?: ClarityFunction;
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
      /* eslint-disable @typescript-eslint/no-unused-expressions, prefer-spread, prefer-rest-params */
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
      /* eslint-enable @typescript-eslint/no-unused-expressions, prefer-spread, prefer-rest-params */
      w.fbq!('init', META_PIXEL_ID);
      w.fbq!('track', 'PageView');
    }
  }, []);

  return null;
}

/**
 * Microsoft Clarity project shared with the Shopify Online Store. Mounted in
 * PageLayout so every Hydrogen route, including partner pages, is recorded.
 * ConsentV2 mirrors Shopify's analytics and marketing consent choices.
 */
export function ClarityTracking() {
  const {customerPrivacy} = useAnalytics();

  useEffect(() => {
    const w = window as AnalyticsWindow;

    if (!w.clarity) {
      const clarity = ((...args: unknown[]) => {
        (clarity.q = clarity.q || []).push(args);
      }) as ClarityFunction;
      w.clarity = clarity;
    }

    if (!document.getElementById('clarity-tracking-script')) {
      const script = document.createElement('script');
      script.id = 'clarity-tracking-script';
      script.async = true;
      script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
      document.head.appendChild(script);
    }

    const syncConsent = () => {
      if (!customerPrivacy) return;
      w.clarity?.('consentv2', {
        ad_Storage: customerPrivacy.marketingAllowed() ? 'granted' : 'denied',
        analytics_Storage: customerPrivacy.analyticsProcessingAllowed()
          ? 'granted'
          : 'denied',
      });
    };

    syncConsent();
    document.addEventListener('visitorConsentCollected', syncConsent);
    return () => {
      document.removeEventListener('visitorConsentCollected', syncConsent);
    };
  }, [customerPrivacy]);

  return null;
}

/** Record a partner landing-page visit with stable partner dimensions. */
export function PartnerAnalytics({
  partnerHandle,
  partnerName,
  discountCode,
}: {
  partnerHandle: string;
  partnerName: string;
  discountCode: string;
}) {
  useEffect(() => {
    const w = window as AnalyticsWindow;
    const attribution = getPartnerEventAttribution();
    const properties = {
      partner_handle: partnerHandle,
      partner_name: partnerName,
      coupon: discountCode,
      page_path: window.location.pathname,
      ...attribution,
    };

    w.gtag?.('event', 'partner_page_view', properties);
    w.fbq?.('trackCustom', 'PartnerPageView', properties);
  }, [discountCode, partnerHandle, partnerName]);

  return null;
}

/**
 * HubSpot tracking code (portal 243986947, na2 region). Added per Sogility
 * request (Josh, Jul 2026) so my.sogilitygo.com traffic lands in HubSpot
 * analytics. The hs-scripts.com loader pulls in HubSpot's analytics /
 * cookie-banner / collected-forms scripts and beacons to *.hubspot.com /
 * *.hubapi.com — all allow-listed in the CSP (app/entry.server.tsx), else they
 * are silently blocked. Mounted in PageLayout so it loads on every route
 * (home + partner pages), not just the landing index like Analytics above.
 */
const HUBSPOT_LOADER_SRC = 'https://js-na2.hs-scripts.com/243986947.js';

export function HubSpotTracking() {
  useEffect(() => {
    if (document.getElementById('hs-script-loader')) return;
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.id = 'hs-script-loader';
    s.async = true;
    s.defer = true;
    s.src = HUBSPOT_LOADER_SRC;
    document.body.appendChild(s);
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
  partnerHandle?: string;
  partnerName?: string;
  discountCode?: string;
}) {
  const {
    tierName,
    valueUSD,
    variantId,
    partnerHandle,
    partnerName,
    discountCode,
  } = params;
  const w = window as AnalyticsWindow;
  const itemId = variantId ?? tierName;
  const partnerProperties = partnerHandle
    ? {
        partner_handle: partnerHandle,
        partner_name: partnerName,
        coupon: discountCode,
        ...getPartnerEventAttribution(),
      }
    : {};

  if (partnerHandle) {
    w.gtag?.('event', 'partner_offer_click', {
      tier_name: tierName,
      item_id: itemId,
      value: valueUSD,
      currency: 'USD',
      ...partnerProperties,
    });
    w.fbq?.('trackCustom', 'PartnerOfferClick', {
      tier_name: tierName,
      content_id: itemId,
      value: valueUSD,
      currency: 'USD',
      ...partnerProperties,
    });
  }

  w.gtag?.('event', 'begin_checkout', {
    currency: 'USD',
    value: valueUSD,
    coupon: discountCode,
    ...partnerProperties,
    items: [
      {
        item_id: itemId,
        item_name: `Rebound IQ ${tierName}`,
        price: valueUSD,
        quantity: 1,
        coupon: discountCode,
      },
    ],
  });

  w.fbq?.('track', 'InitiateCheckout', {
    currency: 'USD',
    value: valueUSD,
    content_ids: [itemId],
    content_type: 'product',
    num_items: 1,
    ...partnerProperties,
  });
}
