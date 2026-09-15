/** Shared storefront metadata. Campaign pricing and robots policies stay route-specific. */
export const MAIN_SITE = 'https://www.sogilitygo.com';

export const articleDescriptions: Record<string, string> = {
  'how-to-improve-your-weak-foot-in-soccer': 'Build confidence with your weaker foot through controlled first touches, passing, changing angles, and a simple 15-minute soccer practice routine.',
  'how-to-measure-soccer-progress-beyond-goals-and-assists': 'Track soccer progress with a baseline, consistent practice, and retesting. Look at control, accuracy, decisions, and habits alongside goals and assists.',
  'a-parent-s-guide-to-at-home-soccer-training': 'Support at-home soccer practice with space, a shared routine, useful questions, and encouragement while helping your player take ownership.',
};

export function descriptionText(value: string | null | undefined, fallback: string) {
  const text = (value || fallback).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (text.length <= 160) return text;
  return `${text.slice(0, 157).replace(/\s+\S*$/, '')}…`;
}

export function pageMeta(title: string, description: string, canonical: string) {
  const brandedTitle = title.includes('SogilityGO') ? title : `${title} | SogilityGO`;
  return [
    {title: brandedTitle},
    {name: 'description', content: description},
    {tagName: 'link' as const, rel: 'canonical', href: canonical},
    {property: 'og:title', content: brandedTitle},
    {property: 'og:description', content: description},
    {property: 'og:url', content: canonical},
    {property: 'og:site_name', content: 'SogilityGO'},
    {name: 'twitter:card', content: 'summary'},
  ];
}
