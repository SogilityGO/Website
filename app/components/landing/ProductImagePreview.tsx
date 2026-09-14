import {useRef} from 'react';

/** Product photos have an explicit, keyboard-accessible enlarge action. */
export function ProductImagePreview({src, name}: {src: string; name: string}) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        aria-label={`Enlarge ReboundIQ ${name} setup photo`}
        className="relative block h-[160px] w-full cursor-zoom-in overflow-hidden border-b border-[#dfe0d9] bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-sogility lg:h-[225px]"
      >
        <img
          src={src}
          alt={`ReboundIQ ${name} setup`}
          className="h-full w-full object-contain"
          loading="lazy"
        />
        <span className="absolute bottom-2 right-2 rounded-full bg-[#202333] px-3 py-2 text-xs font-bold text-white">
          Enlarge photo
        </span>
      </button>
      <dialog
        ref={dialog}
        aria-label={`ReboundIQ ${name} setup photo`}
        className="m-auto max-h-[90dvh] w-[min(92vw,800px)] rounded-2xl bg-white p-4 text-[#202333] backdrop:bg-black/70"
      >
        <form
          method="dialog"
          className="mb-3 flex items-center justify-between gap-4"
        >
          <strong>ReboundIQ {name}</strong>
          <button
            type="submit"
            className="min-h-11 rounded-full bg-[#202333] px-5 font-bold text-white"
          >
            Close photo
          </button>
        </form>
        <img
          src={src}
          alt={`ReboundIQ ${name} setup enlarged`}
          className="max-h-[70dvh] w-full object-contain"
          loading="lazy"
        />
      </dialog>
    </>
  );
}
