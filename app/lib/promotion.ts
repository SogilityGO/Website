/**
 * Sitewide promotion, scheduled from Shopify admin (Content → Metaobjects →
 * Sitewide promotion). The active entry drives both the homepage pricing and
 * the promo banner, so the banner can never advertise a different (or expired)
 * code from the one the Buy buttons apply.
 */
export type SitewidePromotion = {
  discountPercentage: number;
  discountCode: string;
  badgeLabel: string;
  offerMessage: string;
};

export const SITEWIDE_PROMOTIONS_QUERY = `#graphql
  query SitewidePromotions {
    metaobjects(type: "sitewide_promotion", first: 20) {
      nodes {
        enabled: field(key: "enabled") { value }
        discountPercentage: field(key: "discount_percentage") { value }
        discountCode: field(key: "discount_code") { value }
        startsAt: field(key: "starts_at") { value }
        endsAt: field(key: "ends_at") { value }
        badgeLabel: field(key: "badge_label") { value }
        offerMessage: field(key: "offer_message") { value }
      }
    }
  }
` as const;

export function getActiveSitewidePromotion(
  data: any,
): SitewidePromotion | undefined {
  const now = Date.now();
  const nodes = data?.metaobjects?.nodes ?? [];

  for (const node of nodes) {
    const enabled = node?.enabled?.value === 'true';
    const discountPercentage = Number(node?.discountPercentage?.value);
    const discountCode = String(node?.discountCode?.value ?? '').trim();
    const startsAt = node?.startsAt?.value
      ? Date.parse(node.startsAt.value)
      : 0;
    const endsAt = node?.endsAt?.value
      ? Date.parse(node.endsAt.value)
      : Number.POSITIVE_INFINITY;

    if (
      enabled &&
      Number.isFinite(discountPercentage) &&
      discountPercentage > 0 &&
      discountPercentage < 100 &&
      discountCode &&
      Number.isFinite(startsAt) &&
      Number.isFinite(endsAt) &&
      now >= startsAt &&
      now <= endsAt
    ) {
      return {
        discountPercentage,
        discountCode,
        badgeLabel: String(node?.badgeLabel?.value ?? '').trim(),
        offerMessage: String(node?.offerMessage?.value ?? '').trim(),
      };
    }
  }

  return undefined;
}

/** Banner line for the active promotion, e.g. "Level up your game this fall. Save 20%… LEVELUP20." */
export function promotionBannerText(promotion: SitewidePromotion): string {
  return [promotion.badgeLabel, promotion.offerMessage]
    .filter(Boolean)
    .join(' ');
}
