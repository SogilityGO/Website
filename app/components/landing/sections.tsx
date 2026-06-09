import {type ReactNode, useEffect, useRef, useState} from 'react';
import {Container, Eyebrow, SectionTitle, Placeholder} from './ui';
import {AffirmLoader, AffirmMessage} from './affirm';
import {trackBeginCheckout} from './analytics';

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
          fetchpriority="high"
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
              <TrainingBullet title="Making the starting lineup" defaultOpen>
                <p className="text-[16px] leading-[22px] text-grey">
                  Coaches pick players who look sharper, who control the ball
                  under pressure, whose first touch doesn&rsquo;t cost
                  possession. That sharpness comes from repetition.
                </p>
                <p className="mt-2 text-[14px] font-semibold text-sogility">
                  Visible improvement within 6-10 weeks
                </p>
              </TrainingBullet>
              <TrainingBullet title="Moving up a division">
                <p className="text-[16px] leading-[22px] text-grey">
                  The jump between levels is almost always a question of
                  technical quality under pressure.
                </p>
              </TrainingBullet>
              <TrainingBullet title="Leveling up their talent">
                <p className="text-[16px] leading-[22px] text-grey">
                  Success comes from more deliberate practice than the
                  competition.
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
    week: 'WEEK 1',
    title: 'Test your skills',
    stat: '5 core skills',
    desc: 'What to expect week by week when a player commits to daily practice.',
  },
  {
    img: '/landing/journey/j2.webp',
    badge: '/landing/journey/badge-trophy.svg',
    week: 'WEEK 4',
    title: 'Form habits',
    stat: '+20%',
    desc: 'Average accuracy gain',
  },
  {
    img: '/landing/journey/j3.webp',
    badge: '/landing/journey/clipboard.svg',
    week: 'WEEK 8',
    title: 'Get noticed',
    stat: '600+',
    desc: 'Touches up per session. First touch visibly sharper at practice.',
  },
  {
    img: '/landing/journey/j4.webp',
    badge: '/landing/journey/clipboard.svg',
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
          Player journey
        </p>
        <h2 className="title-italic mt-1 text-[42px] leading-[43px] tracking-[-0.42px] text-sogility">
          Training that delivers results
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
    desc: 'Up to 5 players can access their own personalized training plan',
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
    title: 'Delivers game-speed passes',
    desc: 'Engineered with high-density materials designed to return the ball right back to you with the same velocity/force.',
  },
  {
    title: 'Replicates real match scenarios',
    desc: 'By adding a cognitive, unpredictable element with the smart lights, players get a more dynamic and versatile training experience.',
  },
  {
    title: 'Durable, portable & easy assembly',
    desc: 'Built to withstand high-impact shots and weather, with ease moving from your backyard to inside your home.',
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

/* 10 — Personalized Training Sessions / 5 Core Skills (dark).
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
      'Enhance your decision making abilities',
    ],
  },
  {
    name: 'Dribbling',
    video:
      'https://cdn.shopify.com/videos/c/vp/40b47e65064a413880a398fd44edfae1/40b47e65064a413880a398fd44edfae1.HD-1080p-2.5Mbps-84890372.mp4#t=0.1',
    lines: [
      'Boost your ball mastery',
      'Navigate throughout tight spaces',
      'Build confidence with the ball',
    ],
  },
  {
    name: 'Vision',
    video:
      'https://cdn.shopify.com/videos/c/vp/1846d9d5c7b1431fbfd625d4d70ac7bc/1846d9d5c7b1431fbfd625d4d70ac7bc.HD-1080p-2.5Mbps-84890561.mp4#t=0.1',
    lines: [
      'Master your spatial awareness',
      'Spot your teammates quicker',
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
          Personalized Training Sessions
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
    blurb: 'Perfect for mastering the basics and getting thousands of quality reps.',
    price: '$349',
    priceCents: 34900,
    was: null as string | null,
    save: null as string | null,
    popular: false,
    features: ['Rebound IQ board ×1', 'Impact Light ×1', 'SogilityGO App'],
  },
  {
    name: 'Advanced',
    handle: 'sogilitygo-reboundiq-elite',
    img: '/landing/pricing/p2.webp',
    blurb: 'Take training up a notch with multi-angle passing, decision making and scanning.',
    price: '$649',
    priceCents: 64900,
    was: '$698',
    save: 'Save $49',
    popular: true,
    features: ['Rebound IQ board ×2', 'Impact Light ×2', 'SogilityGO App'],
  },
  {
    name: 'Pro',
    handle: 'sogilitygo-reboundiq-ultimate',
    img: '/landing/pricing/p3.webp',
    blurb: 'The ultimate 360-degree training experience for elite skill development.',
    price: '$949',
    priceCents: 94900,
    was: '$1,047',
    save: 'Save $98',
    popular: false,
    features: ['Rebound IQ board ×3', 'Impact Light ×3', 'SogilityGO App'],
  },
];

/** Live checkout data per tier, resolved in the route loader from the Storefront API. */
export type TierCheckout = {variantId: string; available: boolean};
export type CheckoutMap = Record<string, TierCheckout | undefined>;

type PricingTier = (typeof PRICING_TIERS)[number];

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
}: {
  tier: PricingTier;
  checkout?: CheckoutMap;
  className: string;
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
    ? `/cart/${c.variantId}:1`
    : `https://www.sogilitygo.com/products/${tier.handle}`;
  const external = !c;

  return (
    <a
      href={href}
      {...(external ? {target: '_blank', rel: 'noreferrer'} : {})}
      onClick={() =>
        trackBeginCheckout({
          tierName: tier.name,
          valueUSD: tier.priceCents / 100,
          variantId: c?.variantId,
        })
      }
      className={`${className} ${gradient}`}
    >
      Buy {tier.name}
    </a>
  );
}

export function StartTraining({checkout}: {checkout?: CheckoutMap}) {
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
                  </div>
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
                  className="flex w-full items-center justify-center rounded-2xl p-3 text-[16px] font-bold"
                />
                <AffirmMessage
                  amountCents={t.priceCents}
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

      {/* mobile: horizontal slider of pricing cards */}
      <StartTrainingSlider checkout={checkout} />
    </section>
  );
}

/** Mobile Start Training slider — one pricing card per view, shared policy row + dots. */
function StartTrainingSlider({checkout}: {checkout?: CheckoutMap}) {
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
                  </div>
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
                  className="flex h-14 w-full items-center justify-center rounded-2xl p-3 text-[18px] font-semibold"
                />
                <AffirmMessage
                  amountCents={t.priceCents}
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
          ['365', 'Days outside Weatherproof'],
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
    title: 'Place the board',
    desc: 'Any flat surface – backyard, basement, driveway. No tools, no assembly. Takes minutes.',
  },
  {
    img: '/landing/setup/phone-light.webp',
    rounded: false,
    step: 'Step 2',
    title: 'Pair the APP',
    desc: 'Download the SogilityGO app, pair Impact Light via bluetooth. Account setup under 3 minutes. Ready every session after that.',
  },
  {
    img: '/landing/setup/phone-explore.webp',
    rounded: false,
    step: 'Step 3',
    title: 'Virtual Coach runs the session',
    desc: 'Player assessment first, then a personalized 10-day plan. Real-time audio cues. 180+ activities. Average first session starts within 5 mins of unboxing.',
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
          Ready in under 5 minutes
        </h2>
        <p className="mt-2 max-w-[608px] text-[16px] leading-[22px] text-blue-003">
          Player doesn&rsquo;t need you there. Set it up once and they run their
          own sessions.
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
          Message from the owner
        </p>
        <h2 className="title-italic mt-1 text-[42px] leading-[43px] tracking-[-0.42px] text-sogility">
          What separates good players from elite
        </h2>

        <div className="mt-8 flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-10">
          <img
            src="/landing/owner/jozy.webp"
            alt="Jozy Altidore, SogilityGO co-founder and former USMNT striker"
            className="aspect-square w-full max-w-[345px] shrink-0 rounded-2xl object-cover object-top lg:aspect-[453/433] lg:w-[453px] lg:max-w-none"
            loading="lazy"
          />

          <div className="flex flex-col lg:max-w-[790px]">
            <p className="text-center text-[18px] leading-[27px] tracking-[-0.18px] text-surface lg:text-left lg:text-[19px] lg:leading-[28px]">
              {`"I built SogilityGO because I know exactly what separates good players from elite ones: the invisible hours spent training away from the team. We created this so your child isn't just getting more touches in the backyard—they are getting the right touches, guided by pro-level technology, to build the unshakeable confidence they need on game day."`}
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
                Former USMNT Striker &amp; Co-founder, SogilityGO
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
              a="Absolutely. The system is intuitive enough for young beginners, yet the reaction speeds and data tracking are challenging enough to push professional athletes to their limits. The app customizes the difficulty based on your child's initial assessment and adapts as they improve."
            />
            <FaqItem
              q="I have more than one child playing soccer. Can they share the system?"
              a="Yes! You can set up 5 player profiles within the SogilityGO app. Each child will have their own customized training plan and individualized data tracking, so they can both progress at their own pace using the same ReboundIQ boards."
            />
            <FaqItem
              q="As a parent, how can I track their progress?"
              a="The SogilityGO app features a comprehensive data dashboard. Instead of guessing if they are getting better, you can review their training history, track their progress, and watch them improve week over week."
            />
            <FaqItem
              q={'Is this going to just be more "screen time" for my kid?'}
              a="This is active screen time. While the app runs on a phone, your child's eyes and body are engaged with the physical world, moving, reacting, and sweating. It turns screen motivation into physical development."
            />
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="mb-1 mt-8 text-[14px] font-semibold uppercase tracking-[1.4px] text-[#22ae1f] lg:mt-10">
              About the product:
            </h3>
            <FaqItem
              q="Can we really use it indoors?"
              a="Yes! As long as you have a flat surface and enough space to safely kick a ball, SogilityGO is perfect for garages, basements, or home gyms."
            />
            <FaqItem
              q="Will the boards break if my older kid kicks too hard?"
              a="No. ReboundIQ boards are constructed from high-density, impact-resistant materials designed for professional use. They provide a true bounce every time, no matter how hard the pass."
            />
            <FaqItem
              q="How long does it take to set up?"
              a="Your first set up takes less than 5 minutes. Afterwards, your child can set up in under a minute. Simply place the ReboundIQ boards, connect them to the SogilityGO app via Bluetooth on your phone, and your child is ready to train. No complicated wiring or permanent installation is required."
            />
            <FaqItem
              q="Does my child need a specific type of soccer ball?"
              a="Not at all. Your player can use their standard size 3, 4, or 5 soccer balls. Just bring their regular game ball, your device to run the app, and the boards."
            />
            <FaqItem
              q="Do the boards need to be plugged in during use?"
              a="No, the boards are completely wireless. They feature a long-lasting rechargeable battery, giving you the freedom to set them up anywhere—from the driveway to the backyard to the living room—without tripping over cords."
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
