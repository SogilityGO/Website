import {isbot} from 'isbot';

// Only the two checkout links reported as indexed in Search Console.
// Keep the normal /cart crawl exclusion in place for every other URL.
export const reportedCartPaths = [
  '/cart/51469882655022:1?discount=CALNORTH20&partner=cal-north',
  '/cart/51485888807214:1?discount=CALNORTH20&partner=cal-north',
] as const;

export function getCartCrawlerResponse(request: Request): Response | null {
  const url = new URL(request.url);
  const path = `${url.pathname}${url.search}`;
  if (
    !['GET', 'HEAD'].includes(request.method) ||
    !reportedCartPaths.some((reported) => reported === path) ||
    !isbot(request.headers.get('user-agent'))
  ) {
    return null;
  }

  // Crawlers must be able to read noindex without creating a Shopify cart.
  // Human requests continue through the existing cart and attribution loader.
  return new Response(request.method === 'HEAD' ? null : 'Checkout link.', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': 'no-store',
      Vary: 'User-Agent',
    },
  });
}
