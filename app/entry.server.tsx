import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {
  createContentSecurityPolicy,
  type HydrogenRouterContextProvider,
} from '@shopify/hydrogen';
import type {EntryContext} from 'react-router';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
  context: HydrogenRouterContextProvider,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    // Third-party widgets/analytics. Affirm = monthly-payment messaging;
    // GA4 (googletagmanager/google-analytics) + Meta Pixel (facebook) +
    // Microsoft Clarity (clarity.ms) = tracking;
    // Google Ads (googleadservices/doubleclick) + Yahoo dot pixel (yimg/yahoo)
    // = Invisibly ad tracking.
    scriptSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://cdn1.affirm.com',
      'https://www.googletagmanager.com',
      'https://www.googleadservices.com',
      'https://googleads.g.doubleclick.net',
      'https://connect.facebook.net',
      'https://s.yimg.com',
      'https://*.clarity.ms',
      // HubSpot tracking code (portal 243986947). The hs-scripts loader pulls in
      // HubSpot's analytics / cookie-banner / collected-forms scripts —
      // wildcards cover the regional (js-na2.*) subdomains this portal serves.
      'https://*.hs-scripts.com',
      'https://*.hs-analytics.net',
      'https://*.hs-banner.com',
      'https://*.hscollectedforms.net',
      'https://*.usemessages.com',
      'https://*.hsadspixel.net',
      'https://*.hubspot.com',
    ],
    connectSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://*.affirm.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://*.google-analytics.com',
      'https://*.analytics.google.com',
      'https://www.googleadservices.com',
      // Google Ads talks to several doubleclick subdomains (ad., googleads.g.,
      // stats.g.) — a wildcard avoids silently blocking one of them.
      'https://*.doubleclick.net',
      'https://www.google.com',
      'https://connect.facebook.net',
      'https://www.facebook.com',
      'https://sp.analytics.yahoo.com',
      'https://s.yimg.com',
      'https://*.clarity.ms',
      // HubSpot: analytics beacons (*.hubapi.com), cookie banner, collected forms.
      'https://*.hubapi.com',
      'https://*.hubspot.com',
      'https://*.hs-banner.com',
      'https://*.hscollectedforms.net',
    ],
    frameSrc: [
      "'self'",
      'https://*.affirm.com',
      'https://www.facebook.com',
      'https://*.doubleclick.net',
      'https://*.hubspot.com',
      'https://*.hs-sites.com',
    ],
    imgSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'data:',
      'https://*.affirm.com',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://*.google-analytics.com',
      'https://www.googleadservices.com',
      'https://*.doubleclick.net',
      'https://www.google.com',
      'https://www.facebook.com',
      'https://connect.facebook.net',
      'https://sp.analytics.yahoo.com',
      'https://s.yimg.com',
      'https://*.clarity.ms',
      // HubSpot tracking pixel (track.hubspot.com) + banner/forms images.
      'https://*.hubspot.com',
    ],
    // Affirm injects its icon font as a data: URI; self-hosted Inter is same-origin.
    fontSrc: ["'self'", 'data:', 'https://cdn.shopify.com'],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <ServerRouter
        context={reactRouterContext}
        url={request.url}
        nonce={nonce}
      />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
