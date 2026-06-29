import {useLoaderData, type LinksFunction} from 'react-router';
import type {Route} from './+types/partners.$handle';
import {
  UnlockBanner,
  TrustedBy,
  TrainingTogether,
  PlayerJourney,
  VirtualCoach,
  TrainingBoard,
  Reviews,
  CoreSkills,
  StartTraining,
  SetupTraining,
  OwnerMessage,
  Faq,
  type CheckoutMap,
} from '~/components/landing/sections';
import {Analytics} from '~/components/landing/analytics';
import {StickyMobileCTA} from '~/components/landing/StickyCTA';
import {PartnerHero} from '~/components/landing/PartnerHero';
import {PartnerOffer} from '~/components/landing/PartnerOffer';
import {getPartner, type PartnerData} from '~/data/partners';

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    as: 'image',
    href: '/landing/hero-960.webp',
    imageSrcSet:
      '/landing/hero-960.webp 960w, /landing/hero-1280.webp 1280w, /landing/hero-1920.webp 1920w',
    imageSizes: '100vw',
  },
];

export const meta: Route.MetaFunction = ({data}) => {
  const name = data?.partner?.name ?? 'Partner';
  return [
    {title: `SogilityGO × ${name}`},
    // Near-duplicate partner pages — keep them out of search, still follow links.
    {name: 'robots', content: 'noindex, follow'},
  ];
};

const PRICING_HANDLES = {
  Starter: 'sogilitygo-rebounder-pro',
  Advanced: 'sogilitygo-reboundiq-elite',
  Pro: 'sogilitygo-reboundiq-ultimate',
};

const PARTNER_TIERS_QUERY = `#graphql
  fragment TierVariant on Product {
    availableForSale
    variants(first: 1) {
      nodes {
        id
        availableForSale
      }
    }
  }
  query PartnerTiers($starter: String!, $advanced: String!, $pro: String!) {
    Starter: product(handle: $starter) { ...TierVariant }
    Advanced: product(handle: $advanced) { ...TierVariant }
    Pro: product(handle: $pro) { ...TierVariant }
  }
` as const;

const PARTNER_METAOBJECT_QUERY = `#graphql
  query PartnerMetaobject($handle: String!) {
    metaobject(handle: {type: "partner_page", handle: $handle}) {
      handle
      fields {
        key
        value
        reference {
          ... on MediaImage {
            image {
              url(transform: {maxHeight: 480, preferredContentType: WEBP})
              altText
            }
          }
        }
      }
    }
  }
` as const;

/**
 * Map a `partner_page` metaobject to PartnerData. Optional fields (cta, accent,
 * banner) fall back to sensible defaults so the team only fills the essentials.
 */
function metaobjectToPartner(handle: string, metaobject: any): PartnerData | null {
  if (!metaobject) return null;
  const f: Record<string, any> = {};
  for (const field of metaobject.fields ?? []) f[field.key] = field;
  const val = (k: string): string => (f[k]?.value ?? '').trim();

  const name = val('name');
  if (!name) return null;

  const logoImage = f.logo?.reference?.image;
  return {
    handle,
    name,
    logo: logoImage?.url ?? '/landing/partners/indiana-soccer/logo.webp',
    logoAlt: logoImage?.altText || `${name} logo`,
    eyebrow: val('eyebrow'),
    headline: val('headline'),
    body: val('body')
      .split(/\n{2,}/)
      .map((p: string) => p.trim())
      .filter(Boolean),
    offerText: val('offer_text'),
    discountCode: val('discount_code'),
    ctaText: 'Claim your offer',
    accentColor: '#1b2a4a',
    bannerMode: 'hide',
  };
}

export async function loader({context, params}: Route.LoaderArgs) {
  const {storefront} = context;
  const handle = params.handle ?? '';

  // Partner content: live from the `partner_page` metaobject, with the in-repo
  // seed config as a fallback so the page still renders if the metaobject is
  // missing or unreachable.
  let partner: PartnerData | null = null;
  try {
    const result: any = await storefront.query(PARTNER_METAOBJECT_QUERY, {
      variables: {handle},
    });
    partner = metaobjectToPartner(handle, result?.metaobject);
  } catch (error) {
    console.error('Partner metaobject fetch failed', error);
  }
  if (!partner) partner = getPartner(handle);
  if (!partner) {
    throw new Response('Partner not found', {status: 404});
  }

  // Live variant ids for the Buy buttons (same approach as the main landing).
  let checkout: CheckoutMap = {};
  try {
    const data = await storefront.query(PARTNER_TIERS_QUERY, {
      variables: {
        starter: PRICING_HANDLES.Starter,
        advanced: PRICING_HANDLES.Advanced,
        pro: PRICING_HANDLES.Pro,
      },
    });

    const toTier = (product: any): CheckoutMap[string] => {
      const variant = product?.variants?.nodes?.[0];
      if (!variant?.id) return undefined;
      return {
        variantId: String(variant.id).split('/').pop()!,
        available: Boolean(product.availableForSale && variant.availableForSale),
      };
    };

    checkout = {
      Starter: toTier(data?.Starter),
      Advanced: toTier(data?.Advanced),
      Pro: toTier(data?.Pro),
    };
  } catch (error) {
    console.error('Partner pricing fetch failed', error);
  }

  return {partner, checkout};
}

export default function PartnerPage() {
  const {partner, checkout} = useLoaderData<typeof loader>();
  return (
    <>
      <Analytics />
      <PartnerHero partner={partner} />
      <UnlockBanner />
      {/* Mobile order: Training together → Player journey → Trusted by (logos).
          Desktop order: Trusted by → Training together → Player journey. */}
      <div className="flex flex-col">
        <div className="order-3 lg:order-1">
          <TrustedBy />
        </div>
        <div className="order-1 lg:order-2">
          <TrainingTogether />
        </div>
        <div className="order-2 lg:order-3">
          <PlayerJourney />
        </div>
      </div>
      <VirtualCoach />
      <TrainingBoard />
      <Reviews />
      <CoreSkills />
      <PartnerOffer partner={partner} />
      <StartTraining checkout={checkout} discountCode={partner.discountCode} />
      <SetupTraining />
      <OwnerMessage />
      <Faq />
      <StickyMobileCTA />
    </>
  );
}
