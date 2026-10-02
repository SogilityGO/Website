import {type ReactNode, useEffect, useRef, useState} from 'react';
import {Container, Eyebrow, SectionTitle, Placeholder} from './ui';
import {AffirmLoader, AffirmMessage} from './affirm';
import {trackBeginCheckout} from './analytics';
import type {SitewidePromotion} from '~/lib/promotion';

const TRUSTED_LOGOS = [
  {src: '/landing/logos/p1.webp', alt: 'Partner club'},
  {src: '/landing/logos/p2.webp', alt: 'Partner club'},
  {src: '/landing/logos/p3.webp', alt: 'Partner club'},
  {src: '/landing/logos/p4.webp', alt: 'Partner club'},
  {src: '/landing/logos/p5.webp', alt: 'Partner club'},
  {src: '/landing/logos/p6.webp', alt: 'Partner club'},
];

/**
 * Sogility GO parents landing — sections (polish pass to match Figma).
 *
 * Copy is taken from the Figma layout. Media still uses <Placeholder> until
 * real assets are pulled from Figma. Prices shown are the Figma values and are
 * static for now — wired to the Storefront API in the commerce step.
 */

/* 3 — Hero */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-dark text-white">
      <picture>
        <source
          type="image/webp"
          srcSet="/landing/hero-960.webp 960w, /landing/hero-1280.webp 1280w, /landing/hero-1920.webp 1920w"
          sizes="100vw"
        />
        <img
          src="/landing/hero-1920.jpg"
          alt="Young player training at home with SogilityGO rebounder boards"
          className="absolute inset-0 h-full w-full object-cover [object-position:24%_30%] lg:[object-position:50%_50%]"
          fetchPriority="high"
        />
      </picture>
      {/* dark gradient for text legibility — desktop only (over-darkens mobile) */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-dark/85 via-dark/40 to-transparent lg:block" />
      {/* green glow, left */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-[radial-gradient(circle_at_left,rgba(48,190,45,0.35),transparent_60%)]" />
      {/* mobile gradient: dark at top (title) + light middle (boy/countdown) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dark/80 via-transparent to-dark/35 lg:hidden" />

      <div className="relative mx-auto min-h-[520px] max-w-[1440px] lg:min-h-[707px]">
        {/* Countdown — green progress arc + "10 Seconds". Mobile: left, mid. */}
        <div className="pointer-events-none absolute left-5 top-[260px] h-[170px] w-[170px] lg:left-[324px] lg:top-[48px] lg:h-[260px] lg:w-[260px]">
          <img
            src="/landing/countdown-arc.svg"
            alt=""
            className="absolute inset-0 h-full w-full rotate-180"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="title-italic text-[80px] leading-none text-white [text-shadow:0_3.6px_3.6px_rgba(0,0,0,0.45)] lg:text-[112px] lg:leading-[116px]">
              10
            </span>
            <span className="-mt-2 text-[14px] font-extrabold italic tracking-[0.02em] text-grey-001 lg:-mt-5 lg:text-[20px]">
              Seconds
            </span>
          </div>
        </div>

        {/* Text block — left 85 */}
        <div className="flex min-h-[520px] flex-col justify-start px-6 pt-6 lg:min-h-[707px] lg:justify-center lg:pt-0 lg:pl-[85px] lg:pr-0">
          <p className="text-[14px] font-extrabold uppercase leading-[28px] tracking-[0.1em] text-sogility lg:text-[16px] lg:leading-[38px]">
            At-home soccer training
          </p>
          <h1 className="title-italic max-w-[330px] text-[42px] leading-[43px] tracking-[-0.01em] text-cream lg:max-w-[501px] lg:text-[62px] lg:leading-[66px]">
            Big Confidence Begins in the Backyard
          </h1>
          <p className="mt-4 hidden max-w-[486px] text-[18px] leading-[26px] tracking-[-0.01em] text-cream lg:block lg:text-[20px] lg:leading-[28px]">
            ReboundIQ boards, Impact Lights and the free SogilityGO app turn time
            between team practices into purposeful reps.
          </p>
          <div className="mt-7 hidden lg:block">
            <a
              href="#start-training"
              className="inline-flex items-center gap-2 rounded-full bg-sogility px-7 py-3.5 font-bold text-white transition hover:brightness-110"
            >
              Get SogilityGO
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 4 — Unlock banner (stats): cream block + 50-80 + green chevron panel */
export function UnlockBanner() {
  return (
    // Full-bleed section: green panel reaches the right viewport edge, while the
    // left content stays aligned to the centered 1440 grid.
    <section className="w-full bg-white">
      {/* Mobile layout — centered title + 50-80 / +1000 cards + 4x */}
      <div className="bg-cream px-6 py-8 text-center lg:hidden">
        <p className="text-[20px] font-extrabold leading-[28px] tracking-[-0.01em] text-dark">
          Purposeful reps between practices
        </p>
        <p className="text-[18px] font-bold leading-[22px] tracking-[-0.01em] text-sogility">
          One connected system
        </p>
        <div className="mx-auto mt-4 flex h-[96px] w-[345px] max-w-full items-stretch overflow-hidden rounded-tr-[24px] bg-white">
          <div className="flex flex-1 flex-col items-center justify-center px-3 text-center">
            <p className="title-italic text-[36px] leading-[38px] tracking-[-0.02em] text-blue-003">
              5
            </p>
            <p className="text-[13px] leading-[16px] tracking-[-0.01em] text-blue-005">
              Core skills in every assessment
            </p>
          </div>
          <div className="relative flex w-[178px] shrink-0 flex-col items-center justify-center text-center">
            <img
              src="/landing/unlock-green.svg"
              alt=""
              className="absolute inset-0 h-full w-full"
            />
            <div className="relative">
              <p className="title-italic text-[36px] leading-[38px] tracking-[-0.02em] text-cream">
                180+
              </p>
              <p className="text-[13px] leading-[16px] tracking-[-0.01em] text-white">
                Guided activities with Coach
              </p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[16px] leading-[22px] text-dark">
          <span className="font-bold">Free app</span> included with every setup
        </p>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex lg:h-[130px] lg:flex-row lg:items-stretch">
        {/* Left — cream block, content aligned to centered-1440 left inset */}
        <div className="flex flex-col justify-center bg-cream px-6 py-6 lg:shrink-0 lg:grow-0 lg:basis-[max(466px,calc((100%_-_1440px)/2_+_466px))] lg:py-0 lg:pl-[max(85px,calc((100%_-_1440px)/2_+_85px))]">
          <p className="text-[20px] font-extrabold leading-[28px] tracking-[-0.01em] text-dark">
            Purposeful reps between practices
          </p>
          <p className="text-[18px] font-bold leading-[22px] tracking-[-0.01em] text-sogility">
            One connected system
          </p>
        </div>

        {/* Middle — 50-80 */}
        <div className="flex flex-col justify-center bg-white px-6 py-6 text-center lg:w-[219px] lg:shrink-0 lg:py-0">
          <p className="title-italic text-[36px] leading-[38px] tracking-[-0.02em] text-blue-003">
            5
          </p>
          <p className="text-[14px] leading-[18px] tracking-[-0.01em] text-blue-005">
            Core skills in every assessment
          </p>
        </div>

        {/* Right — green gradient panel with chevron, bleeds to the right edge */}
        <div className="relative flex flex-1 items-center justify-center gap-4 bg-[linear-gradient(134.4deg,#30be2d_37.31%,#165815_96.77%)] px-6 py-8 lg:py-0 lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%,44px_50%)]">
          <span className="title-italic text-[62px] leading-[65px] tracking-[-0.01em] text-cream">
            180+
          </span>
          <span className="text-[18px] leading-[22px] tracking-[-0.01em] text-white">
            Guided activities with SogilityGO Coach
          </span>
        </div>
      </div>
    </section>
  );
}

/* 5 — Trusted by (logos). Mobile: horizontal scroll strip. */
export function TrustedBy() {
  return (
    <section>
      {/* TRUSTED BY — white band with thin green top border */}
      <div className="flex h-[42px] items-center justify-center border-t-[1.333px] border-sogility/60 bg-white lg:h-14">
        <p className="text-[14px] font-extrabold uppercase leading-none tracking-[1.4px] text-sogility lg:text-[18.667px] lg:tracking-[1.87px]">
          Trusted by
        </p>
      </div>

      {/* Logos — mobile: auto-scrolling marquee; desktop: centered wrap */}
      <div className="overflow-hidden bg-cream pb-6 pt-4 lg:hidden">
        <div className="flex w-max items-center [animation:marquee_22s_linear_infinite] motion-reduce:[animation:none]">
          {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={i < TRUSTED_LOGOS.length ? logo.alt : ''}
              aria-hidden={i >= TRUSTED_LOGOS.length}
              className="mr-[53px] h-[80px] w-auto shrink-0"
              loading="lazy"
            />
          ))}
        </div>
      </div>
      <div className="hidden items-center justify-center gap-x-[71px] gap-y-8 bg-cream px-6 pb-8 pt-5 lg:flex lg:flex-wrap">
        {TRUSTED_LOGOS.map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.alt}
            className="h-[107px] w-auto shrink-0"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}

/* 5b — Training together */
export function TrainingTogether() {
  return (
    <section className="bg-cream">
      <div className="flex flex-col lg:flex-row lg:items-stretch">
          {/* Photo — mobile: title overlaid on image; desktop: bleed to left edge */}
          <div className="relative h-[540px] lg:h-auto lg:min-h-[554px] lg:shrink-0 lg:grow-0 lg:basis-[max(478px,calc((100%_-_1440px)/2_+_478px))]">
            <video
              className="absolute inset-0 h-full w-full object-cover object-center"
              poster="/landing/training-together.webp"
              aria-label="Coach guiding a young player with the SogilityGO app"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
            >
              <source src="/landing/training-together.mp4" type="video/mp4" />
            </video>
            {/* mobile green glow + title overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_55%_at_15%_0%,rgba(48,190,45,0.5),transparent_55%)] lg:hidden" />
            <div className="absolute left-8 right-6 top-6 lg:hidden">
              <p className="text-[14px] font-extrabold uppercase tracking-[1.4px] text-dark">
                Training together
              </p>
              <h2 className="title-italic mt-2 max-w-[290px] text-[42px] leading-[43px] tracking-[-0.42px] text-cream">
                Supporting your player&rsquo;s journey
              </h2>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-1 flex-col justify-center px-6 py-10 lg:py-20 lg:pl-[88px] lg:pr-[max(85px,calc((100%_-_1440px)/2_+_85px))]">
            <p className="hidden text-[14px] font-semibold uppercase tracking-[1.4px] text-dark lg:block">
              Training together
            </p>
            <h2 className="title-italic mt-3 hidden max-w-[760px] text-[42px] leading-[43px] tracking-[-0.42px] text-sogility lg:block">
              Supporting your player&rsquo;s journey
            </h2>
            <div className="mt-6 max-w-[620px] space-y-6 lg:mt-8">
              <TrainingBullet title="Confidence on the ball" defaultOpen>
                <p className="text-[16px] leading-[22px] text-grey">
                  A clean first touch and control under pressure help players
                  keep possession and play with confidence. That sharpness
                  comes from repetition.
                </p>
                <p className="mt-2 text-[14px] font-semibold text-sogility-deep">
                  Supports coaching, team practice and games
                </p>
              </TrainingBullet>
              <TrainingBullet title="Ready for the next session">
                <p className="text-[16px] leading-[22px] text-grey">
                  Extra touches at home help players arrive at practice ready
                  to keep learning, instead of starting from scratch.
                </p>
              </TrainingBullet>
              <TrainingBullet title="Practice with purpose">
                <p className="text-[16px] leading-[22px] text-grey">
                  Structured training, not random drills. Each session has a
                  clear focus, so time between practices counts.
                </p>
              </TrainingBullet>
            </div>
          </div>
        </div>
    </section>
  );
}

/** Heavy filled rightwards arrow (matches the Figma "➔" glyph). */
function ArrowRight({className = ''}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 32 26"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M0 9.5h17V2.5L32 13 17 23.5V16.5H0z" />
    </svg>
  );
}

/** Training-together accordion item with an arrow aligned to the title line. */
function TrainingBullet({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children?: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group">
      <summary className="flex cursor-pointer list-none items-start gap-3">
        <span className="flex h-[22px] w-[28px] shrink-0 items-center justify-center text-sogility">
          <ArrowRight className="w-[24px]" />
        </span>
        <span className="flex-1 text-[18px] font-bold leading-[22px] text-dark">
          {title}
        </span>
        <span className="text-[26px] font-light leading-none text-sogility group-open:hidden">
          +
        </span>
        <span className="hidden text-[26px] font-light leading-none text-sogility group-open:inline">
          &minus;
        </span>
      </summary>
      {children ? <div className="mt-2 pl-[38px]">{children}</div> : null}
    </details>
  );
}

/* 6 — Player journey (4-step timeline) */
const JOURNEY_STEPS = [
  {
    img: '/landing/journey/j1.webp',
    badge: '/landing/journey/clipboard.svg',
    week: 'DAY 1',
    title: 'Assess',
    stat: '5 drills',
    desc: "Five assessment drills set your player's starting point in first touch, passing, dribbling, vision and agility.",
  },
  {
    img: '/landing/journey/j2.webp',
    badge: '/landing/journey/badge-trophy.svg',
    week: 'DAYS 1-10',
    title: 'Follow the plan',
    stat: '10-day plan',
    desc: 'SogilityGO Coach builds a personalized plan from the assessment results.',
  },
  {
    img: '/landing/journey/get-noticed.webp',
    badge: '/landing/journey/clipboard.svg',
    week: 'DAY 10',
    title: 'Reassess',
    stat: '5 drills',
    desc: 'Your player repeats the assessment to see how their results have changed.',
  },
  {
    img: '/landing/journey/j4.webp',
    badge: '/landing/journey/clipboard.svg',
    week: 'NEXT',
    title: 'Keep developing',
    stat: 'New plan',
    desc: 'The next plan reflects their progress, so time between practices always has a clear focus.',
  },
];

export function PlayerJourney() {
  return (
    <section className="relative overflow-hidden bg-cream py-20">
      {/* green glow, top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[373px] bg-[radial-gradient(55%_110%_at_28%_0%,rgba(48,190,45,0.22),transparent_65%)]" />
      <Container className="relative">
        <p className="text-[14px] font-semibold uppercase tracking-[1.4px] text-dark">
          Player journey
        </p>
        <h2 className="title-italic mt-1 text-[42px] leading-[43px] tracking-[-0.42px] text-sogility">
          A clear focus every 10 days
        </h2>

        {/* Mobile — slider */}
        <JourneySlider />

        {/* Desktop — 4-up grid */}
        <div className="mt-14 hidden grid-cols-4 gap-x-2 lg:grid">
          {JOURNEY_STEPS.map((s, i) => (
            <div key={s.week} className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="h-[200px] w-[200px] overflow-hidden rounded-full">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <img
                  src={s.badge}
                  alt=""
                  className="absolute -bottom-1 right-1 w-[52px]"
                />
                {i < JOURNEY_STEPS.length - 1 && (
                  <span className="absolute -right-12 top-1/2 hidden -translate-y-1/2 text-sogility lg:block min-[1440px]:-right-[72px]">
                    <ArrowRight className="w-[26px]" />
                  </span>
                )}
              </div>

              <p className="mt-5 text-[14px] font-extrabold uppercase tracking-[1.4px] text-[#22ae1f]">
                {s.week}
              </p>
              <p className="mt-2 text-[18px] font-bold text-dark">{s.title}</p>
              <p className="mt-1 text-[20px] font-bold italic tracking-[-0.2px] text-[#22ae1f]">
                {s.stat}
              </p>
              <p className="mt-2 max-w-[260px] text-[15px] leading-[22px] text-dark">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Mobile Player-journey slider (native scroll-snap + dots + next arrow). */
function JourneySlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };
  const next = () => {
    const el = ref.current;
    if (!el) return;
    const i = (active + 1) % JOURNEY_STEPS.length;
    el.scrollTo({left: i * el.clientWidth, behavior: 'smooth'});
  };
  return (
    <div className="relative mt-10 lg:hidden">
      <div
        ref={ref}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {JOURNEY_STEPS.map((s) => (
          <div
            key={s.week}
            className="flex w-full shrink-0 snap-center flex-col items-center px-6 text-center"
          >
            <div className="relative">
              <div className="h-[200px] w-[200px] overflow-hidden rounded-full">
                <img
                  src={s.img}
                  alt={s.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <img
                src={s.badge}
                alt=""
                className="absolute -bottom-1 right-1 w-[52px]"
              />
            </div>
            <p className="mt-5 text-[14px] font-extrabold uppercase tracking-[1.4px] text-[#22ae1f]">
              {s.week}
            </p>
            <p className="mt-2 text-[20px] font-extrabold text-dark">{s.title}</p>
            <p className="mt-2 text-[24px] font-bold italic tracking-[-0.24px] text-[#22ae1f]">
              {s.stat}
            </p>
            <p className="mt-2 max-w-[300px] text-[16px] leading-[22px] text-dark">
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      {/* next arrow */}
      <button
        type="button"
        onClick={next}
        aria-label="Next step"
        className="absolute right-3 top-[88px] text-sogility"
      >
        <svg width="34" height="24" viewBox="0 0 34 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M2 12h28M22 4l9 8-9 8" />
        </svg>
      </button>

      {/* dots */}
      <div className="mt-4 flex justify-center gap-2">
        {JOURNEY_STEPS.map((s, i) => (
          <span
            key={s.week}
            className={`h-[8px] rounded-full transition-all ${
              i === active ? 'w-6 bg-sogility' : 'w-[8px] bg-sogility/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* 7 — Your Virtual Coach (dark). Every feature listed here is part of the
   optional paid SogilityGO Coach membership, so each one carries a badge. */
const COACH_FEATURES = [
  {
    icon: '/landing/coach/icons/coach.svg',
    title: 'Your Virtual Coach',
    desc: 'Guidance and pro tips from soccer coaches for every activity',
  },
  {
    icon: '/landing/coach/icons/training.svg',
    title: 'Tailored Training',
    desc: "A personalized 10-day plan built from your player's assessment",
  },
  {
    icon: '/landing/coach/icons/videos.svg',
    title: '180+ Videos',
    desc: 'The full library of pro-designed activities. The free app includes 15 core-principle activities.',
  },
  {
    icon: '/landing/coach/icons/multiplayer.svg',
    title: 'Multiplayer',
    desc: 'Up to five player profiles, each with its own plan. The free app includes one.',
  },
];

function CoachBadge() {
  return (
    <span className="ml-2 inline-block rounded-full border border-sogility/60 px-2 py-[1px] align-middle text-[11px] font-semibold uppercase tracking-[1px] text-sogility">
      With Coach
    </span>
  );
}

export function VirtualCoach() {
  return (
    <section className="bg-dark text-white">
      <Container className="grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-[1fr_minmax(0,540px)] lg:gap-12 lg:py-20">
        {/* Left — title + phone/analytics photo */}
        <div className="flex flex-col">
          <p className="text-[14px] font-semibold uppercase tracking-[1.4px] text-sogility">
            How it works
          </p>
          <h2 className="title-italic mt-1 text-[42px] leading-[43px] tracking-[-0.42px] text-cream">
            Your Virtual Coach
          </h2>
          <p className="mt-3 max-w-[540px] text-[16px] leading-[22px] text-blue-003">
            Every setup includes the free SogilityGO app: 15 core-principle
            activities, a three-day training plan, one assessment and one player
            profile. The features on this page come with optional SogilityGO
            Coach, $9.99/month or $99.99/year.
          </p>
          <img
            src="/landing/coach/phone-graph.webp"
            alt="SogilityGO app showing player skill analytics"
            className="mt-8 w-full max-w-[540px] self-center lg:mt-10"
            loading="lazy"
          />
        </div>

        {/* Right — features + store badges */}
        <div className="flex flex-col gap-7">
          {/* Desktop — stacked features */}
          <div className="hidden flex-col gap-7 lg:flex">
            {COACH_FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-5">
                <img
                  src={f.icon}
                  alt=""
                  aria-hidden
                  className="h-[72px] w-[72px] shrink-0"
                  loading="lazy"
                />
                <div>
                  <p className="text-[16px] font-bold text-white">
                    {f.title}
                    <CoachBadge />
                  </p>
                  <p className="text-[16px] leading-[22px] text-blue-003">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile — feature slider */}
          <FeatureSlider />

          <div className="mt-4 flex items-center justify-center gap-3 lg:justify-start">
            <span className="text-[16px] text-blue-003">Available on:</span>
            <a
              href="https://play.google.com/store/apps/details?id=com.ytiligos.sogilitygo"
              target="_blank"
              rel="noreferrer"
              aria-label="Get SogilityGO on Google Play"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/15"
            >
              <img
                src="/landing/coach/icons/google-play.svg"
                alt=""
                className="h-6 w-6"
                loading="lazy"
              />
            </a>
            <a
              href="https://apps.apple.com/us/app/sogilitygo-soccer-training/id6754323607"
              target="_blank"
              rel="noreferrer"
              aria-label="Download SogilityGO on the App Store"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/15"
            >
              <img
                src="/landing/coach/icons/app-store.svg"
                alt=""
                className="h-6 w-6"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Mobile slider for the Your Virtual Coach feature items. */
function FeatureSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };
  return (
    <div className="lg:hidden">
      <div
        ref={ref}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {COACH_FEATURES.map((f) => (
          <div
            key={f.title}
            className="flex w-full shrink-0 snap-center items-center gap-5 px-2"
          >
            <img
              src={f.icon}
              alt=""
              aria-hidden
              className="h-[72px] w-[72px] shrink-0"
              loading="lazy"
            />
            <div>
              <p className="text-[16px] font-bold text-white">
                {f.title}
                <CoachBadge />
              </p>
              <p className="text-[16px] leading-[22px] text-blue-003">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {COACH_FEATURES.map((f, i) => (
          <span
            key={f.title}
            className={`h-[8px] rounded-full transition-all ${
              i === active ? 'w-6 bg-sogility' : 'w-[8px] bg-sogility/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* 8 — Player + parent reviews (real Shopify-hosted videos, click-to-play) */
const REVIEWS = [
  {
    name: 'Sam',
    meta: '13  |  Noblesville United SC  |  Midfielder',
    caption: '“It helps me with my weak foot.”',
    video:
      'https://cdn.shopify.com/videos/c/vp/3241b786375542e3bce7f82e20d4c2c6/3241b786375542e3bce7f82e20d4c2c6.HD-1080p-4.8Mbps-81554159.mp4#t=0.1',
  },
  {
    name: 'Harlow',
    meta: '10  |  Noblesville United SC  |  Midfielder',
    caption: '“The boards and app are super fun and entertaining.”',
    video:
      'https://cdn.shopify.com/videos/c/vp/1a3d1b1a31cd4532a68626068b44ef12/1a3d1b1a31cd4532a68626068b44ef12.HD-1080p-4.8Mbps-81554158.mp4#t=0.1',
  },
  {
    name: 'Ava',
    meta: '9  |  Indy Eleven Academy  |  Defender',
    caption: '“It helps me get better on both of my feet.”',
    video:
      'https://cdn.shopify.com/videos/c/vp/2104f55f21dd49b3a6adc8434921cf42/2104f55f21dd49b3a6adc8434921cf42.HD-1080p-4.8Mbps-81554157.mp4#t=0.1',
  },
  {
    name: 'Wes',
    meta: '8  |  Indy Eleven Academy  |  Midfielder',
    caption: '“I’m sharper and more confident at every session.”',
    video:
      'https://cdn.shopify.com/videos/c/vp/f469c30e9bd54378be5531cc53998f01/f469c30e9bd54378be5531cc53998f01.HD-1080p-4.8Mbps-81554156.mp4#t=0.1',
  },
  {
    name: 'Rudy',
    meta: 'Coach  |  Noblesville United SC',
    caption: '“Your players’ first touch will vastly improve.”',
    video:
      'https://cdn.shopify.com/videos/c/o/v/957532ac62a94a25998792a5a2f4b17a.mp4',
    poster:
      'https://cdn.shopify.com/s/files/1/0942/1380/0238/files/rudy_thumbnail_1.jpg?v=1781007392',
  },
];

export function Reviews() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 lg:py-20">
      {/* green glow, top (mobile light-gradient from Figma) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[170px] bg-[radial-gradient(90%_120%_at_80%_0%,rgba(48,190,45,0.30),transparent_60%)] lg:hidden" />

      {/* desktop: 4-up grid */}
      <Container className="relative hidden lg:block">
        <p className="text-[14px] font-semibold uppercase tracking-[1.4px] text-dark">
          Player + parent reviews
        </p>
        <h2 className="title-italic mt-1 text-[42px] leading-[43px] tracking-[-0.42px] text-sogility">
          Players in action
        </h2>

        <div className="mt-12 grid grid-cols-1 justify-items-center gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {REVIEWS.map((r) => (
            <ReviewCard key={r.name} {...r} />
          ))}
        </div>
      </Container>

      {/* mobile: horizontal slider, active video autoplays */}
      <ReviewsSlider />
    </section>
  );
}

/** Mobile reviews slider — one video card per view, active card autoplays muted. */
function ReviewsSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const videos = useRef<Array<HTMLVideoElement | null>>([]);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  // Autoplay only the visible card; pause + reset the rest.
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        void v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [active]);

  return (
    <div className="relative lg:hidden">
      <div className="flex flex-col gap-1 px-8 pb-4 pt-6">
        <p className="text-[14px] font-semibold uppercase leading-[38px] tracking-[1.4px] text-dark">
          Player + parent reviews
        </p>
        <h2 className="title-italic text-[42px] leading-[43px] tracking-[-0.42px] text-sogility">
          Players in action
        </h2>
      </div>

      <div
        ref={ref}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {REVIEWS.map((r, i) => (
          <div key={r.name} className="w-full shrink-0 snap-center px-6">
            <div className="relative aspect-[345/515] overflow-hidden rounded-2xl bg-black">
              <video
                ref={(el) => {
                  videos.current[i] = el;
                }}
                src={r.video}
                poster={r.poster}
                className="h-full w-full object-cover"
                muted
                loop
                playsInline
                preload={i === 0 ? 'auto' : 'metadata'}
              />
              {i !== active && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden>
                    <circle cx="32" cy="32" r="30" stroke="#fff" strokeWidth="2.5" />
                    <path d="M27 22.5 44 32 27 41.5z" fill="#fff" />
                  </svg>
                </span>
              )}
            </div>
            <p className="mt-4 text-center text-[14px] font-extrabold leading-[38px] tracking-[1.4px] text-sogility">
              {r.name}
            </p>
            <p className="text-center text-[14px] leading-[18px] tracking-[-0.14px] text-dark">
              {r.meta}
            </p>
            {r.caption && (
              <p className="mt-2 px-6 text-center text-[20px] font-extrabold leading-[28px] tracking-[-0.2px] text-surface">
                {r.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2 pb-2">
        {REVIEWS.map((r, i) => (
          <span
            key={r.name}
            className={`h-[8px] rounded-full transition-all ${
              i === active ? 'w-6 bg-sogility' : 'w-[8px] bg-sogility/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({
  name,
  meta,
  caption,
  video,
  poster,
}: {
  name: string;
  meta: string;
  caption?: string;
  video: string;
  poster?: string;
}) {
  return (
    <div className="w-full max-w-[300px]">
      <PlayableVideo
        src={video}
        poster={poster}
        label={`Play ${name}'s video`}
        className="aspect-[313/468]"
      />
      <p className="mt-4 text-center text-[14px] font-extrabold tracking-[1.4px] text-sogility">
        {name}
      </p>
      <p className="text-center text-[14px] text-dark">{meta}</p>
      {caption && (
        <p className="mx-auto mt-2 max-w-[300px] text-center text-[14px] font-bold leading-[22px] text-surface">
          {caption}
        </p>
      )}
    </div>
  );
}

/** Click-to-play video with a centered play-button overlay. */
function PlayableVideo({
  src,
  label,
  poster,
  className = '',
}: {
  src: string;
  label: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-black ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        className="h-full w-full object-cover"
        loop
        playsInline
        preload="metadata"
        onClick={toggle}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
      {!playing && (
        <button
          type="button"
          aria-label={label}
          onClick={toggle}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden>
            <circle cx="32" cy="32" r="30" stroke="#fff" strokeWidth="2.5" />
            <path d="M27 22.5 44 32 27 41.5z" fill="#fff" />
          </svg>
        </button>
      )}
    </div>
  );
}

/* 9 — Elite Training Board (dark) — same pattern as Training together */
const BOARD_BULLETS = [
  {
    title: 'Realistic ball return',
    desc: 'High-density polyethylene sends the ball back with pace, so every pass and first touch has a purpose.',
  },
  {
    title: 'Decisions in every rep',
    desc: 'Impact Light cues prompt players to read, react and decide, so training goes beyond simple ball return.',
  },
  {
    title: 'Durable and portable',
    desc: 'Built for hard passes and outdoor use, with dual handles to move it between the backyard, driveway and garage.',
  },
];

function BoardSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };
  return (
    <div className="lg:hidden">
      <div
        ref={ref}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {BOARD_BULLETS.map((b, i) => (
          <div
            key={i}
            className="flex w-full shrink-0 snap-center items-start gap-2 px-6 pb-6 pt-8"
          >
            <span className="flex h-[25px] w-[35px] shrink-0 items-center justify-center text-sogility">
              <ArrowRight className="w-[26px]" />
            </span>
            <div className="flex flex-col gap-2">
              <p className="text-[20px] font-extrabold leading-[28px] tracking-[-0.2px] text-cream">
                {b.title}
              </p>
              <p className="text-[16px] leading-[22px] tracking-[-0.16px] text-blue-003">
                {b.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-center gap-2 pb-6">
        {BOARD_BULLETS.map((b, i) => (
          <span
            key={i}
            className={`h-[8px] rounded-full transition-all ${
              i === active ? 'w-6 bg-sogility' : 'w-[8px] bg-sogility/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function TrainingBoard() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-dark text-white"
    >
      {/* green glow, top-left */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[400px] bg-[radial-gradient(50%_110%_at_24%_0%,rgba(48,190,45,0.18),transparent_65%)]" />

      {/* Desktop — title + board left, feature bullets right */}
      <Container className="relative hidden grid-cols-2 items-center gap-12 py-20 lg:grid">
        <div className="flex flex-col">
          <p className="text-[14px] font-semibold uppercase tracking-[1.4px] text-sogility">
            How it works
          </p>
          <h2 className="title-italic mt-1 text-[42px] leading-[43px] tracking-[-0.42px] text-cream">
            Elite Training Board
          </h2>
          <img
            src="/landing/board/board-light.webp"
            alt="SogilityGO Rebound IQ training board with smart light"
            className="mt-6 w-full max-w-[500px] self-center"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-8">
          {BOARD_BULLETS.map((b, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center text-sogility">
                <ArrowRight className="w-[26px]" />
              </span>
              <div>
                <p className="text-[24px] font-bold leading-[30px] tracking-[-0.32px] text-cream">
                  {b.title}
                </p>
                <p className="mt-1 text-[20px] leading-[27px] tracking-[-0.2px] text-blue-003">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Mobile — title, centered board, bullet slider */}
      <div className="relative lg:hidden">
        <div className="flex flex-col gap-1 px-8 pt-6">
          <p className="text-[14px] font-semibold uppercase leading-[38px] tracking-[1.4px] text-sogility">
            How it works
          </p>
          <h2 className="title-italic text-[42px] leading-[43px] tracking-[-0.42px] text-cream">
            Elite Training Board
          </h2>
        </div>
        <img
          src="/landing/board/board-light.webp"
          alt="SogilityGO Rebound IQ training board with smart light"
          className="mx-auto mt-2 w-[303px]"
          loading="lazy"
        />
        <BoardSlider />
      </div>
    </section>
  );
}

/* 10 — Training built on five core skills / 5 Core Skills (dark).
   `lines` are the real per-skill checklists from the live store's VIRTUAL
   COACHING section (theme-live → templates/index.json). */
const CORE_SKILLS = [
  {
    name: 'First Touch',
    video:
      'https://cdn.shopify.com/videos/c/vp/46f00d79b2e649419a91efa619a501c1/46f00d79b2e649419a91efa619a501c1.HD-1080p-2.5Mbps-84889328.mp4#t=0.1',
    lines: [
      'Improve your ball control',
      'Receive and direct the ball smoothly',
      'Train your feet to handle the ball cleanly',
    ],
  },
  {
    name: 'Passing',
    video:
      'https://cdn.shopify.com/videos/c/vp/464dddbf1f4c47eb86f5abdf0272292f/464dddbf1f4c47eb86f5abdf0272292f.HD-1080p-2.5Mbps-84890162.mp4#t=0.1',
    lines: [
      'Pass the ball with confidence',
      'Learn to make more accurate passes',
      'Make quicker passing decisions',
    ],
  },
  {
    name: 'Dribbling',
    video:
      'https://cdn.shopify.com/videos/c/vp/40b47e65064a413880a398fd44edfae1/40b47e65064a413880a398fd44edfae1.HD-1080p-2.5Mbps-84890372.mp4#t=0.1',
    lines: [
      'Boost your ball mastery',
      'Navigate tight spaces',
      'Build confidence with the ball',
    ],
  },
  {
    name: 'Vision',
    video:
      'https://cdn.shopify.com/videos/c/vp/1846d9d5c7b1431fbfd625d4d70ac7bc/1846d9d5c7b1431fbfd625d4d70ac7bc.HD-1080p-2.5Mbps-84890561.mp4#t=0.1',
    lines: [
      'Master your spatial awareness',
      'Spot teammates sooner',
      'Make smarter plays',
    ],
  },
  {
    name: 'Agility',
    video:
      'https://cdn.shopify.com/videos/c/vp/c4b85330de34456493e3506945cd5c7d/c4b85330de34456493e3506945cd5c7d.HD-1080p-2.5Mbps-84890716.mp4#t=0.1',
    lines: [
      'Become quicker on your feet',
      'Improve your speed and coordination',
      'Make explosive movements',
    ],
  },
];

/** Per-skill checklist. Bolds the first word (the action verb) of each line. */
function SkillCopy({lines, size}: {lines: string[]; size: 14 | 18}) {
  const cls = `leading-[22px] text-blue-003 ${size === 18 ? 'text-[18px]' : 'text-[14px] leading-[18px]'}`;
  return (
    <>
      {lines.map((line) => {
        const [first, ...rest] = line.split(' ');
        return (
          <p key={line} className={cls}>
            <span className="font-bold text-cream">{first}</span>{' '}
            {rest.join(' ')}
          </p>
        );
      })}
    </>
  );
}

export function CoreSkills() {
  return (
    <section className="relative overflow-hidden bg-dark py-20 text-white">
      {/* green glow, top (mobile light-gradient from Figma) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[170px] bg-[radial-gradient(90%_120%_at_80%_0%,rgba(48,190,45,0.30),transparent_60%)] lg:hidden" />

      {/* desktop: 5-up grid */}
      <Container className="relative hidden lg:block">
        <p className="text-[14px] font-semibold uppercase tracking-[1.4px] text-sogility">
          5 core skills
        </p>
        <h2 className="title-italic mt-1 text-[42px] leading-[43px] tracking-[-0.42px] text-cream">
          Training built on five core skills
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {CORE_SKILLS.map((s, i) => (
            <div key={s.name} className="flex flex-col gap-4">
              <PlayableVideo
                src={s.video}
                label={`Play ${s.name} video`}
                className="aspect-[235/351]"
              />

              {/* number + skill info */}
              <div className="flex gap-2 px-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dashed border-blue-003 text-[18px] font-bold text-grey-001">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-3">
                  <p className="text-[18px] font-bold leading-[22px] text-sogility">
                    {s.name}
                  </p>
                  <SkillCopy lines={s.lines} size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* mobile: horizontal slider, active video autoplays */}
      <CoreSkillsSlider />
    </section>
  );
}

/** Mobile Core Skills slider — one skill per view, active card autoplays muted. */
function CoreSkillsSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const videos = useRef<Array<HTMLVideoElement | null>>([]);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  // Autoplay only the visible card; pause + reset the rest.
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        void v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [active]);

  return (
    <div className="relative lg:hidden">
      <div className="flex flex-col gap-1 px-8 pb-4 pt-6">
        <p className="text-[14px] font-semibold uppercase leading-[38px] tracking-[1.4px] text-sogility">
          5 core skills
        </p>
        <h2 className="title-italic text-[42px] leading-[43px] tracking-[-0.42px] text-cream">
          Training built on five core skills
        </h2>
      </div>

      <div
        ref={ref}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {CORE_SKILLS.map((s, i) => (
          <div key={s.name} className="w-full shrink-0 snap-center px-6">
            <div className="relative aspect-[345/515] overflow-hidden rounded-2xl bg-black">
              <video
                ref={(el) => {
                  videos.current[i] = el;
                }}
                src={s.video}
                className="h-full w-full object-cover"
                muted
                loop
                playsInline
                preload={i === 0 ? 'auto' : 'metadata'}
              />
              {i !== active && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden>
                    <circle cx="32" cy="32" r="30" stroke="#fff" strokeWidth="2.5" />
                    <path d="M27 22.5 44 32 27 41.5z" fill="#fff" />
                  </svg>
                </span>
              )}
            </div>

            {/* number + skill info, green divider */}
            <div className="mt-6 flex gap-4 border-b border-sogility pb-6">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dashed border-blue-003 text-[18px] font-bold text-grey-001">
                {i + 1}
              </span>
              <div className="flex flex-1 flex-col gap-4">
                <p className="text-[30px] font-extrabold leading-[28px] tracking-[-0.3px] text-sogility">
                  {s.name}
                </p>
                <SkillCopy lines={s.lines} size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2 pb-2">
        {CORE_SKILLS.map((s, i) => (
          <span
            key={s.name}
            className={`h-[8px] rounded-full transition-all ${
              i === active ? 'w-6 bg-sogility' : 'w-[8px] bg-sogility/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* 11 — Start Training (pricing). Tier name + handle map to live Shopify products;
   Buy buttons checkout via the `/cart/<variantId>:1` permalink (Storefront API). */
const PRICING_TIERS = [
  {
    name: 'Starter',
    handle: 'sogilitygo-rebounder-pro',
    img: '/landing/pricing/p1.webp',
    blurb: 'A focused one-board setup for first touch and passing reps.',
    priceCents: 34900,
    compareAtPriceCents: 39900,
    popular: false,
    features: ['Rebound IQ board ×1', 'Impact Light ×1', 'Free SogilityGO app'],
  },
  {
    name: 'Advanced',
    handle: 'sogilitygo-reboundiq-elite',
    img: '/landing/pricing/p2.webp',
    blurb: 'Adds a second return angle for sequences that combine reaction and decision-making.',
    priceCents: 64900,
    compareAtPriceCents: 79900,
    popular: true,
    features: ['Rebound IQ board ×2', 'Impact Light ×2', 'Free SogilityGO app'],
  },
  {
    name: 'Pro',
    handle: 'sogilitygo-reboundiq-ultimate',
    img: '/landing/pricing/p3.webp',
    blurb: 'Three boards for the widest training area and the most return angles.',
    priceCents: 94900,
    compareAtPriceCents: 119900,
    popular: false,
    features: ['Rebound IQ board ×3', 'Impact Light ×3', 'Free SogilityGO app'],
  },
];

/** Live checkout data per tier, resolved in the route loader from the Storefront API. */
export type TierCheckout = {variantId: string; available: boolean};
export type CheckoutMap = Record<string, TierCheckout | undefined>;
export type {SitewidePromotion};

type PricingTier = (typeof PRICING_TIERS)[number];

function tierPriceCents(
  tier: PricingTier,
  promotion?: SitewidePromotion,
): number {
  if (!promotion) return tier.priceCents;
  return Math.floor(
    (tier.priceCents * (100 - promotion.discountPercentage)) / 100,
  );
}

function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

function TierPrice({
  tier,
  promotion,
}: {
  tier: PricingTier;
  promotion?: SitewidePromotion;
}) {
  const currentPriceCents = tierPriceCents(tier, promotion);
  const savingsCents = tier.compareAtPriceCents - currentPriceCents;

  return (
    <div className="flex flex-col gap-2 pt-4">
      <div
        className="flex flex-wrap items-center gap-3.5"
        role="group"
        aria-label={`Regular price ${formatPrice(tier.compareAtPriceCents)}. Sale price ${formatPrice(currentPriceCents)}. You save ${formatPrice(savingsCents)}.`}
      >
        <span className="text-[30px] font-extrabold leading-[28px] tracking-[-0.3px] text-sogility">
          {formatPrice(currentPriceCents)}
        </span>
        <span className="text-[16px] font-medium text-dark line-through decoration-red-600 decoration-2">
          {formatPrice(tier.compareAtPriceCents)}
        </span>
        <span className="rounded-lg border-2 border-dashed border-sogility bg-white px-3 py-1 text-[16px] font-extrabold leading-none text-sogility">
          Save {formatPrice(savingsCents)}
        </span>
      </div>
      {promotion && (
        <p className="text-[12px] leading-[17px] text-blue-005">
          {promotion.offerMessage && <span>{promotion.offerMessage} </span>}
          <span>Discount applied automatically at checkout.</span>
        </p>
      )}
    </div>
  );
}

/**
 * Buy button → Shopify checkout.
 * - available: link to `/cart/<variantId>:1` (creates cart + redirects to checkout)
 * - sold out: disabled button
 * - no live data (fetch failed): fall back to the product page on the live store
 */
function BuyButton({
  tier,
  checkout,
  className,
  discountCode,
  currentPriceCents,
}: {
  tier: PricingTier;
  checkout?: CheckoutMap;
  className: string;
  discountCode?: string;
  currentPriceCents: number;
}) {
  const c = checkout?.[tier.name];
  const gradient =
    'border border-sogility-deep bg-[linear-gradient(188deg,#30be2d_13%,#30892e_68%)] text-white shadow-[0px_4px_10px_rgba(0,0,0,0.25)] transition hover:brightness-105';

  if (c && !c.available) {
    return (
      <button
        type="button"
        disabled
        className={`${className} cursor-not-allowed border border-grey/40 bg-grey/30 text-cream`}
      >
        Sold out
      </button>
    );
  }

  const href = c
    ? `/cart/${c.variantId}:1${discountCode ? `?discount=${encodeURIComponent(discountCode)}` : ''}`
    : `https://www.sogilitygo.com/products/${tier.handle}`;
  const external = !c;

  return (
    <a
      href={href}
      {...(external ? {target: '_blank', rel: 'noreferrer'} : {})}
      onClick={() =>
        trackBeginCheckout({
          tierName: tier.name,
          valueUSD: currentPriceCents / 100,
          variantId: c?.variantId,
        })
      }
      className={`${className} ${gradient}`}
    >
      Buy {tier.name}
    </a>
  );
}

export function StartTraining({
  checkout,
  promotion,
}: {
  checkout?: CheckoutMap;
  promotion?: SitewidePromotion;
}) {
  return (
    <section
      id="start-training"
      className="relative overflow-hidden bg-dark py-16 text-white lg:py-20"
    >
      {/* green glow, top (mobile light-gradient from Figma) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[170px] bg-[radial-gradient(90%_120%_at_80%_0%,rgba(48,190,45,0.30),transparent_60%)] lg:hidden" />

      {/* loads the Affirm SDK once for the as-low-as widgets below */}
      <AffirmLoader />

      <Container className="relative hidden lg:block">
        <p className="text-[14px] font-semibold uppercase tracking-[1.4px] text-sogility">
          Choose your best fit
        </p>
        <h2 className="title-italic mt-1 text-[42px] leading-[43px] tracking-[-0.42px] text-cream">
          Start Training
        </h2>

        <div className="mt-12 flex flex-col items-center gap-6 md:flex-row md:items-stretch md:justify-center">
          {PRICING_TIERS.map((t) => (
            <div
              key={t.name}
              className="w-full max-w-[345px] overflow-hidden rounded-bl-[24px] rounded-tr-[24px] bg-cream text-left shadow-[0_12px_30px_rgba(0,0,0,0.22)]"
            >
              {/* Photo */}
              <div className="relative h-[230px] border-b-2 border-sogility">
                <img
                  src={t.img}
                  alt={`Rebound IQ ${t.name}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {t.popular && (
                  <span className="absolute left-0 top-0 flex h-8 items-center bg-sogility px-3 text-[16px] font-extrabold text-cream">
                    Most Popular
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="flex flex-col gap-6 px-4 pb-6 pt-4">
                <div className="flex flex-col gap-[7px]">
                  <div className="text-[30px] font-extrabold leading-[28px] tracking-[-0.3px]">
                    <p className="text-sogility">ReboundIQ</p>
                    <p className="text-dark">{t.name}</p>
                  </div>
                  <p className="text-[16px] leading-[22px] text-blue-005">
                    {t.blurb}
                  </p>
                  <TierPrice tier={t} promotion={promotion} />
                </div>

                <div className="flex flex-col gap-2 pl-6 text-[14px] leading-[22px]">
                  {t.features.map((f, i) => (
                    <p key={i} className="text-blue-005">
                      <span className="text-sogility">&rarr;</span> {f}
                    </p>
                  ))}
                </div>

                <BuyButton
                  tier={t}
                  checkout={checkout}
                  discountCode={promotion?.discountCode}
                  currentPriceCents={tierPriceCents(t, promotion)}
                  className="flex w-full items-center justify-center rounded-2xl p-3 text-[16px] font-bold"
                />
                <AffirmMessage
                  amountCents={tierPriceCents(t, promotion)}
                  className="text-center text-[14px] text-dark"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Policy row */}
        <div className="mx-auto mt-14 flex max-w-[944px] items-stretch">
          {[
            ['14', 'Day Return Policy'],
            ['1', 'Year Warranty'],
            ['Indoor', 'or outdoor, weather-resistant'],
          ].map(([n, label], i) => (
            <div
              key={label}
              className={`flex flex-1 items-center justify-center gap-4 px-2 py-4 ${
                i < 2 ? 'border-r border-sogility' : ''
              }`}
            >
              <span className="text-[24px] font-bold leading-none text-sogility">
                {n}
              </span>
              <span className="text-[12px] font-medium text-cream">{label}</span>
            </div>
          ))}
        </div>
      </Container>

      {/* mobile: horizontal slider of pricing cards */}
      <StartTrainingSlider checkout={checkout} promotion={promotion} />

      <Container className="relative">
        <FreeVsCoach />
      </Container>
    </section>
  );
}

/** Free app vs optional Coach membership, matching the partner pages. */
function FreeVsCoach() {
  return (
    <div className="mx-auto mt-10 grid max-w-[1095px] overflow-hidden rounded-[22px] border border-white/15 text-left lg:mt-12 lg:grid-cols-2">
      <div className="bg-[#f7f6ef] p-6 text-dark lg:p-8">
        <p className="text-[12px] font-black uppercase tracking-[0.13em] text-sogility-deep">
          Included with every setup
        </p>
        <h3 className="mt-2 text-[24px] font-black">Free SogilityGO app</h3>
        <p className="mt-2 text-[15px] leading-[1.6] text-[#656977]">
          Connect the Impact Lights and start training with 15 core-principle
          activities, a three-day training plan, one assessment and one player
          profile. No subscription required.
        </p>
      </div>
      <div className="bg-[#202333] p-6 text-white lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.13em] text-sogility">
              Optional upgrade
            </p>
            <h3 className="mt-2 text-[24px] font-black">SogilityGO Coach</h3>
          </div>
          <strong className="text-[18px] text-sogility">
            $9.99/month{' '}
            <small className="block text-[11px] font-semibold text-white/60">
              or $99.99/year
            </small>
          </strong>
        </div>
        <p className="mt-3 text-[15px] leading-[1.6] text-white/70">
          A personalized 10-day plan built from your player&rsquo;s assessment,
          reassessment after each plan, all 180+ activities with pro tips,
          progress tracking and up to five player profiles.
        </p>
      </div>
    </div>
  );
}

/** Mobile Start Training slider — one pricing card per view, shared policy row + dots. */
function StartTrainingSlider({
  checkout,
  promotion,
}: {
  checkout?: CheckoutMap;
  promotion?: SitewidePromotion;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Slides are narrower than the viewport (the next card peeks), so derive the
  // active index from whichever slide centre is closest to the viewport centre.
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const centre = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const child = c as HTMLElement;
      const d = Math.abs(child.offsetLeft + child.offsetWidth / 2 - centre);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  };

  return (
    <div className="relative lg:hidden">
      <div className="flex flex-col gap-1 px-8 pb-4 pt-6">
        <p className="text-[14px] font-semibold uppercase leading-[38px] tracking-[1.4px] text-sogility">
          Choose your best fit
        </p>
        <h2 className="title-italic text-[42px] leading-[43px] tracking-[-0.42px] text-cream">
          Start Training
        </h2>
      </div>

      <div
        ref={ref}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PRICING_TIERS.map((t) => (
          <div key={t.name} className="w-[85%] shrink-0 snap-center">
            <div className="overflow-hidden rounded-bl-[24px] rounded-tr-[24px] bg-cream text-left shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
              {/* Photo */}
              <div className="relative h-[230px] border-b-2 border-sogility">
                <img
                  src={t.img}
                  alt={`Rebound IQ ${t.name}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {t.popular && (
                  <span className="absolute left-0 top-0 flex h-8 items-center bg-sogility px-3 text-[16px] font-extrabold text-cream">
                    Most Popular
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="flex flex-col gap-6 px-4 pb-6 pt-4">
                <div className="flex flex-col gap-[7px]">
                  <div className="text-[30px] font-extrabold leading-[28px] tracking-[-0.3px]">
                    <p className="text-sogility">ReboundIQ</p>
                    <p className="text-dark">{t.name}</p>
                  </div>
                  <p className="text-[16px] leading-[22px] text-blue-005">
                    {t.blurb}
                  </p>
                  <TierPrice tier={t} promotion={promotion} />
                </div>

                <div className="flex flex-col gap-2 pl-6 text-[18px] leading-[22px]">
                  {t.features.map((f, i) => (
                    <p
                      key={i}
                      className={`text-blue-005 ${i === 0 ? 'font-bold' : ''}`}
                    >
                      <span className="font-normal text-sogility">&rarr;</span> {f}
                    </p>
                  ))}
                </div>

                <BuyButton
                  tier={t}
                  checkout={checkout}
                  discountCode={promotion?.discountCode}
                  currentPriceCents={tierPriceCents(t, promotion)}
                  className="flex h-14 w-full items-center justify-center rounded-2xl p-3 text-[18px] font-semibold"
                />
                <AffirmMessage
                  amountCents={tierPriceCents(t, promotion)}
                  className="text-center text-[14px] text-dark"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel dots — directly under the product cards */}
      <div className="mt-5 flex justify-center gap-2">
        {PRICING_TIERS.map((t, i) => (
          <span
            key={t.name}
            className={`h-[8px] rounded-full transition-all ${
              i === active ? 'w-6 bg-sogility' : 'w-[8px] bg-sogility/30'
            }`}
          />
        ))}
      </div>

      {/* Policy row (shared, static) */}
      <div className="mt-8 flex items-stretch justify-center px-6 pb-2">
        {[
          ['14', 'Day Return Policy'],
          ['1', 'Year Warranty'],
          ['Indoor', 'or outdoor, weather-resistant'],
        ].map(([n, label], i) => (
          <div
            key={label}
            className={`flex flex-1 flex-col items-center justify-center gap-1 px-2.5 py-4 text-center ${
              i < 2 ? 'border-r border-sogility' : ''
            }`}
          >
            <span className="text-[24px] font-bold leading-[18px] text-sogility">
              {n}
            </span>
            <span className="text-[12px] font-medium leading-4 text-cream">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 11b — Setup and training (dark) — Figma 2001:2379 / 2001:2381 */
const SETUP_STEPS = [
  {
    img: '/landing/setup/board.webp',
    rounded: true,
    step: 'Step 1',
    title: 'Set up the board',
    desc: 'Attach the two legs with the included Allen key and choose ground or air rebounding. Works on any flat surface: backyard, driveway, garage or basement.',
  },
  {
    img: '/landing/setup/phone-light.webp',
    rounded: false,
    step: 'Step 2',
    title: 'Pair the Impact Light',
    desc: 'Charge the Impact Light, download the SogilityGO app and pair the light over Bluetooth. Ready every session after that.',
  },
  {
    img: '/landing/setup/phone-explore.webp',
    rounded: false,
    step: 'Step 3',
    title: 'Start the first session',
    desc: 'Create a player profile and complete the five-drill assessment. With SogilityGO Coach, the Virtual Coach turns the results into a personalized 10-day plan.',
  },
];

type SetupStepT = (typeof SETUP_STEPS)[number];

function SetupStepText({step, title, desc}: SetupStepT) {
  return (
    <div className="mt-6 flex flex-col gap-3 px-1">
      <p className="text-[14px] font-extrabold uppercase tracking-[1.4px] text-sogility">
        {step}
      </p>
      <p className="text-[18px] font-bold leading-[22px] text-cream">{title}</p>
      <p className="text-[14px] leading-[18px] tracking-[-0.14px] text-blue-003">
        {desc}
      </p>
    </div>
  );
}

function SetupImage({img, rounded}: {img: string; rounded: boolean}) {
  return (
    <div className="flex h-[300px] items-end justify-center lg:h-[354px]">
      {rounded ? (
        <img
          src={img}
          alt=""
          className="h-full w-full rounded-2xl object-cover"
          loading="lazy"
        />
      ) : (
        <img src={img} alt="" className="h-full w-auto object-contain" loading="lazy" />
      )}
    </div>
  );
}

export function SetupTraining() {
  return (
    <section className="relative overflow-hidden bg-dark text-white">
      {/* green glow, top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-[radial-gradient(50%_110%_at_24%_0%,rgba(48,190,45,0.18),transparent_65%)]" />

      <Container className="relative pb-4 pt-16 lg:pb-20 lg:pt-20">
        <p className="text-[14px] font-semibold uppercase tracking-[1.4px] text-sogility">
          Setup and training
        </p>
        <h2 className="title-italic mt-1 text-[42px] leading-[43px] tracking-[-0.42px] text-cream">
          Set it up together once
        </h2>
        <p className="mt-2 max-w-[608px] text-[16px] leading-[22px] text-blue-003">
          After the first setup, your player can start sessions on their own.
        </p>

        {/* desktop: 3 columns */}
        <div className="mt-12 hidden grid-cols-3 gap-10 lg:grid">
          {SETUP_STEPS.map((s) => (
            <div key={s.step} className="flex flex-col">
              <SetupImage img={s.img} rounded={s.rounded} />
              <SetupStepText {...s} />
            </div>
          ))}
        </div>
      </Container>

      {/* mobile: slider */}
      <SetupSlider />
    </section>
  );
}

/** Mobile Setup-and-training slider — one step per view + dots. */
function SetupSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };
  return (
    <div className="relative pb-6 lg:hidden">
      <div
        ref={ref}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SETUP_STEPS.map((s) => (
          <div key={s.step} className="w-full shrink-0 snap-center px-6">
            <SetupImage img={s.img} rounded={s.rounded} />
            <SetupStepText {...s} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {SETUP_STEPS.map((s, i) => (
          <span
            key={s.step}
            className={`h-[8px] rounded-full transition-all ${
              i === active ? 'w-6 bg-sogility' : 'w-[8px] bg-sogility/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* 12 — Message from the owner (cream) — Figma 490:3494 / 2002:1890 */
export function OwnerMessage() {
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* green glow, top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[200px] bg-[radial-gradient(80%_120%_at_15%_0%,rgba(48,190,45,0.22),transparent_60%)]" />
      <Container className="relative py-12 lg:py-16">
        <p className="text-[14px] font-semibold uppercase tracking-[1.4px] text-dark">
          Message from Jozy Altidore
        </p>
        <h2 className="title-italic mt-1 text-[42px] leading-[43px] tracking-[-0.42px] text-sogility">
          Built for the player who keeps going
        </h2>

        <div className="mt-8 flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-10">
          <img
            src="/landing/owner/jozy.webp"
            alt="Jozy Altidore, SogilityGO co-owner and former USMNT forward"
            className="aspect-square w-full max-w-[345px] shrink-0 rounded-2xl object-cover object-top lg:aspect-[453/433] lg:w-[453px] lg:max-w-none"
            loading="lazy"
          />

          <div className="flex flex-col lg:max-w-[790px]">
            <p className="text-center text-[18px] leading-[27px] tracking-[-0.18px] text-surface lg:text-left lg:text-[19px] lg:leading-[28px]">
              Jozy grew up in South Florida finding ways to get extra touches at
              home after team practice. SogilityGO brings that habit into a
              guided system.
            </p>
            <p className="mt-4 text-center text-[18px] leading-[27px] tracking-[-0.18px] text-surface lg:text-left lg:text-[19px] lg:leading-[28px]">
              &ldquo;My mission is simple: to inspire the next generation to
              dream bigger and work smarter. SogilityGO is how we make that
              happen.&rdquo;
            </p>

            <div className="mt-5 flex flex-col items-center">
              <img
                src="/landing/owner/jozy-sig.svg"
                alt=""
                aria-hidden
                className="h-[54px] w-auto"
              />
              <p className="mt-2 text-[18px] font-bold text-sogility">
                Jozy Altidore
              </p>
              <p className="mt-1 text-center text-[14px] font-semibold text-dark">
                Former USMNT Forward, CSO &amp; Co-Owner, SogilityGO
              </p>
              <p className="text-center text-[14px] text-dark">
                115 Caps for the USMNT | Professional Career across the Premier
                League, Europe &amp; MLS
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* 13 — FAQ */
export function Faq() {
  return (
    <section
      id="faq"
      className="border-t-[3px] border-blue-005 bg-white py-16 lg:border-t-0"
    >
      <Container>
        {/* mobile: compact "FAQ" label */}
        <p className="text-[20px] font-extrabold leading-[28px] tracking-[-0.2px] text-dark lg:hidden">
          FAQ
        </p>
        {/* desktop: eyebrow + big italic title */}
        <p className="hidden text-[14px] font-semibold uppercase tracking-[1.4px] text-dark lg:block">
          Things you might ask
        </p>
        <h2 className="title-italic mt-1 hidden text-[42px] leading-[43px] tracking-[-0.42px] text-sogility lg:block">
          FAQs
        </h2>

        {/* Parent-focused FAQ (client copy). About-product first on mobile,
            Parents-first on desktop (responsive order). */}
        <div className="mt-6 flex flex-col lg:mt-10 lg:px-16">
          <div className="order-2 lg:order-1">
            <h3 className="mb-1 mt-8 text-[14px] font-semibold uppercase tracking-[1.4px] text-[#22ae1f] lg:mt-0">
              For Parents and Coaches:
            </h3>
            <FaqItem
              open
              q="Is this suitable for my child's age and skill level?"
              a="SogilityGO is designed for players ages 6 to 18, from young beginners to experienced club players. Every player starts with an assessment. With SogilityGO Coach, their plan is built from the results and updated after each reassessment."
            />
            <FaqItem
              q="Do we need a SogilityGO Coach subscription?"
              a="No. The free app connects the Impact Lights and includes 15 core-principle activities, a three-day training plan, one assessment and one player profile. Optional SogilityGO Coach ($9.99/month or $99.99/year) adds personalized 10-day plans, the full 180+ activity library, progress tracking and up to five player profiles."
            />
            <FaqItem
              q="I have more than one child playing soccer. Can they share the system?"
              a="Yes. Everyone can train on the same ReboundIQ boards. The free app includes one player profile. With SogilityGO Coach, you can set up to five player profiles, each with its own personalized plan and progress tracking."
            />
            <FaqItem
              q="As a parent, how can I track their progress?"
              a="With SogilityGO Coach, progress tracking and performance review let you see their training history and how their assessment results change after each reassessment."
            />
            <FaqItem
              q={'Is this going to just be more "screen time" for my kid?'}
              a="It's active time, not screen time. The phone sets up the activity, then Impact Light cues guide the work (with audio instructions in SogilityGO Coach), so your player's eyes stay on the ball and the lights."
            />
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="mb-1 mt-8 text-[14px] font-semibold uppercase tracking-[1.4px] text-[#22ae1f] lg:mt-10">
              About the product:
            </h3>
            <FaqItem
              q="Can we really use it indoors?"
              a="Yes. With a flat surface and enough room to kick a ball safely, SogilityGO works well in garages, basements and home gyms."
            />
            <FaqItem
              q="Will the boards break if my older kid kicks too hard?"
              a="ReboundIQ boards are made from high-density polyethylene built for hard passes and outdoor use. Every setup includes a 1-year limited warranty."
            />
            <FaqItem
              q="How long does it take to set up?"
              a="The first setup takes a few minutes: attach the two legs with the included Allen key, charge the Impact Light, and pair it with the SogilityGO app over Bluetooth. After that, place the board, power on the light, and your player is ready to train. No wiring or permanent installation is required."
            />
            <FaqItem
              q="Does my child need a specific type of soccer ball?"
              a="No. Your player can use their regular size 3, 4 or 5 ball. You'll also need a phone or tablet to run the app."
            />
            <FaqItem
              q="Do the boards need to be plugged in during use?"
              a="No. ReboundIQ boards have no wiring or power. The Impact Light runs on a rechargeable battery, so charge it with the included cable before training. Set up in the driveway, backyard or garage with no cords to trip over."
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function FaqItem({q, a, open}: {q: string; a?: ReactNode; open?: boolean}) {
  return (
    <details open={open} className="group border-b border-sogility">
      <summary className="flex cursor-pointer list-none items-center gap-2 py-3">
        <span className="flex-1 text-[14px] font-semibold leading-[22px] tracking-[-0.14px] text-blue-005">
          {q}
        </span>
        <span className="text-[24px] font-light leading-none text-sogility group-open:hidden">
          +
        </span>
        <span className="hidden text-[24px] font-light leading-none text-sogility group-open:inline">
          &minus;
        </span>
      </summary>
      {a ? (
        <div className="pb-6 pr-4 text-[16px] leading-[22px] tracking-[-0.16px] text-blue-005 lg:pr-20">
          {a}
        </div>
      ) : null}
    </details>
  );
}
