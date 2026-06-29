/**
 * Partner data for the `/partners/<handle>` pages.
 *
 * Phase 1: a typed seed config so the partner template renders and can be
 * verified end-to-end now. The shape mirrors the planned `partner_page`
 * Shopify metaobject (see `partner-metaobject-definition.md`), so swapping the
 * source to a Storefront API metaobject query later is a drop-in change.
 */
export type PartnerData = {
  /** URL slug, e.g. `indiana-soccer` → /partners/indiana-soccer */
  handle: string;
  /** Display name, e.g. "Indiana Soccer" */
  name: string;
  /** Optimized logo in /public/landing/partners/<handle>/ */
  logo: string;
  logoAlt: string;
  /** Optional partner background image for the hero; falls back to the default SogilityGO hero photo */
  heroImage?: string;
  /** Small tag above the headline */
  eyebrow: string;
  /** Hero h1 */
  headline: string;
  /** Hero body paragraphs */
  body: string[];
  /** Offer line, e.g. "10% OFF ENTIRE PURCHASE" */
  offerText: string;
  /** Discount code auto-applied at checkout, e.g. INDIANASOCCER10 */
  discountCode: string;
  /** CTA label */
  ctaText: string;
  /** Hex accent (brand fallback for now) */
  accentColor: string;
  /** Sitewide promo banner handling on this page */
  bannerMode: 'hide' | 'replace';
  bannerText?: string;
};

const PARTNERS: Record<string, PartnerData> = {
  'indiana-soccer': {
    handle: 'indiana-soccer',
    name: 'Indiana Soccer',
    logo: '/landing/partners/indiana-soccer/logo.webp',
    logoAlt: 'Indiana Soccer Association',
    eyebrow: 'Indiana Soccer Members Exclusive',
    headline: 'Take control of your development between team training sessions.',
    body: [
      'SogilityGO helps players continue improving at home with personalized training powered by assessments, virtual coaching, guided sessions, and progress tracking.',
      'Designed to supplement team training, private coaching, and game-day development, SogilityGO gives Indiana Soccer players a simple way to build better habits, improve their first touch, passing, vision, agility, and confidence between practices and games.',
    ],
    offerText: '10% OFF ENTIRE PURCHASE',
    discountCode: 'INDIANASOCCER10',
    ctaText: 'Claim your offer',
    accentColor: '#1b2a4a',
    bannerMode: 'hide',
  },
};

export function getPartner(handle: string | undefined): PartnerData | null {
  if (!handle) return null;
  return PARTNERS[handle] ?? null;
}
