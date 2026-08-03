import type {PartnerData} from '~/data/partners';

/**
 * Partner-specific offer band. It carries the approved partner-page mockup's
 * floating benefit card into the shared dynamic route.
 */
export function PartnerOffer({partner}: {partner: PartnerData}) {
  return (
    <section className="relative z-10 bg-[#f7f6ef] pb-2">
      <div className="mx-auto grid min-h-[96px] w-[calc(100%-2rem)] max-w-[960px] -translate-y-4 overflow-hidden rounded-2xl border border-[#202333]/10 border-l-[5px] border-l-sogility bg-white shadow-[0_20px_50px_rgba(28,31,43,0.15)] lg:-translate-y-5 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="flex items-center gap-4 p-4 lg:px-6">
          {partner.logo ? (
            <img
              src={partner.logo}
              alt=""
              aria-hidden="true"
              className="h-[52px] w-10 shrink-0 object-contain lg:h-[55px] lg:w-[42px]"
            />
          ) : null}
          <div>
            <span className="block text-[10px] font-black uppercase tracking-[0.12em] text-[#247d25]">
              {partner.name} member exclusive
            </span>
            <strong className="mt-1 block text-[18px] font-black leading-tight tracking-[-0.025em] text-[#202333] lg:text-[21px]">
              {partner.offerText || 'Exclusive member pricing'}
            </strong>
            <small className="mt-1 block text-[11px] font-bold text-[#656977]">
              Automatically applied at checkout
            </small>
          </div>
        </div>
        <div className="flex items-center justify-center px-4 pb-4 lg:px-6 lg:pb-0 lg:pl-2">
          <a
            href="#start-training"
            className="inline-flex min-h-12 w-full min-w-[190px] items-center justify-center rounded-full bg-sogility px-5 text-[13px] font-black text-[#202333] transition hover:-translate-y-0.5 hover:brightness-105 lg:w-auto"
          >
            View member pricing
          </a>
        </div>
      </div>
    </section>
  );
}
