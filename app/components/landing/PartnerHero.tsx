import {Container} from './ui';
import type {PartnerData} from '~/data/partners';

/** Default SogilityGO hero photo — kept so partner pages keep the brand visual. */
const DEFAULT_HERO_SRCSET =
  '/landing/hero-960.webp 960w, /landing/hero-1280.webp 1280w, /landing/hero-1920.webp 1920w';
const DEFAULT_HERO_FALLBACK = '/landing/hero-1920.jpg';
const HERO_ALT = 'Young player training at home with SogilityGO';

/** Partner logo × SogilityGO co-branding. */
function CoBrand({partner, logoClass}: {partner: PartnerData; logoClass: string}) {
  return (
    <div className="flex items-center gap-4">
      {/* Partner logo is optional: with no logo, show SogilityGO alone (no default
          logo, no "×" separator) — per client request 19 Jul 2026. */}
      {partner.logo && (
        <>
          <img
            src={partner.logo}
            alt={partner.logoAlt}
            className={logoClass}
            fetchPriority="high"
          />
          <span className="text-xl font-light text-white/45">×</span>
        </>
      )}
      <span className="flex items-center gap-1.5">
        <span className="text-base font-extrabold tracking-[0.18em] text-cream lg:text-lg">
          SOGILITY
        </span>
        <span className="rounded-full bg-sogility px-2 py-0.5 text-xs font-extrabold text-white lg:text-sm">
          GO
        </span>
      </span>
    </div>
  );
}

function OfferCta({partner}: {partner: PartnerData}) {
  return (
    <a
      href="#start-training"
      className="inline-flex items-center justify-center rounded-2xl border border-sogility-deep bg-[linear-gradient(188deg,#30be2d_13%,#30892e_68%)] px-8 py-3.5 text-[16px] font-bold text-white shadow-[0px_4px_10px_rgba(0,0,0,0.25)] transition hover:brightness-105"
    >
      {partner.ctaText}
    </a>
  );
}

function HeroImage({partner, className}: {partner: PartnerData; className: string}) {
  return (
    <picture>
      {!partner.heroImage && (
        <source type="image/webp" srcSet={DEFAULT_HERO_SRCSET} sizes="100vw" />
      )}
      <img
        src={partner.heroImage ?? DEFAULT_HERO_FALLBACK}
        alt={HERO_ALT}
        className={className}
        fetchPriority="high"
      />
    </picture>
  );
}

/**
 * Partner hero — replaces the default Hero on /partners/<handle>.
 *
 * Mobile: a clean photo band (player visible) with the co-branding on top, then
 * the partner copy on solid dark below — so the copy stays crisp and the player
 * is never buried.
 * Desktop: the SogilityGO photo as a full-bleed background with the co-branding
 * and copy overlaid on the left; the player sits clear to the right.
 */
export function PartnerHero({partner}: {partner: PartnerData}) {
  return (
    <section className="relative overflow-hidden bg-dark text-white">
      {/* ---------- MOBILE ---------- */}
      <div className="lg:hidden">
        <div className="relative h-[400px] overflow-hidden">
          <HeroImage
            partner={partner}
            className="absolute inset-0 h-full w-full object-cover [object-position:48%_22%]"
          />
          {/* dark only at the very top (logo contrast) + a soft blend into the
              dark copy block below; the middle stays clear so the player shows */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark/75 via-transparent to-dark/45" />
          <div className="absolute inset-x-0 top-0 px-6 pt-6">
            <CoBrand partner={partner} logoClass="h-14 w-auto" />
          </div>
        </div>

        <div className="px-6 pb-12 pt-6">
          <p className="eyebrow text-[16px] tracking-[0.18em] text-sogility">
            {partner.eyebrow}
          </p>
          <h1 className="title-italic mt-2 text-[32px] leading-[1.06]">
            {partner.headline}
          </h1>
          <div className="mt-4 flex flex-col gap-3 text-[16px] leading-[25px] text-cream/85">
            {partner.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-6">
            <OfferCta partner={partner} />
          </div>
        </div>
      </div>

      {/* ---------- DESKTOP ---------- */}
      <div className="relative hidden overflow-hidden lg:flex lg:min-h-[860px] lg:items-center">
        <HeroImage
          partner={partner}
          className="absolute inset-y-0 left-0 h-full w-[118%] max-w-none object-cover [object-position:50%_45%]"
        />
        {/* left-weighted, fades to transparent on the right so the player shows */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/85 via-dark/40 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_left,rgba(48,190,45,0.16),transparent_55%)]" />

        <Container className="relative py-24">
          <div className="max-w-[600px]">
            <CoBrand partner={partner} logoClass="h-20 w-auto" />
            <p className="eyebrow mt-7 max-w-[500px] text-[22px] text-sogility">
              {partner.eyebrow}
            </p>
            <h1 className="title-italic mt-3 text-[52px] leading-[1.05]">
              {partner.headline}
            </h1>
            <div className="mt-5 flex flex-col gap-3 text-[18px] leading-[28px] text-cream/90">
              {partner.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-7">
              <OfferCta partner={partner} />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
