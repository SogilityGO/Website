import {type ReactNode} from 'react';

/**
 * Shared building blocks for the Sogility GO parents landing.
 * Container mirrors the Figma 1440px frame with an 85px content inset.
 */

export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1440px] px-6 lg:px-[85px] ${className}`}>
      {children}
    </div>
  );
}

/** Uppercase wide-tracking label. Green by default; override via `color`. */
export function Eyebrow({
  children,
  className = '',
  color = 'text-sogility',
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return <p className={`eyebrow ${color} ${className}`}>{children}</p>;
}

/**
 * ExtraBold Italic display title. Green on light sections, white on dark ones.
 */
export function SectionTitle({
  children,
  className = '',
  light = false,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <h2
      className={`title-italic text-4xl ${light ? 'text-white' : 'text-sogility'} ${className}`}
    >
      {children}
    </h2>
  );
}

/**
 * Placeholder block for media we still need to pull from Figma (images, video,
 * phone mockups, logos). Replaced with real assets during the polish pass.
 */
export function Placeholder({
  label,
  className = '',
  dark = false,
}: {
  label: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-3xl border border-dashed px-4 text-center text-xs font-semibold ${
        dark
          ? 'border-white/20 bg-white/5 text-white/45'
          : 'border-black/15 bg-black/[0.04] text-black/35'
      } ${className}`}
    >
      {label}
    </div>
  );
}
