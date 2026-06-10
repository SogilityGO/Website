import {Link} from 'react-router';

/**
 * Landing header: centered logo + green promo strip below.
 * No nav items, so no mobile hamburger is needed.
 */
export function LandingHeader() {
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

      {/* Promo banner — below the header, dark text on green */}
      <div className="flex min-h-10 items-center justify-center gap-2 bg-sogility px-4 py-1.5 text-center text-dark">
        <p className="text-[14px] font-extrabold uppercase tracking-[0.03em] sm:text-[17px]">
          Get 20% Off + Free Shipping (US). Use Code: WC26
        </p>
        <span aria-hidden className="text-[18px] sm:text-[20px]">
          🏆
        </span>
      </div>
    </>
  );
}
