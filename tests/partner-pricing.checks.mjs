import assert from 'node:assert/strict';
import {test} from 'node:test';
import {
  getPartnerDiscountPercentage,
  getPartnerPrice,
  formatPartnerPrice,
} from '../app/lib/partner-pricing.ts';

test('partner cards reflect 10%, 15%, and 20% offers across all three setups', () => {
  for (const [percent, expected] of [
    [10, [31410, 58410, 85410]],
    [15, [29665, 55165, 80665]],
    [20, [27920, 51920, 75920]],
  ]) {
    [34900, 64900, 94900].forEach((base, i) => {
      const regular = [39900, 79900, 119900][i];
      const result = getPartnerPrice(base, regular, percent);
      assert.equal(result.memberPriceCents, expected[i]);
      assert.equal(result.savingsCents + result.memberPriceCents, regular);
    });
  }
});

test('offer percentage comes from explicit copy, including codes with no number', () => {
  assert.equal(
    getPartnerDiscountPercentage({
      offerText: 'Save 15% with your TENFIFTEEN discount.',
      discountCode: 'TENFIFTEEN',
    }),
    15,
  );
  assert.equal(
    getPartnerDiscountPercentage({
      offerText: '20% OFF ENTIRE PURCHASE',
      discountCode: 'CODE20',
    }),
    20,
  );
  for (const offerText of ['Exclusive offer', 'Save 100%', 'Save 0%']) {
    assert.equal(
      getPartnerDiscountPercentage({offerText, discountCode: 'CODE20'}),
      0,
    );
  }
  assert.equal(
    getPartnerDiscountPercentage({offerText: 'Save 20%', discountCode: ''}),
    0,
  );
});

test('uses changing product prices and preserves cents in display', () => {
  assert.equal(getPartnerPrice(35900, 39900, 20).memberPriceCents, 28720);
  assert.equal(formatPartnerPrice(27920), '$279.20');
  assert.equal(formatPartnerPrice(11980), '$119.80');
  assert.equal(formatPartnerPrice(119900), '$1,199');
});
