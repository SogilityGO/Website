import {Link, useMatches} from 'react-router';

type PartnerBanner = {bannerMode?: 'hide' | 'replace'; bannerText?: string};

/**
 * Landing header: centered logo + green promo strip below.
 * No nav items, so no mobile hamburger is needed.
 *
 * On partner pages (/partners/<handle>) the sitewide WC26 promo is hidden or
 * replaced with the partner's own banner, so members aren't pushed toward a
 * competing offer — this keeps partner attribution clean.
 */
export function LandingHeader() {
  const matches = useMatches();
  const partner = matches
    .map((m) => (m.data as {partner?: PartnerBanner} | undefined)?.partner)
    .find(Boolean);

  let banner = null;
  if (!partner) {
    // Default sitewide promo banner.
    banner = (
      <div className="flex min-h-10 items-center justify-center bg-sogility px-4 py-1.5 text-center text-dark">
        <p className="text-[13px] font-extrabold uppercase tracking-[0.02em] sm:text-[17px]">
          Get 20% Off + Free Shipping (US).{' '}
          <span className="whitespace-nowrap">Use Code: WC26&nbsp;🏆</span>
        </p>
      </div>
    );
  } else if (partner.bannerMode === 'replace' && partner.bannerText) {
    // Partner-specific banner.
    banner = (
      <div className="flex min-h-10 items-center justify-center bg-sogility px-4 py-1.5 text-center text-dark">
        <p className="text-[13px] font-extrabold uppercase tracking-[0.02em] sm:text-[17px]">
          {partner.bannerText}
        </p>
      </div>
    );
  }
  // else bannerMode === 'hide' → render no banner.

  return (
    <>
      {/* Header — dark bar, logo centered */}
      <header className="sticky top-0 z-50 bg-dark shadow-[0px_4px_10px_rgba(0,0,0,0.25)]">
        <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-center px-5 lg:h-[88px]">
          <Link
            to="/"
            className="flex items-center gap-2 text-cream"
            aria-label="SogilityGO home"
          >
            <span className="text-xl font-extrabold tracking-[0.2em]">
              SOGILITY
            </span>
            <span className="rounded-full bg-sogility px-2 py-0.5 text-sm font-extrabold text-white">
              GO
            </span>
          </Link>
        </div>
      </header>

      {banner}
    </>
  );
}
