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
  /** Optimized logo in /public/landing/partners/<handle>/. Optional: no logo =
   *  the hero shows SogilityGO alone (no default logo). */
  logo?: string;
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
  /**
   * Optional page-specific audience wording. Existing club and association
   * pages omit this and retain the current member/family language.
   */
  audience?: PartnerAudience;
};

export type PartnerAudience = {
  /** Attributive form, e.g. "Flyin Lion listener" */
  singular: string;
  /** Group form, e.g. "Flyin Lion listeners" */
  plural: string;
  /** People label used in checkout instructions, e.g. "listeners" */
  people: string;
  /** Short label used in offer CTAs, e.g. "listener" or "community" */
  offerLabel: string;
};

const AUDIENCE_OVERRIDES: Record<string, PartnerAudience> = {
  '1on1-soccer-index': {
    singular: '1 on 1 Soccer Index community',
    plural: '1 on 1 Soccer Index players and families',
    people: 'players and families',
    offerLabel: 'community',
  },
  'flyin-lion-podcast': {
    singular: 'Flyin Lion listener',
    plural: 'Flyin Lion listeners',
    people: 'listeners',
    offerLabel: 'listener',
  },
};

const LOGO_OVERRIDES: Record<string, string> = {
  '1on1-soccer-index': '/landing/partners/1on1-soccer-index/logo.png',
  'flyin-lion-podcast': '/landing/partners/flyin-lion-podcast/logo.webp',
};

export function getPartnerAudienceOverride(
  handle: string,
): PartnerAudience | undefined {
  return AUDIENCE_OVERRIDES[handle];
}

export function getPartnerLogoOverride(handle: string): string | undefined {
  return LOGO_OVERRIDES[handle];
}

export function getPartnerAudienceCopy(partner: PartnerData) {
  if (partner.audience) {
    return {
      heroSubject: partner.audience.plural,
      exclusiveLabel: `${partner.audience.singular} exclusive`,
      pricingLabel: `${partner.audience.singular} offer`,
      offerSubject: partner.audience.plural,
      fallbackOffer: `Exclusive ${partner.audience.offerLabel} pricing`,
      offerSentenceFallback: `${partner.audience.offerLabel} pricing`,
      viewPricing: `View ${partner.audience.offerLabel} pricing`,
      claimOffer: `Claim ${partner.audience.offerLabel} offer`,
      faqQuestion: `How is the ${partner.audience.singular} offer applied?`,
      checkoutPeople: partner.audience.people,
    };
  }

  return {
    heroSubject: `${partner.name} families`,
    exclusiveLabel: `${partner.name} member exclusive`,
    pricingLabel: `${partner.name} member offer`,
    offerSubject: `${partner.name} members`,
    fallbackOffer: 'Exclusive member pricing',
    offerSentenceFallback: 'Member pricing',
    viewPricing: 'View member pricing',
    claimOffer: 'Claim member offer',
    faqQuestion: `How is the ${partner.name} member offer applied?`,
    checkoutPeople: 'families',
  };
}

const PARTNERS: Record<string, PartnerData> = {
  '1on1-soccer-index': {
    handle: '1on1-soccer-index',
    name: '1 on 1 Soccer Index',
    logo: getPartnerLogoOverride('1on1-soccer-index'),
    logoAlt: '1 on 1 Soccer Index',
    eyebrow: 'Exclusive Offer for the 1 on 1 Soccer Index Community | 20% OFF',
    headline: 'Big Confidence Begins in the Backyard.',
    body: [
      '1 on 1 Soccer Index players and families can bring structured soccer training home with ReboundIQ, Impact Light, guided activities in the SogilityGO app, and optional Virtual Coach support.',
      'Designed to support purposeful work between team practices, private training sessions, and games, SogilityGO gives players more opportunities to read, react, decide, and repeat.',
    ],
    offerText: '20% OFF ENTIRE PURCHASE',
    discountCode: '1ON1SI20',
    ctaText: 'Claim your offer',
    accentColor: '#1b2a4a',
    bannerMode: 'hide',
    audience: getPartnerAudienceOverride('1on1-soccer-index'),
  },
  'indiana-soccer': {
    handle: 'indiana-soccer',
    name: 'Indiana Soccer',
    logo: '/landing/partners/indiana-soccer/logo.webp',
    logoAlt: 'Indiana Soccer Association',
    eyebrow: 'Indiana Soccer Members Exclusive',
    headline:
      'Take control of your development between team training sessions.',
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
  'flyin-lion-podcast': {
    handle: 'flyin-lion-podcast',
    name: 'The Flyin Lion Podcast',
    logo: getPartnerLogoOverride('flyin-lion-podcast'),
    logoAlt: 'The Flyin Lion Podcast',
    eyebrow: 'Exclusive Offer for Flyin Lion Listeners | 20% OFF',
    headline: 'Big Confidence Begins in the Backyard.',
    body: [
      'Flyin Lion listeners can bring structured soccer training home with ReboundIQ, Impact Light, guided activities in the SogilityGO app, and optional Virtual Coach support.',
      'Designed to support purposeful work between team practices, coaching sessions, and games, SogilityGO gives players more opportunities to read, react, decide, and repeat.',
    ],
    offerText: '20% OFF ENTIRE PURCHASE',
    discountCode: 'FLYINLION20',
    ctaText: 'Claim your offer',
    accentColor: '#1b2a4a',
    bannerMode: 'hide',
    audience: getPartnerAudienceOverride('flyin-lion-podcast'),
  },
};

export function getPartner(handle: string | undefined): PartnerData | null {
  if (!handle) return null;
  return PARTNERS[handle] ?? null;
}
