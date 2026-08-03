import type {PartnerData} from '~/data/partners';

const DEFAULT_HERO_POSTER = '/landing/hero-1920.webp';
const HERO_VIDEO =
  'https://cdn.shopify.com/videos/c/o/v/3eeae311b2184d3fa3a217001dfaba52.mp4';

const SYSTEM_PILLS = [
  'ReboundIQ',
  'Impact Light',
  'SogilityGO App',
  'Progress Tracking',
];

/** Partner logo and SogilityGO co-branding. */
function CoBrand({partner}: {partner: PartnerData}) {
  return (
    <div className="flex min-h-11 items-center gap-3 lg:min-h-14 lg:gap-4">
      {partner.logo && (
        <>
          <img
            src={partner.logo}
            alt={partner.logoAlt}
            className="max-h-11 max-w-[136px] object-contain lg:max-h-14 lg:max-w-[168px]"
            fetchPriority="high"
          />
          <span className="text-lg font-light text-white/40">×</span>
        </>
      )}
      <span className="flex items-center gap-1.5">
        <span className="text-sm font-extrabold tracking-[0.2em] text-cream lg:text-base">
          SOGILITY
        </span>
        <span className="rounded-full bg-sogility px-2 py-0.5 text-[11px] font-extrabold text-white lg:text-xs">
          GO
        </span>
      </span>
    </div>
  );
}

function HeroActions({partner}: {partner: PartnerData}) {
  return (
    <div className="mt-6 grid grid-cols-[1.12fr_0.88fr] gap-3 sm:flex sm:flex-wrap">
      <a
        href="#start-training"
        className="inline-flex min-h-12 items-center justify-center rounded-full bg-sogility px-3 text-center text-[12px] font-black leading-[1.15] text-dark shadow-[0_12px_28px_rgba(48,190,45,0.25)] transition hover:-translate-y-0.5 hover:brightness-105 sm:min-h-[52px] sm:px-6 sm:text-[15px]"
      >
        {partner.ctaText}
      </a>
      <a
        href="#how-it-works"
        className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/40 bg-white/5 px-3 text-center text-[12px] font-black leading-[1.15] text-white transition hover:-translate-y-0.5 hover:border-sogility/70 hover:bg-sogility/10 sm:min-h-[52px] sm:px-6 sm:text-[15px]"
      >
        See How It Works
      </a>
    </div>
  );
}

function HeroMedia({partner}: {partner: PartnerData}) {
  return (
    <div className="relative min-h-[300px] lg:min-h-[410px]">
      <div className="absolute inset-0 overflow-hidden rounded-[24px] border border-white/20 bg-[#171a25] shadow-[0_35px_80px_rgba(0,0,0,0.35)] lg:rounded-[28px]">
        {partner.heroImage ? (
          <img
            src={partner.heroImage}
            alt={`Player training at home with ${partner.name} and SogilityGO`}
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        ) : (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={DEFAULT_HERO_POSTER}
            aria-label="SogilityGO training in action"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[#10121c]/85" />
        <div className="absolute inset-x-[18px] bottom-[18px] z-10 lg:inset-x-6 lg:bottom-[22px]">
          <strong className="text-[16px] font-extrabold text-white lg:text-[18px]">
            See SogilityGO in action
          </strong>
        </div>
      </div>
    </div>
  );
}

/**
 * Shared partner hero. It uses the paid-ads landing page's split conversion
 * layout while keeping all partner identity, copy, and offer fields dynamic.
 */
export function PartnerHero({partner}: {partner: PartnerData}) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_14%_8%,rgba(48,190,45,0.18),transparent_32%),linear-gradient(135deg,#1c2030_0%,#252a3c_60%,#181b28_100%)] text-white">
      <div className="pointer-events-none absolute -bottom-[260px] -right-[260px] h-[520px] w-[520px] rounded-full border-[90px] border-sogility/10" />

      <div className="relative mx-auto grid w-[calc(100%-2rem)] max-w-[1180px] grid-cols-1 gap-11 pb-[52px] pt-9 lg:min-h-[540px] lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)] lg:items-center lg:gap-14 lg:py-12">
        <div className="min-w-0">
          <CoBrand partner={partner} />
          <p className="mt-5 text-[12px] font-black uppercase leading-[1.3] tracking-[0.11em] text-sogility lg:mt-6">
            {partner.eyebrow}
          </p>
          <h1 className="mt-3 max-w-[620px] text-[40px] font-black leading-[0.97] tracking-[-0.055em] text-white lg:text-[52px] lg:leading-[0.98]">
            {partner.headline}
          </h1>
          <div className="mt-[18px] flex max-w-[560px] flex-col gap-3 text-[15px] leading-[1.52] text-white/80 lg:mt-5 lg:text-[17px]">
            {partner.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <HeroActions partner={partner} />
          <div
            className="mt-6 hidden flex-wrap gap-2.5 lg:flex"
            aria-label="SogilityGO components"
          >
            {SYSTEM_PILLS.map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-2 text-[12px] font-extrabold text-white/75"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <HeroMedia partner={partner} />
      </div>
    </section>
  );
}
