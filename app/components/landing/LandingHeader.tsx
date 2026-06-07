import {Suspense, useState} from 'react';
import {Await, Link, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

/**
 * Landing header: logo + minimal nav + cart, with the green promo strip below.
 * Reuses the cart Aside wiring from the scaffold so the drawer keeps working.
 */
export function LandingHeader({
  cart,
}: {
  cart: Promise<CartApiQueryFragment | null>;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Header — dark bar, logo centered, nav right (hamburger on mobile) */}
      <header className="sticky top-0 z-50 bg-dark shadow-[0px_4px_10px_rgba(0,0,0,0.25)]">
        <div className="mx-auto grid h-[64px] max-w-[1440px] grid-cols-3 items-center px-5 lg:h-[88px] lg:pl-[70px] lg:pr-6">
          {/* Left — hamburger (mobile only) */}
          <div className="flex items-center">
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="text-cream lg:hidden"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-cream"
            aria-label="SogilityGO home"
          >
            <span className="text-xl font-extrabold tracking-[0.2em]">
              SOGILITY
            </span>
            <span className="rounded-full bg-sogility px-2 py-0.5 text-sm font-extrabold text-white">
              GO
            </span>
          </Link>

          <nav className="flex items-center justify-end gap-10 text-[14px] font-normal uppercase tracking-[0.12em] text-cream">
            <a href="#start-training" className="hidden hover:text-sogility lg:block">
              Training
            </a>
            <a href="#faq" className="hidden hover:text-sogility lg:block">
              Contact
            </a>
            <CartToggle cart={cart} />
          </nav>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <nav className="flex flex-col gap-1 border-t border-white/10 bg-dark px-5 py-3 text-[14px] font-normal uppercase tracking-[0.12em] text-cream lg:hidden">
            <a
              href="#start-training"
              onClick={() => setMenuOpen(false)}
              className="py-2 hover:text-sogility"
            >
              Training
            </a>
            <a
              href="#faq"
              onClick={() => setMenuOpen(false)}
              className="py-2 hover:text-sogility"
            >
              Contact
            </a>
          </nav>
        )}
      </header>

      {/* Promo banner — below the header, dark text on green */}
      <div className="flex h-10 items-center justify-center gap-2 bg-sogility px-4 text-center text-dark">
        <span aria-hidden className="text-[17px]">
          ⚽
        </span>
        <p className="text-[13px] font-medium tracking-[0.02em] sm:text-[15px]">
          <span className="hidden sm:inline">World Cup Promo 20% Off &nbsp;+&nbsp; </span>
          Free US Shipping
        </p>
      </div>
    </>
  );
}

function CartToggle({cart}: {cart: Promise<CartApiQueryFragment | null>}) {
  return (
    <Suspense fallback={<CartButton count={0} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const original = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(original);
  return <CartButton count={cart?.totalQuantity ?? 0} />;
}

function CartButton({count}: {count: number}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();
  return (
    <button
      type="button"
      aria-label={`Open cart (${count} items)`}
      onClick={() => {
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
      className="relative flex items-center"
    >
      <svg
        aria-hidden
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-sogility px-1 text-[10px] font-bold">
          {count}
        </span>
      )}
    </button>
  );
}
