import type {ReactNode} from 'react';
import type {PartnerData} from '~/data/partners';
import type {CheckoutMap} from './sections';
import {trackBeginCheckout} from './analytics';

const WRAP = 'mx-auto w-[calc(100%-2rem)] max-w-[1180px]';
const PAPER = '#f7f6ef';
const INK = '#202333';

const SYSTEMS = [
  {
    id: 'reboundiq',
    number: '01',
    name: 'ReboundIQ',
    copy: 'Creates realistic ball returns so players can repeat, receive, and adjust through purposeful reps.',
    image:
      'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/Rebound-on-x4.png?v=1785369043',
    imageClass: 'w-[84%] max-w-[250px]',
  },
  {
    id: 'impact-light',
    number: '02',
    name: 'Impact Light',
    copy: 'Adds smart, connected visual cues that prompt players to recognize, react, and decide during the activity.',
    image:
      'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/Lights-2.png?v=1785369043',
    imageClass: 'w-[76%] max-w-[210px]',
  },
  {
    id: 'sogilitygo-app',
    number: '03',
    name: 'SogilityGO App',
    copy: 'Connects the hardware and includes a starter selection of drills players can use without a subscription.',
    image:
      'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/illu_coach-1.png?v=1785369280',
    imageClass: 'w-[80%] max-w-[230px]',
  },
];

const SETUP_STEPS = [
  {
    label: 'Step 1',
    title: 'Place the boards',
    copy: 'Use a flat indoor or outdoor surface with enough room to safely receive the return.',
    image: '/landing/setup/board.webp',
    alt: 'ReboundIQ board on a backyard training surface',
    imageClass: 'h-full w-full object-cover [object-position:35%_center]',
  },
  {
    label: 'Step 2',
    title: 'Pair the app and lights',
    copy: 'Connect each Impact Light through Bluetooth in the free SogilityGO app.',
    image:
      'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/phone-light-extended.png?v=1785509384',
    alt: 'SogilityGO app pairing with an Impact Light',
    imageClass:
      'h-full w-full object-contain object-top scale-[1.04] -translate-y-4',
  },
  {
    label: 'Step 3',
    title: 'Choose how to train',
    copy: 'Choose from the included drills or add SogilityGO Coach for guided plans, the full activity library, and progress tracking.',
    image: '/landing/setup/phone-explore.webp',
    alt: 'SogilityGO app guided activity library',
    imageClass: 'h-full w-full object-contain',
  },
];

const PRICING = [
  {
    name: 'Starter',
    handle: 'sogilitygo-rebounder-pro',
    image: '/landing/pricing/p1.webp',
    price: '$349',
    priceCents: 34900,
    was: null,
    save: null,
    popular: false,
    copy: 'A compact one-board setup for focused ball-return practice and structured at-home reps.',
    includes: ['1 ReboundIQ board', '1 Impact Light', 'SogilityGO app'],
  },
  {
    name: 'Advanced',
    handle: 'sogilitygo-reboundiq-elite',
    image: '/landing/pricing/p2.webp',
    price: '$649',
    priceCents: 64900,
    was: '$698',
    save: 'Save $49',
    popular: true,
    copy: 'Adds a second return angle for more varied sequences that layer reaction and decision-making.',
    includes: ['2 ReboundIQ boards', '2 Impact Lights', 'SogilityGO app'],
  },
  {
    name: 'Pro',
    handle: 'sogilitygo-reboundiq-ultimate',
    image: '/landing/pricing/p3.webp',
    price: '$949',
    priceCents: 94900,
    was: '$1,047',
    save: 'Save $98',
    popular: false,
    copy: 'A three-board setup for the widest training area and greatest variety of return angles.',
    includes: ['3 ReboundIQ boards', '3 Impact Lights', 'SogilityGO app'],
  },
];

const COMPARISON = [
  ['Ball-return practice', 'Repeat passing and receiving', true],
  ['Connected visual training cues', 'Recognize, react, and decide', false],
  [
    'Free app connection',
    'Pair the Impact Lights and access included drills',
    false,
  ],
  ['Guided activities*', 'Follow structured sessions', false],
  ['Personalized training plans*', 'Built around each player', false],
  [
    '180+ pro-designed activities*',
    'First touch, passing, dribbling, vision, and agility',
    false,
  ],
  [
    'Player profiles and progress tracking*',
    'Up to five separate player profiles',
    false,
  ],
] as const;

const REP_LOOP = [
  {
    number: '01',
    product: 'Virtual Coach',
    title: 'Follow the session',
    copy: 'With SogilityGO Coach, the Virtual Coach provides the activity and the next instruction.',
    image:
      'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/illu_coach-1.png?v=1785369280',
  },
  {
    number: '02',
    product: 'Impact Light',
    title: 'Read the cue',
    copy: 'The Impact Light adds a visual prompt the player must recognize and respond to.',
    image:
      'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/Lights-2.png?v=1785369043',
  },
  {
    number: '03',
    product: 'ReboundIQ',
    title: 'Receive the return',
    copy: 'ReboundIQ gives immediate physical feedback through the pace and angle of the ball.',
    image:
      'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/Rebound-on-x4.png?v=1785369043',
  },
  {
    number: '04',
    product: 'Player response',
    title: 'Adjust the next rep',
    copy: 'The player uses the feedback to self-correct and take ownership of the next rep.',
    image:
      'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/illu_coach.png?v=1785371037',
  },
];

const TRUSTED_LOGOS = [
  {
    src: 'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/rs_w_1200_cg_true.webp?v=1785437622',
    alt: 'Soccer.com',
  },
  {
    src: 'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/Girls-Soccer-Network-Logo_Isolated_CMYK-2.png?v=1784227776',
    alt: 'Girls Soccer Network',
  },
  {
    src: 'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/cropped-main-crest_color-2.webp?v=1783476478',
    alt: 'Arizona Soccer Association',
  },
  {
    src: 'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/Nobelsville_United.png?v=1783462406',
    alt: 'Noblesville United Soccer Club',
  },
  {
    src: 'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/ISA_Logo.png?v=1782747830',
    alt: 'Indiana Soccer',
  },
  {
    src: 'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/ESC_Logo_4-Color.png?v=1778136879',
    alt: 'Erie Sports Center',
  },
  {
    src: 'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/new_website_hero_size__5__237013_237024_1_ffa8ff00-1943-4525-ad53-3a4a4a9bcd07.png?v=1777553373',
    alt: 'Georgia Soccer',
  },
  {
    src: 'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/CalSouth-Shield_1_1.png?v=1777539855',
    alt: 'Cal South',
  },
  {
    src: 'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/US_Deaf_HorizontalCrest-224x300_1.png?v=1772798005',
    alt: 'USA Deaf Soccer Association',
  },
];

function Kicker({children}: {children: ReactNode}) {
  return (
    <p className="text-[12px] font-black uppercase tracking-[0.13em] text-sogility">
      {children}
    </p>
  );
}

function Heading({
  kicker,
  title,
  copy,
  center = false,
  light = false,
}: {
  kicker: string;
  title: string;
  copy?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div
      className={center ? 'mx-auto max-w-[820px] text-center' : 'max-w-[820px]'}
    >
      <Kicker>{kicker}</Kicker>
      <h2
        className={`mt-3 text-[38px] font-black leading-[0.98] tracking-[-0.045em] sm:text-[46px] lg:text-[56px] ${
          light ? 'text-white' : 'text-[#202333]'
        }`}
      >
        {title}
      </h2>
      {copy ? (
        <p
          className={`mt-5 text-[16px] leading-[1.65] lg:text-[18px] ${
            light ? 'text-white/70' : 'text-[#656977]'
          }`}
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}

function StoreBadges() {
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2.5 max-lg:w-full max-sm:grid max-sm:grid-cols-1">
      <a
        href="https://apps.apple.com/us/app/sogilitygo-soccer-training/id6754323607"
        target="_blank"
        rel="noreferrer"
        aria-label="Download SogilityGO on the App Store"
        className="inline-flex min-h-[52px] min-w-[158px] items-center justify-center gap-2.5 rounded-full border-2 border-[#202333] bg-[#fffef9] px-4 text-[#202333] transition hover:-translate-y-0.5 hover:border-[#159f23] hover:bg-sogility/10 hover:shadow-[0_10px_24px_rgba(28,31,43,0.12)] focus-visible:-translate-y-0.5 focus-visible:border-[#159f23] focus-visible:bg-sogility/10 focus-visible:shadow-[0_10px_24px_rgba(28,31,43,0.12)] max-sm:w-full"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-[22px] w-[22px] shrink-0"
        >
          <path
            fill="currentColor"
            d="M19.67 13.65c-.02-2.12 1.73-3.15 1.81-3.2-1.01-1.47-2.57-1.67-3.13-1.69-1.31-.14-2.59.79-3.26.79-.68 0-1.72-.78-2.83-.75-1.43.02-2.78.85-3.51 2.14-1.52 2.62-.39 6.48 1.07 8.6.72 1.04 1.57 2.2 2.68 2.15 1.09-.04 1.5-.69 2.81-.69 1.3 0 1.68.69 2.82.67 1.17-.02 1.9-1.04 2.6-2.09.84-1.19 1.17-2.36 1.19-2.42-.03-.01-2.22-.85-2.24-3.51ZM17.49 7.37c.58-.73.98-1.72.87-2.73-.85.04-1.9.59-2.51 1.3-.54.63-1.02 1.66-.89 2.63.95.07 1.94-.48 2.53-1.2Z"
          />
        </svg>
        <span className="grid gap-px text-left leading-none">
          <small className="text-[9px] font-extrabold uppercase tracking-[0.03em]">
            Download on the
          </small>
          <strong className="text-[15px] font-black tracking-[-0.01em]">
            App Store
          </strong>
        </span>
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.ytiligos.sogilitygo"
        target="_blank"
        rel="noreferrer"
        aria-label="Get SogilityGO on Google Play"
        className="inline-flex min-h-[52px] min-w-[158px] items-center justify-center gap-2.5 rounded-full border-2 border-[#202333] bg-[#fffef9] px-4 text-[#202333] transition hover:-translate-y-0.5 hover:border-[#159f23] hover:bg-sogility/10 hover:shadow-[0_10px_24px_rgba(28,31,43,0.12)] focus-visible:-translate-y-0.5 focus-visible:border-[#159f23] focus-visible:bg-sogility/10 focus-visible:shadow-[0_10px_24px_rgba(28,31,43,0.12)] max-sm:w-full"
      >
        <svg
          viewBox="0 0 32 36"
          aria-hidden="true"
          className="h-[22px] w-[22px] shrink-0"
        >
          <path fill="#20c5f4" d="M1 2 18.5 18 1 34Z" />
          <path fill="#32d26f" d="M1 2 22 14 18.5 18Z" />
          <path fill="#ffd23f" d="m18.5 18 3.5 4L1 34Z" />
          <path fill="#f05b55" d="m22 14 9 4-9 4-3.5-4Z" />
        </svg>
        <span className="grid gap-px text-left leading-none">
          <small className="text-[9px] font-extrabold uppercase tracking-[0.03em]">
            Get it on
          </small>
          <strong className="text-[15px] font-black tracking-[-0.01em]">
            Google Play
          </strong>
        </span>
      </a>
    </div>
  );
}

export function PartnerExperience({
  partner,
  checkout,
}: {
  partner: PartnerData;
  checkout?: CheckoutMap;
}) {
  return (
    <div style={{background: PAPER, color: INK}}>
      <HowItWorks />
      <SimpleSetup />
      <PartnerPricing partner={partner} checkout={checkout} />
      <PlayerProof />
      <Comparison partner={partner} />
      <RepLoop />
      <Trust />
      <OwnerMessage />
      <PartnerFaq partner={partner} />
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-16 lg:py-20">
      <div className={WRAP}>
        <Heading
          kicker="How it works"
          title="Three parts. One purposeful session."
          copy="ReboundIQ delivers realistic returns, the Impact Light adds smart connected visual cues, and the SogilityGO app brings every rep together in one purposeful at-home training experience."
          center
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {SYSTEMS.map((system) => (
            <article
              key={system.id}
              id={system.id}
              className="scroll-mt-24 overflow-hidden rounded-[24px] border border-[#dfe0d9] bg-white p-6 shadow-[0_18px_45px_rgba(31,34,49,0.07)]"
            >
              <div className="flex items-start justify-between">
                <span className="text-[36px] font-black leading-none text-[#202333]/15">
                  {system.number}
                </span>
                <span className="rounded-full bg-sogility/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#247d25]">
                  Connected system
                </span>
              </div>
              <div className="mt-3 flex h-[200px] items-center justify-center rounded-[20px] bg-[radial-gradient(circle_at_center,rgba(48,190,45,0.14),transparent_60%)]">
                <img
                  src={system.image}
                  alt={system.name}
                  className={system.imageClass}
                  loading="lazy"
                />
              </div>
              <h3 className="mt-5 text-[29px] font-black tracking-[-0.035em] text-[#202333]">
                {system.name}
              </h3>
              <p className="mt-3 text-[16px] leading-[1.6] text-[#656977]">
                {system.copy}
              </p>
            </article>
          ))}
        </div>

        <div
          id="progress-tracking"
          className="mt-[18px] flex scroll-mt-24 items-center justify-between gap-[34px] rounded-[20px] border border-[#dbddd5] bg-[#fffef9] px-[22px] py-5 shadow-[0_12px_34px_rgba(28,31,43,0.05)] max-lg:flex-col max-lg:items-start"
        >
          <div className="grid gap-[5px]">
            <span className="text-[12px] font-black uppercase tracking-[0.13em] text-[#159f23]">
              SogilityGO app + Coach
            </span>
            <h3 className="text-[22px] font-black leading-[1.2] text-[#202333]">
              Connection, guidance, and progress in one app.
            </h3>
            <p className="text-[16px] leading-[1.5] text-[#6e7281]">
              Use the free app to connect your Impact Lights and access a
              selection of drills. Add optional SogilityGO Coach for tailored
              plans and 180+ pro-designed activities across first touch,
              passing, dribbling, vision, and agility, plus progress tracking
              and up to five player profiles. Coach is not required to use the
              hardware.
            </p>
          </div>
          <StoreBadges />
        </div>
      </div>
    </section>
  );
}

function SimpleSetup() {
  return (
    <section className="border-t border-[#dfe0d9] py-14 lg:py-16">
      <div className={WRAP}>
        <Heading
          kicker="Simple setup"
          title="Ready in three steps."
          copy="Place the boards, pair the Impact Lights, and choose how the player wants to train in the SogilityGO app."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {SETUP_STEPS.map((step) => (
            <article key={step.label}>
              <div className="grid h-[300px] place-items-center overflow-hidden rounded-[22px] border border-[#dfe0d9] bg-[radial-gradient(circle_at_center,rgba(48,190,45,0.09),transparent_55%),#fbfaf4] shadow-[0_18px_40px_rgba(31,34,49,0.06)] lg:h-[354px]">
                <img
                  src={step.image}
                  alt={step.alt}
                  className={step.imageClass}
                  loading="lazy"
                />
              </div>
              <div className="px-1 pt-4">
                <Kicker>{step.label}</Kicker>
                <h3 className="mt-2 text-[26px] font-black tracking-[-0.035em]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[16px] leading-[1.6] text-[#656977]">
                  {step.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckoutButton({
  tier,
  checkout,
  discountCode,
}: {
  tier: (typeof PRICING)[number];
  checkout?: CheckoutMap;
  discountCode?: string;
}) {
  const item = checkout?.[tier.name];
  if (item && !item.available) {
    return (
      <button
        type="button"
        disabled
        className="mt-auto flex min-h-12 w-full cursor-not-allowed items-center justify-center rounded-full bg-[#b6b8b3] px-5 font-black text-white"
      >
        Sold out
      </button>
    );
  }
  const href = item
    ? `/cart/${item.variantId}:1${discountCode ? `?discount=${encodeURIComponent(discountCode)}` : ''}`
    : `https://www.sogilitygo.com/products/${tier.handle}`;
  return (
    <a
      href={href}
      {...(!item ? {target: '_blank', rel: 'noreferrer'} : {})}
      onClick={() =>
        trackBeginCheckout({
          tierName: tier.name,
          valueUSD: tier.priceCents / 100,
          variantId: item?.variantId,
        })
      }
      className={`mt-auto flex min-h-12 w-full items-center justify-center rounded-full px-5 text-center text-[15px] font-black transition hover:-translate-y-0.5 hover:brightness-105 ${
        tier.popular ? 'bg-sogility text-[#202333]' : 'bg-[#202333] text-white'
      }`}
    >
      Claim member offer on {tier.name}
    </a>
  );
}

function PartnerPricing({
  partner,
  checkout,
}: {
  partner: PartnerData;
  checkout?: CheckoutMap;
}) {
  const offerSentence = formatPartnerOfferSentence(partner);
  return (
    <section
      id="start-training"
      className="scroll-mt-20 bg-white py-16 lg:py-20"
    >
      <div className={WRAP}>
        <Heading
          kicker={`${partner.name} member offer`}
          title="Choose the right setup for your player."
          copy="Every setup includes ReboundIQ, Impact Lights, and the SogilityGO app. Choose based on your available space and the number of return angles you want to create."
          center
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PRICING.map((tier) => (
            <article
              key={tier.name}
              className={`relative flex overflow-hidden rounded-[24px] border bg-[#f7f6ef] shadow-[0_18px_45px_rgba(31,34,49,0.09)] ${
                tier.popular
                  ? 'border-sogility ring-2 ring-sogility/15'
                  : 'border-[#dfe0d9]'
              }`}
            >
              {tier.popular ? (
                <span className="absolute left-0 top-0 z-10 rounded-br-2xl bg-sogility px-4 py-2 text-[11px] font-black uppercase tracking-[0.1em] text-[#202333]">
                  Most popular
                </span>
              ) : null}
              <div className="flex w-full flex-col">
                <div className="h-[225px] overflow-hidden border-b border-[#dfe0d9] bg-white">
                  <img
                    src={tier.image}
                    alt={`ReboundIQ ${tier.name} setup`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-center text-[12px] font-black uppercase tracking-[0.12em] text-sogility">
                    ReboundIQ
                  </p>
                  <h3 className="mt-1 text-center text-[32px] font-black tracking-[-0.04em]">
                    {tier.name}
                  </h3>
                  <p className="mt-3 min-h-[76px] text-center text-[15px] leading-[1.6] text-[#656977]">
                    {tier.copy}
                  </p>
                  <div className="mt-4 grid min-h-[142px] content-start justify-items-center gap-2 text-center">
                    {tier.was ? (
                      <s className="text-[22px] font-black leading-none tracking-[-0.035em] text-[#777b87] decoration-[#d7192d] decoration-[4px] [text-decoration-skip-ink:none]">
                        {tier.was}
                      </s>
                    ) : (
                      <span aria-hidden="true" className="h-[22px]" />
                    )}
                    <strong className="text-[46px] font-black leading-[0.95] tracking-[-0.04em] text-[#159f23]">
                      {tier.price}
                    </strong>
                    {tier.save ? (
                      <span className="inline-flex min-w-[132px] items-center justify-center gap-2 rounded-full border-2 border-[#c4c7ce] bg-[#e7e8eb] px-4 py-2 text-[#202333] shadow-[0_4px_12px_rgba(32,35,51,0.1)]">
                        <span className="text-[10px] font-black uppercase tracking-[0.06em]">
                          You save
                        </span>
                        <strong className="text-[15px] font-black">
                          {tier.save.replace(/^Save\s*/i, '')}
                        </strong>
                      </span>
                    ) : (
                      <span aria-hidden="true" className="h-[38px]" />
                    )}
                  </div>
                  <p className="mt-2 text-center text-[11px] font-bold leading-[1.35] text-[#6e7281]">
                    {offerSentence}
                  </p>
                  <ul className="my-5 space-y-2 text-center text-[14px] text-[#515562]">
                    {tier.includes.map((item) => (
                      <li key={item}>
                        <span className="mr-2 text-sogility">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <CheckoutButton
                    tier={tier}
                    checkout={checkout}
                    discountCode={partner.discountCode}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-7 grid overflow-hidden rounded-[22px] border border-[#dfe0d9] lg:grid-cols-2">
          <div className="bg-[#f7f6ef] p-6 lg:p-8">
            <Kicker>Included with every setup</Kicker>
            <h3 className="mt-2 text-[24px] font-black">Free SogilityGO app</h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-[#656977]">
              Connect the Impact Lights and access a selection of drills. No
              subscription required.
            </p>
          </div>
          <div className="bg-[#202333] p-6 text-white lg:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <Kicker>Optional upgrade</Kicker>
                <h3 className="mt-2 text-[24px] font-black">
                  SogilityGO Coach
                </h3>
              </div>
              <strong className="text-[18px] text-sogility">
                $9.99/month{' '}
                <small className="block text-[11px] font-semibold text-white/60">
                  or $99.99/year
                </small>
              </strong>
            </div>
            <p className="mt-3 text-[15px] leading-[1.6] text-white/70">
              Unlock guided plans, the full activity library, progress tracking,
              and up to five player profiles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatPartnerOfferSentence(partner: PartnerData) {
  const rawOffer = (partner.offerText || 'Member pricing')
    .trim()
    .replace(/[.!?]+$/, '');
  const normalizedOffer =
    rawOffer === rawOffer.toUpperCase() ? rawOffer.toLowerCase() : rawOffer;
  const brandedOffer = normalizedOffer.replace(/sogilitygo/gi, 'SogilityGO');
  const percentage = brandedOffer.match(/\b\d+(?:\.\d+)?%\b/)?.[0];

  if (percentage) {
    return `${partner.name} members save ${percentage} on SogilityGO at checkout.`;
  }

  if (/^(save|get|enjoy|claim|receive)\b/i.test(brandedOffer)) {
    const memberOffer = brandedOffer
      .replace(/^./, (character) => character.toLowerCase())
      .replace(/\byour\b/gi, 'their');

    return `${partner.name} members ${memberOffer} at checkout.`;
  }

  return `${partner.name} members receive ${brandedOffer} at checkout.`;
}

function PlayerProof() {
  return (
    <section
      id="reviews"
      className="scroll-mt-20 bg-[#202333] py-16 text-white lg:py-20"
    >
      <div className={WRAP}>
        <Heading
          kicker="Real players. Real training."
          title="Players in action."
          copy="Hear from players and parents using SogilityGO for purposeful work between organized sessions."
          light
        />
        <div className="mt-9 grid gap-6 lg:grid-cols-[0.62fr_1.38fr]">
          <article className="relative isolate mx-auto flex min-h-[570px] w-full max-w-[400px] flex-col justify-between overflow-hidden rounded-[24px] border border-white/15 p-6">
            <video
              className="absolute inset-0 -z-20 h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/landing/hero-1920.webp"
              aria-label="SogilityGO player training story"
            >
              <source
                src="https://cdn.shopify.com/videos/c/o/v/957532ac62a94a25998792a5a2f4b17a.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-[#202333]/95" />
            <span className="self-start rounded-full bg-sogility px-3 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-[#202333]">
              Player story
            </span>
            <div>
              <blockquote className="text-[32px] font-black leading-[1.18] tracking-[-0.03em]">
                “It helps me with my weak foot.”
              </blockquote>
              <p className="mt-3 text-[13px] text-white/65">
                Sam, Noblesville United SC
              </p>
            </div>
          </article>
          <div className="flex flex-col rounded-[24px] border border-white/15 bg-white/[0.055] p-6 lg:p-8">
            <Kicker>Player + parent reviews</Kicker>
            <h3 className="mt-2 text-[28px] font-black leading-tight">
              What families and players say about SogilityGO
            </h3>
            <div className="mt-4 divide-y divide-white/15">
              {[
                [
                  'My son has always wanted to train more, but he needed structure. SogilityGO gives him a clear plan and helps him make the most of his time between team practices.',
                  'Kevin, Soccer Parent',
                ],
                [
                  'The lights keep me reacting, and the app tells me exactly what to work on. It makes every session feel different and keeps me motivated.',
                  'Hagan, St. Louis Scott Gallagher SC',
                ],
                [
                  'Quality repetitions outside of organized practice can make a meaningful difference. SogilityGO gives players structure and encourages them to take ownership of their development.',
                  'Todd, Soccer Coach',
                ],
              ].map(([quote, author]) => (
                <div key={author} className="py-6">
                  <blockquote className="text-[18px] font-bold leading-[1.45] lg:text-[21px]">
                    “{quote}”
                  </blockquote>
                  <p className="mt-3 text-[13px] text-white/60">{author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Status({included}: {included: boolean}) {
  return (
    <span
      className={`inline-grid h-8 w-8 place-items-center rounded-full font-black ${included ? 'bg-sogility text-[#202333]' : 'bg-[#eceee8] text-[#9a9da5]'}`}
    >
      {included ? '✓' : '–'}
    </span>
  );
}

function Comparison({partner}: {partner: PartnerData}) {
  return (
    <section className="py-14 lg:py-16">
      <div className={WRAP}>
        <Heading
          kicker="Why SogilityGO?"
          title="More than a rebounder."
          copy="A standard rebounder returns the ball. SogilityGO combines ball return, visual decision cues, free app connectivity, and optional coaching tools in one connected system."
          center
        />
        <div className="mt-8 overflow-x-auto rounded-[24px] border border-[#dfe0d9] bg-white shadow-[0_18px_45px_rgba(31,34,49,0.07)]">
          <div className="min-w-[680px]">
            <div className="grid grid-cols-[1.55fr_0.72fr_0.72fr] items-center bg-[#202333] font-black text-white">
              <div className="p-5">Training feature</div>
              <div className="p-5 text-center">Standard rebounder</div>
              <div className="h-full bg-sogility/10 p-5 text-center text-sogility">
                SogilityGO
              </div>
            </div>
            {COMPARISON.map(([title, copy, standard]) => (
              <div
                key={title}
                className="grid min-h-[72px] grid-cols-[1.55fr_0.72fr_0.72fr] items-center border-t border-[#dfe0d9]"
              >
                <div className="p-4 lg:px-6">
                  <strong className="block text-[15px]">{title}</strong>
                  <small className="mt-1 block text-[12px] text-[#656977]">
                    {copy}
                  </small>
                </div>
                <div className="p-4 text-center">
                  <Status included={standard} />
                </div>
                <div className="grid h-full place-items-center bg-sogility/[0.055] p-4">
                  <Status included />
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mx-auto mt-4 max-w-[820px] text-center text-[12px] leading-[1.55] text-[#656977]">
          <strong className="block text-[#202333]">
            *Available with the optional SogilityGO Coach subscription.
          </strong>{' '}
          Unlocks guided activities, personalized plans, the full activity
          library, progress tracking, and up to five player profiles.
        </p>
        <div className="mt-6 text-center">
          <a
            href="#start-training"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-sogility px-7 font-black text-[#202333] transition hover:-translate-y-0.5"
          >
            Claim {partner.name} offer
          </a>
        </div>
      </div>
    </section>
  );
}

function RepLoop() {
  return (
    <section
      id="rep-loop"
      className="scroll-mt-20 bg-[#202333] py-14 text-white lg:py-16"
    >
      <div className={WRAP}>
        <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <Heading
            kicker="What one rep looks like"
            title="Read. React. Decide. Repeat."
            light
          />
          <p className="text-[16px] leading-[1.65] text-white/70">
            Each rep asks the player to follow the session, read the cue,
            receive the return, and use the feedback to adjust, building
            ownership through purposeful work.
          </p>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REP_LOOP.map((step) => (
            <article
              key={step.number}
              className="rounded-[24px] border border-white/15 bg-white/[0.045] p-5"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-16 w-16 place-items-center rounded-[18px] border border-white/15 bg-[radial-gradient(circle,rgba(48,190,45,0.2),transparent_65%)]">
                  <img
                    src={step.image}
                    alt=""
                    className="h-12 w-12 object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="text-[34px] font-black text-white/20">
                  {step.number}
                </span>
              </div>
              <Kicker>{step.product}</Kicker>
              <h3 className="mt-2 text-[21px] font-black">{step.title}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-white/65">
                {step.copy}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-[18px] border border-sogility/25 bg-sogility/[0.07] px-5 py-4 text-center text-[12px] font-black uppercase tracking-[0.05em]">
          {[
            'Follow the session',
            'Read the cue',
            'Receive the return',
            'Adjust the next rep',
          ].map((item, index) => (
            <span key={item} className="flex items-center gap-3">
              {index > 0 ? <span className="text-sogility">→</span> : null}
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const logos = [
    ...TRUSTED_LOGOS.map((logo) => ({
      ...logo,
      key: `${logo.alt}-primary`,
      hidden: false,
    })),
    ...TRUSTED_LOGOS.map((logo) => ({
      ...logo,
      key: `${logo.alt}-duplicate`,
      hidden: true,
    })),
  ];
  return (
    <section className="overflow-hidden border-y border-[#dfe0d9] bg-white py-10">
      <p className="mb-6 text-center text-[12px] font-black uppercase tracking-[0.14em] text-[#656977]">
        Trusted across the soccer community
      </p>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
        <div className="flex w-max animate-[marquee_34s_linear_infinite] items-center gap-12">
          {logos.map((logo) => (
            <img
              key={logo.key}
              src={logo.src}
              alt={logo.hidden ? '' : logo.alt}
              aria-hidden={logo.hidden || undefined}
              className="h-[70px] w-[160px] shrink-0 object-contain"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function OwnerMessage() {
  return (
    <section
      className="border-t border-[#dfe0d9] bg-[radial-gradient(circle_at_12%_0%,rgba(48,190,45,0.12),transparent_34%),#f4f1e7] py-16 lg:py-[68px]"
      aria-labelledby="partner-owner-heading"
    >
      <div className={WRAP}>
        <Kicker>Message from the owner</Kicker>
        <h2
          id="partner-owner-heading"
          className="mt-3 max-w-[900px] text-[38px] font-black italic leading-[0.98] tracking-[-0.045em] text-sogility sm:text-[48px] lg:text-[56px]"
        >
          What separates good players from elite
        </h2>
        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-11">
          <figure className="overflow-hidden rounded-[24px] bg-[#202333] shadow-[0_18px_45px_rgba(31,34,49,0.13)]">
            <img
              src="/landing/owner/jozy.webp"
              alt="Jozy Altidore, SogilityGO co-founder and former USMNT striker"
              className="aspect-[1.5/1] w-full object-cover"
              loading="lazy"
            />
          </figure>
          <div className="text-center">
            <blockquote className="text-left text-[18px] leading-[1.55] lg:text-[20px]">
              “I built SogilityGO because I know exactly what separates good
              players from elite ones: the invisible hours spent training away
              from the team. We created this so your child is not just getting
              more touches in the backyard. They are getting the right touches,
              guided by pro-level technology, to build the confidence they need
              on game day.”
            </blockquote>
            <img
              src="/landing/owner/jozy-sig.svg"
              alt=""
              className="mx-auto mt-6 w-[95px]"
              loading="lazy"
            />
            <p className="mt-2 text-[19px] font-black text-sogility">
              Jozy Altidore
            </p>
            <p className="mt-1 text-[14px] font-bold">
              Former USMNT Striker &amp; Co-founder, SogilityGO
            </p>
            <p className="mt-1 text-[13px] text-[#656977]">
              115 Caps for the USMNT | Professional Career across the Premier
              League, Europe &amp; MLS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnerFaq({partner}: {partner: PartnerData}) {
  const questions = [
    [
      `How is the ${partner.name} member offer applied?`,
      `The partner page carries the offer into checkout automatically, so families do not need to copy or type the discount code.`,
    ],
    [
      'Which setup is right for my player?',
      'Starter is the most compact one-board setup. Advanced adds a second return angle. Pro adds a third for the widest variety of returns.',
    ],
    [
      'What comes with each setup?',
      'Each setup includes the ReboundIQ board or boards, matching Impact Light or lights, app access, colored markers, and the charging and setup accessories for that configuration.',
    ],
    [
      'How much space and which ball do we need?',
      'Use a flat indoor or outdoor surface with enough room to safely receive the return. Players can use their standard size 3, 4, or 5 soccer ball.',
    ],
    [
      'What ages and skill levels is it for?',
      'SogilityGO can support a wide range of ages and skill levels. Players choose activities and work at a pace that fits their ability.',
    ],
    [
      'How much screen time is involved?',
      'Players use the app to choose and start an activity. Audio instructions and Impact Light cues help guide Coach sessions, so players are not expected to watch the screen throughout training.',
    ],
    [
      'Do we need a SogilityGO Coach subscription?',
      'No. The free app connects the Impact Lights and includes a selection of drills. Optional Coach unlocks guided plans, the full activity library, progress tracking, and up to five player profiles.',
    ],
    [
      'Can more than one player use SogilityGO?',
      'Yes. With SogilityGO Coach, families can create up to five player profiles with separate plans and progress histories.',
    ],
    [
      'Can parents track progress?',
      'Yes. With optional SogilityGO Coach, each player profile keeps completed work and progress history in the app.',
    ],
    [
      'Does SogilityGO need to stay plugged in?',
      'No. ReboundIQ does not require power, and the Impact Lights are rechargeable.',
    ],
    [
      'Does this replace regular coaching?',
      'No. SogilityGO supports purposeful work between practices, coaching sessions, and games.',
    ],
  ];
  const left = questions.slice(0, 6);
  const right = questions.slice(6);
  const columns = [
    {key: 'left', items: left},
    {key: 'right', items: right},
  ];
  return (
    <section id="faq" className="scroll-mt-20 bg-[#202333] py-16 text-white">
      <div className={WRAP}>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-12">
          <Heading
            kicker="Questions parents ask"
            title="Answers before checkout."
            light
          />
          <p className="text-[16px] leading-[1.65] text-white/70">
            Compare setups, understand what is included, and see how SogilityGO
            supports purposeful work alongside organized practices, coaching,
            and games.
          </p>
        </div>
        <div className="mt-8 grid items-start gap-3 lg:grid-cols-2">
          {columns.map((column, columnIndex) => (
            <div key={column.key} className="grid gap-3">
              {column.items.map(([question, answer], index) => (
                <details
                  key={question}
                  open={columnIndex === 0 && index === 0}
                  className="group overflow-hidden rounded-[18px] border border-white/15 bg-white text-[#202333]"
                >
                  <summary className="relative cursor-pointer list-none px-5 py-[18px] pr-14 text-[17px] font-black leading-[1.35] after:absolute after:right-[18px] after:top-1/2 after:grid after:h-7 after:w-7 after:-translate-y-1/2 after:place-items-center after:rounded-full after:bg-sogility after:text-[18px] after:font-black after:content-['+'] group-open:after:content-['−']">
                    {question}
                  </summary>
                  <p className="px-5 pb-5 text-[15px] leading-[1.6] text-[#656977]">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnerLandingFooter() {
  return (
    <footer className="border-t border-[#dfe0d9] bg-[#f7f6ef] py-12 text-[#202333] lg:py-14">
      <div className={WRAP}>
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-[0.2em]">SOGILITY</span>
          <span className="rounded-full bg-sogility px-2 py-0.5 text-sm font-black text-white">
            GO
          </span>
        </div>
        <div className="mt-8 grid gap-9 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <p className="max-w-[360px] text-[17px] leading-[1.65] text-[#515562]">
              SogilityGO ReboundIQ setups connect to the SogilityGO app, giving
              players access to purposeful training wherever they have room to
              work.
            </p>
            <div className="mt-5 flex gap-4">
              <a
                href="https://www.instagram.com/sogilitygo/"
                target="_blank"
                rel="noreferrer"
                className="font-black underline"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@sogilitygo"
                target="_blank"
                rel="noreferrer"
                className="font-black underline"
              >
                TikTok
              </a>
            </div>
          </div>
          <FooterLinks
            title="About SogilityGO"
            links={[
              ['About Us', 'https://www.sogilitygo.com/pages/about-us'],
              [
                'Meet SogilityGO',
                'https://www.sogilitygo.com/pages/meet-sogilitygo',
              ],
              ['Our Boards', 'https://www.sogilitygo.com/pages/our-boards'],
              ['Our Lights', 'https://www.sogilitygo.com/pages/our-lights'],
              ['Our App', 'https://www.sogilitygo.com/pages/our-app'],
            ]}
          />
          <FooterLinks
            title="Resources"
            links={[
              ['Help Center', 'https://www.sogilitygo.com/pages/support'],
              ['Contact Us', 'https://www.sogilitygo.com/pages/contact'],
              ['Blog', 'https://www.sogilitygo.com/blogs/news'],
            ]}
          />
          <div>
            <h2 className="font-black">Join Today</h2>
            <p className="mt-3 text-[14px] leading-[1.55] text-[#656977]">
              Get product news, training tips, and SogilityGO updates.
            </p>
            <a
              href="https://www.sogilitygo.com/pages/contact"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#202333] px-6 font-black text-white"
            >
              Stay connected
            </a>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-[#dfe0d9] pt-6 text-[13px] text-[#656977] lg:flex-row lg:items-center lg:justify-between">
          <span>© 2026, SogilityGO®</span>
          <div className="flex flex-wrap gap-5">
            <a href="https://www.sogilitygo.com/policies/privacy-policy">
              Privacy policy
            </a>
            <a href="https://www.sogilitygo.com/policies/terms-of-service">
              Terms of service
            </a>
            <a href="https://www.sogilitygo.com/policies/refund-policy">
              Refund policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <nav>
      <h2 className="font-black">{title}</h2>
      <ul className="mt-3 space-y-2 text-[14px] text-[#515562]">
        {links.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
