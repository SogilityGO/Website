import {Container} from './ui';
import type {PartnerData} from '~/data/partners';

/**
 * Partner-specific offer band — sits right before the pricing section.
 * The discount is auto-applied via the Buy buttons (no code to type), so this
 * section just communicates the member benefit and routes to pricing.
 */
export function PartnerOffer({partner}: {partner: PartnerData}) {
  return (
    <section className="bg-sogility">
      <Container className="flex flex-col items-center gap-4 py-12 text-center text-dark lg:py-14">
        <p className="text-[14px] font-extrabold uppercase tracking-[0.15em]">
          {partner.offerText}
        </p>
        <h2 className="title-italic text-[30px] leading-tight lg:text-[42px]">
          {partner.name} Member Benefit
        </h2>
        <p className="max-w-[640px] text-[16px] leading-[26px] text-dark/80">
          As part of our partnership with {partner.name}, your member discount is
          applied automatically when you check out through this page. No code to
          remember.
        </p>
        <a
          href="#start-training"
          className="mt-2 inline-flex items-center justify-center rounded-2xl bg-dark px-8 py-3.5 text-[16px] font-bold text-cream transition hover:brightness-110"
        >
          {partner.ctaText}
        </a>
      </Container>
    </section>
  );
}
