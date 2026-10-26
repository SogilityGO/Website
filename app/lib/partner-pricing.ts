export function getPartnerDiscountPercentage(partner: {
  offerText: string;
  discountCode: string;
}): number {
  if (!partner.discountCode.trim()) return 0;
  const percentage = Number(
    partner.offerText.match(/\b(\d+(?:\.\d+)?)\s*%/)?.[1],
  );
  return Number.isFinite(percentage) && percentage > 0 && percentage < 100
    ? percentage
    : 0;
}

export function getPartnerPrice(
  priceCents: number,
  compareAtPriceCents: number,
  percentage: number,
) {
  const discountCents = Math.round((priceCents * percentage) / 100);
  const memberPriceCents = priceCents - discountCents;
  return {
    memberPriceCents,
    savingsCents: Math.max(0, compareAtPriceCents - memberPriceCents),
  };
}

export function formatPartnerPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}
