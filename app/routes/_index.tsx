import {useLoaderData, type LinksFunction} from 'react-router';
import type {Route} from './+types/_index';
import {
  Hero,
  UnlockBanner,
  TrustedBy,
  TrainingTogether,
  PlayerJourney,
  VirtualCoach,
  Reviews,
  TrainingBoard,
  CoreSkills,
  StartTraining,
  SetupTraining,
  OwnerMessage,
  Faq,
  type CheckoutMap,
} from '~/components/landing/sections';
import {Analytics} from '~/components/landing/analytics';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'SogilityGO — Elite soccer training at home'},
    {
      name: 'description',
      content:
        'A guided virtual coach. Real-time feedback. Measurable improvement. At-home elite soccer training with the ReboundIQ board.',
    },
  ];
};

// Preload the hero (LCP element) so it starts downloading in parallel with CSS
// instead of after the <img> is discovered — biggest mobile LCP win.
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

// Pricing tiers → live Shopify products (handles). Buy buttons checkout via
// the `/cart/<variantId>:1` permalink, so we only need the variant id + stock.
const PRICING_HANDLES = {
  Starter: 'sogilitygo-rebounder-pro',
  Advanced: 'sogilitygo-reboundiq-elite',
  Pro: 'sogilitygo-reboundiq-ultimate',
} as const;

const START_TRAINING_QUERY = `#graphql
  fragment TierVariant on Product {
    availableForSale
    variants(first: 1) {
      nodes {
        id
        availableForSale
      }
    }
  }
  query StartTrainingTiers($starter: String!, $advanced: String!, $pro: String!) {
    Starter: product(handle: $starter) { ...TierVariant }
    Advanced: product(handle: $advanced) { ...TierVariant }
    Pro: product(handle: $pro) { ...TierVariant }
  }
` as const;

export async function loader({context}: Route.LoaderArgs) {
  const {storefront} = context;

  let checkout: CheckoutMap = {};
  try {
    const data = await storefront.query(START_TRAINING_QUERY, {
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
    // Never 500 the landing over pricing data — buttons fall back to the store.
    console.error('StartTraining pricing fetch failed', error);
  }

  return {checkout};
}

export default function Homepage() {
  const {checkout} = useLoaderData<typeof loader>();
  return (
    <>
      <Analytics />
      <Hero />
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
      <StartTraining checkout={checkout} />
      <SetupTraining />
      <OwnerMessage />
      <Faq />
    </>
  );
}
