import {Link, useMatches, useRouteLoaderData} from 'react-router';

type PartnerBanner = {bannerMode?: 'hide' | 'replace'; bannerText?: string};
type SiteBanner = {enabled: boolean; text: string} | null;

/** Shown only until the Sogility team creates the `site_banner` metaobject. */
const DEFAULT_BANNER_TEXT = 'Get 20% Off + Free Shipping (US). Use Code: WC26 🏆';

/**
 * Landing header: centered logo + green promo strip below.
 * No nav items, so no mobile hamburger is needed.
 *
 * Banner source:
 * - Partner pages (/partners/<handle>): hidden or replaced with the partner's own
 *   banner (keeps partner attribution clean).
 * - Everywhere else: the admin-editable `site_banner` metaobject (root loader) —
 *   the team toggles it on/off and edits the text in Shopify admin, no deploy.
 * - If that metaobject doesn't exist yet: the built-in default below.
 */
export function LandingHeader() {
  const matches = useMatches();
  const partner = matches
    .map((m) => (m.data as {partner?: PartnerBanner} | undefined)?.partner)
    .find(Boolean);

  const rootData = useRouteLoaderData('root') as
    | {siteBanner?: SiteBanner}
    | undefined;
  const siteBanner = rootData?.siteBanner;

  let bannerText: string | null;
  if (partner) {
    // Partner page: only the "replace" mode shows a banner; "hide" shows none.
    bannerText = partner.bannerMode === 'replace' ? partner.bannerText ?? null : null;
  } else if (siteBanner) {
    // Admin-controlled: toggle off → no banner; on → the edited text.
    bannerText = siteBanner.enabled ? siteBanner.text || null : null;
  } else {
    bannerText = DEFAULT_BANNER_TEXT;
  }

  const banner = bannerText ? (
    <div className="flex min-h-10 items-center justify-center bg-sogility px-4 py-1.5 text-center text-dark">
      <p className="text-[13px] font-extrabold uppercase tracking-[0.02em] [text-wrap:balance] sm:text-[17px]">
        {bannerText}
      </p>
    </div>
  ) : null;

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
