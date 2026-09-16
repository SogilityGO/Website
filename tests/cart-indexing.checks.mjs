import assert from 'node:assert/strict';
import {test} from 'node:test';
import {
  getCartCrawlerResponse,
  reportedCartPaths,
} from '../app/lib/cart-indexing.ts';

const origin = 'https://my.sogilitygo.com';
const googlebot =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const chrome =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36';
const request = (path, agent = googlebot, method = 'GET') =>
  new Request(origin + path, {method, headers: {'User-Agent': agent}});

test('both reported links give Google a non-cacheable noindex response', async () => {
  for (const path of reportedCartPaths) {
    const response = getCartCrawlerResponse(request(path));
    assert.ok(response);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, nofollow');
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.equal(response.headers.get('Vary'), 'User-Agent');
    assert.equal(response.headers.get('Set-Cookie'), null);
    assert.equal(response.headers.get('Location'), null);
    assert.equal(await response.text(), 'Checkout link.');
  }
});

test('customers continue through the existing cart loader for both links', () => {
  for (const path of reportedCartPaths) {
    assert.equal(getCartCrawlerResponse(request(path, chrome)), null);
    assert.equal(getCartCrawlerResponse(request(path, '')), null);
  }
});

test('other carts, partners, query variations and content routes are untouched', () => {
  for (const path of [
    '/cart',
    '/cart/123:1',
    '/partners/cal-north',
    '/',
    '/cart/51469882655022:1?discount=OTHER&partner=cal-north',
    reportedCartPaths[0] + '&utm_source=test',
    reportedCartPaths[0] + '-extra',
  ]) {
    assert.equal(getCartCrawlerResponse(request(path)), null, path);
  }
});

test('HEAD has no body and cart mutations are never intercepted', async () => {
  const response = getCartCrawlerResponse(
    request(reportedCartPaths[0], googlebot, 'HEAD'),
  );
  assert.ok(response);
  assert.equal(await response.text(), '');
  for (const method of ['POST', 'PUT', 'DELETE']) {
    assert.equal(
      getCartCrawlerResponse(request(reportedCartPaths[0], googlebot, method)),
      null,
    );
  }
});
