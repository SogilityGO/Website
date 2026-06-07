import {type ReactNode, useRef, useState} from 'react';
import {Container, Eyebrow, SectionTitle, Placeholder} from './ui';

const TRUSTED_LOGOS = [
  {src: '/landing/logos/anchor.webp', alt: 'Anchor Soccer'},
  {src: '/landing/logos/erie.webp', alt: 'Erie Soccer'},
  {src: '/landing/logos/usa.webp', alt: 'USA Soccer'},
  {src: '/landing/logos/anchor.webp', alt: 'Anchor Soccer'},
  {src: '/landing/logos/erie.webp', alt: 'Erie Soccer'},
  {src: '/landing/logos/usa.webp', alt: 'USA Soccer'},
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
          srcSet="/landing/hero-1280.webp 1280w, /landing/hero-1920.webp 1920w"
          sizes="100vw"
        />
        <img
          src="/landing/hero-1920.jpg"
          alt="Young player training at home with SogilityGO rebounder boards"
          className="absolute inset-0 h-full w-full object-cover [object-position:50%_22%] lg:[object-position:50%_50%]"
          fetchPriority="high"
        />
      </picture>
      {/* dark gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark/85 via-dark/40 to-transparent" />
      {/* green glow, left */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-[radial-gradient(circle_at_left,rgba(48,190,45,0.35),transparent_60%)]" />
      {/* mobile gradient: dark at top (title) and slightly at bottom (countdown) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dark/85 via-dark/10 to-dark/55 lg:hidden" />

      <div className="relative mx-auto min-h-[520px] max-w-[1440px] lg:min-h-[707px]">
        {/* Countdown — green progress arc + "10 Seconds". Mobile: left, mid. */}
        <div className="pointer-events-none absolute left-5 top-[210px] h-[170px] w-[170px] lg:left-[324px] lg:top-[48px] lg:h-[260px] lg:w-[260px]">
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
            <span className="lg:hidden">At-home virtual coach</span>
            <span className="hidden lg:inline">At-home soccer training</span>
          </p>
          <h1 className="title-italic max-w-[330px] text-[42px] leading-[43px] tracking-[-0.01em] text-cream lg:max-w-[501px] lg:text-[62px] lg:leading-[66px]">
            Elite soccer training at home
          </h1>
          <p className="mt-4 hidden max-w-[486px] text-[18px] leading-[26px] tracking-[-0.01em] text-cream lg:block lg:text-[20px] lg:leading-[28px]">
            A guided virtual coach. Real-time feedback. Measurable improvement.
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
          Unlocking their full potential
        </p>
        <p className="text-[18px] font-bold leading-[22px] tracking-[-0.01em] text-sogility">
          Improve training efficiency
        </p>
        <div className="mx-auto mt-4 flex h-[96px] w-[345px] max-w-full items-stretch overflow-hidden rounded-tr-[24px] bg-white">
          <div className="flex flex-1 flex-col items-center justify-center px-3 text-center">
            <p className="title-italic text-[36px] leading-[38px] tracking-[-0.02em] text-blue-003">
              50-80
            </p>
            <p className="text-[13px] leading-[16px] tracking-[-0.01em] text-blue-005">
              Touches per player in a typical team practice
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
                +1000
              </p>
              <p className="text-[13px] leading-[16px] tracking-[-0.01em] text-white">
                In a SogilityGO session
              </p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-[16px] leading-[22px] text-dark">
          <span className="font-bold">4x</span> a traditional sessions
        </p>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex lg:h-[130px] lg:flex-row lg:items-stretch">
        {/* Left — cream block, content aligned to centered-1440 left inset */}
        <div className="flex flex-col justify-center bg-cream px-6 py-6 lg:shrink-0 lg:grow-0 lg:basis-[max(466px,calc((100%_-_1440px)/2_+_466px))] lg:py-0 lg:pl-[max(85px,calc((100%_-_1440px)/2_+_85px))]">
          <p className="text-[20px] font-extrabold leading-[28px] tracking-[-0.01em] text-dark">
            Unlocking their full potential
          </p>
          <p className="text-[18px] font-bold leading-[22px] tracking-[-0.01em] text-sogility">
            Improve training efficiency x4
          </p>
        </div>

        {/* Middle — 50-80 */}
        <div className="flex flex-col justify-center bg-white px-6 py-6 text-center lg:w-[219px] lg:shrink-0 lg:py-0">
          <p className="title-italic text-[36px] leading-[38px] tracking-[-0.02em] text-blue-003">
            50-80
          </p>
          <p className="text-[14px] leading-[18px] tracking-[-0.01em] text-blue-005">
            Touches per player in a typical team practice
          </p>
        </div>

        {/* Right — green gradient panel with chevron, bleeds to the right edge */}
        <div className="relative flex flex-1 items-center justify-center gap-4 bg-[linear-gradient(134.4deg,#30be2d_37.31%,#165815_96.77%)] px-6 py-8 lg:py-0 lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%,44px_50%)]">
          <span className="title-italic text-[62px] leading-[65px] tracking-[-0.01em] text-cream">
            +1000
          </span>
          <span className="text-[18px] leading-[22px] tracking-[-0.01em] text-white">
            Touches in a SogilityGO session
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

      {/* Logos — mobile: horizontal scroll; desktop: centered wrap */}
      <div className="flex items-center gap-[53px] overflow-x-auto bg-cream px-4 pb-6 pt-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-wrap lg:justify-center lg:gap-x-[71px] lg:gap-y-8 lg:overflow-visible lg:px-6 lg:pb-8 lg:pt-5">
        {TRUSTED_LOGOS.map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.alt}
            className="h-[80px] w-auto shrink-0 lg:h-[107px]"
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
            <img
              src="/landing/training-together.webp"
              alt="Coach guiding a young player with the SogilityGO app"
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading="lazy"
            />
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
            <p className="max-w-[620px] text-[16px] leading-[22px] text-dark lg:mt-6">
              Success comes from more deliberate practice than the competition.
            </p>

            <div className="mt-6 max-w-[620px] space-y-6">
              <TrainingBullet
                title="Making the starting lineup, two lines if needed"
                defaultOpen
              >
                <p className="text-[16px] leading-[22px] text-grey">
                  Coaches pick players who look sharper, who control the ball
                  under pressure, whose first touch doesn&rsquo;t cost
                  possession. That sharpness comes from repetition.
                </p>
                <p className="mt-2 text-[14px] font-semibold text-sogility">
                  Visible improvement within 6-10 weeks
                </p>
              </TrainingBullet>
              <TrainingBullet title="Moving up a division" />
              <TrainingBullet title="Levelling up their talent" />
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
    week: 'WEEK 1',
    title: 'Test your skills',
    stat: '5 core skills',
    desc: 'What to expect week by week when a player commits to daily practice.',
  },
  {
    img: '/landing/journey/j2.webp',
    week: 'WEEK 4',
    title: 'Form habits',
    stat: '+20%',
    desc: 'Average accuracy gain',
  },
  {
    img: '/landing/journey/j3.webp',
    week: 'WEEK 8',
    title: 'Get noticed',
    stat: '600+',
    desc: 'Touches up per session. First touch visibly sharper at practice.',
  },
  {
    img: '/landing/journey/j4.webp',
    week: 'WEEK 10',
    title: 'Continue growth',
    stat: 'x4',
    desc: 'Extra work is now measurable and visible',
  },
];

export function PlayerJourney() {
  return (
    <section className="relative overflow-hidden bg-cream py-20">
      {/* green glow, top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[373px] bg-[radial-gradient(55%_110%_at_28%_0%,rgba(48,190,45,0.22),transparent_65%)]" />
      <Container className="relative">
        <p className="text-[14px] font-semibold uppercase tracking-[1.4px] text-dark">
          Training that delivers results
        </p>
        <h2 className="title-italic mt-1 text-[42px] leading-[43px] tracking-[-0.42px] text-sogility">
          Player journey
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
                  src="/landing/journey/clipboard.svg"
                  alt=""
                  className="absolute -bottom-1 right-1 w-[52px]"
                />
                {i < JOURNEY_STEPS.length - 1 && (
                  <span className="absolute -right-6 top-1/2 hidden -translate-y-1/2 text-sogility lg:block">
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
                src="/landing/journey/clipboard.svg"
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

/* 7 — Your Virtual Coach (dark) */
const COACH_FEATURES = [
  {
    icon: '/landing/coach/icons/coach.svg',
    title: 'Your Virtual Coach',
    desc: 'Get tips from pro soccer coaches to improve your training',
  },
  {
    icon: '/landing/coach/icons/training.svg',
    title: 'Tailored Training',
    desc: 'A training plan personalized just for you and your skills',
  },
  {
    icon: '/landing/coach/icons/videos.svg',
    title: '180+ Videos',
    desc: 'Access to the full library of pro-designed training activities',
  },
  {
    icon: '/landing/coach/icons/multiplayer.svg',
    title: 'Multiplayer',
    desc: 'Multiplayer feature text',
  },
];

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
                  <p className="text-[16px] font-bold text-white">{f.title}</p>
                  <p className="text-[16px] leading-[22px] text-blue-003">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile — feature slider */}
          <FeatureSlider />

          <div className="mt-3 flex items-center justify-center gap-3 lg:justify-start">
            <img
              src="/landing/coach/google-play.svg"
              alt="Get it on Google Play"
              className="h-[44px] w-auto"
              loading="lazy"
            />
            <img
              src="/landing/coach/app-store.svg"
              alt="Download on the App Store"
              className="h-[44px] w-auto"
              loading="lazy"
            />
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
              <p className="text-[16px] font-bold text-white">{f.title}</p>
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
];

export function Reviews() {
  return (
    <section className="bg-cream py-20">
      <Container>
        <p className="text-[14px] font-semibold uppercase tracking-[1.4px] text-dark">
          Player + parent reviews
        </p>
        <h2 className="title-italic mt-1 text-[42px] leading-[43px] tracking-[-0.42px] text-sogility">
          Player in action
        </h2>

        <div className="mt-12 grid grid-cols-1 justify-items-center gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <ReviewCard key={r.name} {...r} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ReviewCard({
  name,
  meta,
  caption,
  video,
}: {
  name: string;
  meta: string;
  caption: string;
  video: string;
}) {
  return (
    <div className="w-full max-w-[300px]">
      <PlayableVideo
        src={video}
        label={`Play ${name}'s video`}
        className="aspect-[313/468]"
      />
      <p className="mt-4 text-center text-[14px] font-extrabold tracking-[1.4px] text-sogility">
        {name}
      </p>
      <p className="text-center text-[14px] text-dark">{meta}</p>
      <p className="mx-auto mt-2 max-w-[300px] text-center text-[14px] font-bold leading-[22px] text-surface">
        {caption}
      </p>
    </div>
  );
}

/** Click-to-play video with a centered play-button overlay. */
function PlayableVideo({
  src,
  label,
  className = '',
}: {
  src: string;
  label: string;
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
    title: 'Rebound IQ tracking',
    desc: 'Connects to the SogilityGO app, giving you access to a complete library of guided drills.',
    tag: 'Track every touch',
  },
  {
    title: 'Rebound IQ tracking',
    desc: 'Connects to the SogilityGO app, giving you access to a complete library of guided drills.',
    tag: 'Track every touch',
  },
  {
    title: 'Rebound IQ tracking',
    desc: 'Connects to the SogilityGO app, giving you access to a complete library of guided drills.',
    tag: 'Track every touch',
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
              <p className="text-[14px] font-semibold leading-[22px] tracking-[-0.14px] text-sogility/90">
                {b.tag}
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
    <section className="relative overflow-hidden bg-dark text-white">
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
            src="/landing/board/board.webp"
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
                <p className="mt-1 text-[14px] font-semibold text-sogility">
                  {b.tag}
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
          src="/landing/board/board.webp"
          alt="SogilityGO Rebound IQ training board with smart light"
          className="mx-auto mt-2 w-[303px]"
          loading="lazy"
        />
        <BoardSlider />
      </div>
    </section>
  );
}

/* 10 — Personalized Training Sessions / 5 Core Skills (dark) */
const CORE_SKILLS = [
  {
    name: 'First Touch',
    video:
      'https://cdn.shopify.com/videos/c/vp/46f00d79b2e649419a91efa619a501c1/46f00d79b2e649419a91efa619a501c1.HD-1080p-2.5Mbps-84889328.mp4#t=0.1',
  },
  {
    name: 'Passing',
    video:
      'https://cdn.shopify.com/videos/c/vp/464dddbf1f4c47eb86f5abdf0272292f/464dddbf1f4c47eb86f5abdf0272292f.HD-1080p-2.5Mbps-84890162.mp4#t=0.1',
  },
  {
    name: 'Dribbling',
    video:
      'https://cdn.shopify.com/videos/c/vp/40b47e65064a413880a398fd44edfae1/40b47e65064a413880a398fd44edfae1.HD-1080p-2.5Mbps-84890372.mp4#t=0.1',
  },
  {
    name: 'Vision',
    video:
      'https://cdn.shopify.com/videos/c/vp/1846d9d5c7b1431fbfd625d4d70ac7bc/1846d9d5c7b1431fbfd625d4d70ac7bc.HD-1080p-2.5Mbps-84890561.mp4#t=0.1',
  },
  {
    name: 'Agility',
    video:
      'https://cdn.shopify.com/videos/c/vp/c4b85330de34456493e3506945cd5c7d/c4b85330de34456493e3506945cd5c7d.HD-1080p-2.5Mbps-84890716.mp4#t=0.1',
  },
];

export function CoreSkills() {
  return (
    <section className="bg-dark py-20 text-white">
      <Container>
        <p className="text-[14px] font-semibold uppercase tracking-[1.4px] text-sogility">
          5 core skills
        </p>
        <h2 className="title-italic mt-1 text-[42px] leading-[43px] tracking-[-0.42px] text-cream">
          Personalized Training Sessions
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
                  <p className="text-[14px] leading-[18px] text-blue-003">
                    <span className="font-bold text-cream">Improve</span> your
                    ball control
                  </p>
                  <p className="text-[14px] leading-[18px] text-blue-003">
                    <span className="font-bold text-cream">Receive</span> and
                    direct the ball smoothly
                  </p>
                  <p className="text-[14px] leading-[18px] text-blue-003">
                    <span className="font-bold text-cream">Train</span> your feet
                    to handle the ball cleanly
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* 11 — Start Training (pricing). Prices from Figma; BUY → Storefront API later. */
const PRICING_TIERS = [
  {
    name: 'Starter',
    img: '/landing/pricing/p1.webp',
    blurb: 'Best for complete development',
    price: '$349',
    was: null as string | null,
    save: null as string | null,
    popular: false,
    features: ['Rebound IQ board ×1', 'Impact Light ×1', 'SogilityGO App'],
  },
  {
    name: 'Advanced',
    img: '/landing/pricing/p2.webp',
    blurb: 'Best for serious development',
    price: '$649',
    was: '$698',
    save: 'Save $49',
    popular: true,
    features: ['Rebound IQ board ×2', 'Impact Light ×2', 'SogilityGO App'],
  },
  {
    name: 'Pro',
    img: '/landing/pricing/p3.webp',
    blurb: 'Best for complete development',
    price: '$949',
    was: '$1,047',
    save: 'Save $98',
    popular: false,
    features: ['Rebound IQ board ×3', 'Impact Light ×3', 'SogilityGO App'],
  },
];

export function StartTraining() {
  return (
    <section id="start-training" className="bg-dark py-16 text-white lg:py-20">
      <Container>
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
                    <p className="text-sogility">Rebound IQ</p>
                    <p className="text-dark">{t.name}</p>
                  </div>
                  <p className="text-[16px] leading-[22px] text-blue-005">
                    {t.blurb}
                  </p>
                  <div className="flex flex-col gap-2 pt-4">
                    <div className="flex items-center gap-3.5">
                      <span className="text-[30px] font-extrabold leading-[28px] tracking-[-0.3px] text-dark">
                        {t.price}
                      </span>
                      {t.was && (
                        <span className="text-[16px] font-medium text-dark line-through">
                          {t.was}
                        </span>
                      )}
                      {t.save && (
                        <span className="rounded-lg border-2 border-dashed border-sogility bg-white px-3 py-1 text-[16px] font-extrabold leading-none text-sogility">
                          {t.save}
                        </span>
                      )}
                    </div>
                    <p className="text-[14px] text-dark">
                      Pay with affirm on orders over $35
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pl-6 text-[14px] leading-[22px]">
                  {t.features.map((f, i) => (
                    <p key={i} className="text-blue-005">
                      <span className="text-sogility">&rarr;</span> {f}
                    </p>
                  ))}
                </div>

                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-2xl border border-sogility-deep bg-[linear-gradient(188deg,#30be2d_13%,#30892e_68%)] p-3 text-[16px] font-bold text-white shadow-[0px_4px_10px_rgba(0,0,0,0.25)] transition hover:brightness-105"
                >
                  Buy {t.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Policy row */}
        <div className="mx-auto mt-14 flex max-w-[944px] items-stretch">
          {[
            ['14', 'Day Return Policy'],
            ['1', 'Year Warranty'],
            ['365', 'Waterproof + Durable'],
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
    </section>
  );
}

/* 12 — Message from the owner (dark). Placeholder card → real owner video later. */
export function OwnerMessage() {
  return (
    <section className="flex justify-center bg-dark px-6 py-16 lg:py-24">
      <img
        src="/landing/owner/owner.webp"
        alt="Message from the owner — Jozy Altidore, former USMNT striker: My mission is simple — to inspire the next generation to dream bigger and work smarter."
        className="w-full max-w-[988px]"
        loading="lazy"
      />
    </section>
  );
}

/* 13 — FAQ */
export function Faq() {
  return (
    <section id="faq" className="bg-white py-16">
      <Container>
        <p className="text-[14px] font-semibold uppercase tracking-[1.4px] text-dark">
          Things you might ask
        </p>
        <h2 className="title-italic mt-1 text-[42px] leading-[43px] tracking-[-0.42px] text-sogility">
          FAQs
        </h2>

        <div className="mt-10 lg:px-16">
          <h3 className="mb-1 text-[14px] font-semibold uppercase tracking-[1.4px] text-[#22ae1f]">
            For Parents and Coaches:
          </h3>
          <FaqItem
            open
            q="What is the value of having multiple ReboundIQ boards?"
            a="While a single board is great for basic repetition, adding more boards exponentially increases the training complexity. Multiple boards allow for 360-degree training, forcing players to scan their shoulders, change direction quickly, and react to unpredictable cues—mimicking the chaos of a real match."
          />
          <FaqItem q="How does the system work?" />
          <FaqItem q="What skills can I improve?" />

          <h3 className="mb-1 mt-10 text-[14px] font-semibold uppercase tracking-[1.4px] text-[#22ae1f]">
            About the product:
          </h3>
          <FaqItem q="What is SogilityGO?" />
          <FaqItem q="How does the system work?" />
          <FaqItem q="What skills can I improve?" />
        </div>
      </Container>
    </section>
  );
}

function FaqItem({q, a, open}: {q: string; a?: string; open?: boolean}) {
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
        <p className="pb-6 pr-4 text-[16px] leading-[22px] tracking-[-0.16px] text-blue-005 lg:pr-20">
          {a}
        </p>
      ) : null}
    </details>
  );
}
