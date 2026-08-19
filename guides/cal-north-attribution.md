# Cal North partner attribution

This system connects Cal North landing-page traffic to checkout behavior and completed Shopify orders.

## Source of truth by stage

| Stage                           | Source of truth | Identifier                                          |
| ------------------------------- | --------------- | --------------------------------------------------- |
| Landing-page visits             | GA4             | `partner_page_view` with `partner_handle=cal-north` |
| Offer clicks                    | GA4 and Meta    | `partner_offer_click` / `PartnerOfferClick`         |
| Checkout starts                 | GA4 and Meta    | `begin_checkout` / `InitiateCheckout`               |
| Completed purchases and revenue | Shopify orders  | Order attribute `Partner=cal-north`                 |
| Discount redemptions            | Shopify orders  | Discount code `CALNORTH20` when used                |

The checkout link carries the partner and approved campaign fields into the Hydrogen cart. Shopify carries those cart attributes onto the completed order. This remains available even if channel attribution is incomplete or the shopper removes the discount code.

The checkout route also forwards Google's cross-domain linker parameters to the Shopify checkout. This is what allows the GA4 journey to continue from `my.sogilitygo.com` to `www.sogilitygo.com` when the browser permits it.

## Landing-page standard

Use the clean Cal North landing-page URL everywhere:

`https://my.sogilitygo.com/partners/cal-north`

The page handle `cal-north` is the attribution identifier. Every package link from this page carries that identifier into the cart and completed Shopify order. UTMs may still be captured when present, but they are optional and are not required for Cal North reporting.

## GA4 setup

Register the following event-scoped custom dimensions in both GA4 properties used by the Hydrogen storefront:

- `partner_handle`
- `partner_name`
- `placement` when optional campaign detail is present

Create a funnel exploration filtered to `partner_handle = cal-north`:

1. `partner_page_view`
2. `partner_offer_click`
3. `begin_checkout`
4. `purchase`

Use Shopify, not GA4, as the final source of truth for order count, net sales, discounts, refunds, and cancellations.

## Shopify reporting

For order-level review, count orders where:

- Order attribute `Partner` equals `cal-north`

Discount code `CALNORTH20` measures offer use, but it is not required for Cal North attribution.

Recommended weekly fields:

- Orders
- Gross sales
- Discounts
- Net sales
- Refunds
- Average order value
- Product tier
- Discount code used

## Launch QA

1. Open the clean Cal North landing-page URL in a private browser session.
2. Confirm `partner_page_view` in GA4 DebugView with `partner_handle=cal-north`.
3. Click one package and confirm `partner_offer_click` and `begin_checkout`.
4. Confirm checkout shows `CALNORTH20` as applied.
5. Complete one test order using the approved test method.
6. Confirm the Shopify order contains `Partner=cal-north`. Record separately whether the discount code was used.
7. Confirm the GA4 `purchase` is associated with the same journey before relying on the funnel for reporting.

Do not call a purchase confirmed from Meta, Google Ads, or GA4 alone. Reconcile it to the Shopify order.
