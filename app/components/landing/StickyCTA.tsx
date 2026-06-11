import {useEffect, useState} from 'react';

const TARGET_ID = 'start-training';

/**
 * Sticky mobile-only CTA → scrolls to the products section (#start-training).
 * Hidden only while that section is on screen, so it never covers the tier cards /
 * purchase flow — it reappears both above and below the products section. Desktop
 * already has its own hero CTA, so this is `lg:hidden`.
 *
 * Design: Figma node 322:6490 — green gradient, sogility-deep border, 16px radius.
 */
export function StickyMobileCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById(TARGET_ID);
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        // Hide only while the products section is on screen — reappear above and below it.
        setHidden(entry.isIntersecting);
      },
      {threshold: 0, rootMargin: '0px 0px -15% 0px'},
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(TARGET_ID);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-2 transition-all duration-300 lg:hidden ${
        hidden
          ? 'pointer-events-none translate-y-4 opacity-0'
          : 'translate-y-0 opacity-100'
      }`}
    >
      <a
        href={`#${TARGET_ID}`}
        onClick={onClick}
        tabIndex={hidden ? -1 : undefined}
        className="flex h-14 w-full max-w-[420px] items-center justify-center rounded-2xl border border-sogility-deep text-[18px] font-semibold tracking-[-0.18px] text-white shadow-[0px_4px_10px_rgba(0,0,0,0.25)] transition active:brightness-95"
        style={{
          backgroundImage:
            'linear-gradient(189.6deg, rgb(48,190,45) 12.6%, rgb(48,137,46) 67.9%)',
        }}
      >
        Get SogilityGO
      </a>
    </div>
  );
}
