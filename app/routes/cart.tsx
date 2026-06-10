import {useLoaderData, data, Link, type HeadersFunction} from 'react-router';
import type {Route} from './+types/cart';
import type {CartQueryDataReturn} from '@shopify/hydrogen';
import {CartForm, Image, Money, useOptimisticCart} from '@shopify/hydrogen';
import type {CartLine} from '~/components/CartLineItem';

export const meta: Route.MetaFunction = () => {
  return [{title: `SogilityGO | Cart`}];
};

export const headers: HeadersFunction = ({actionHeaders}) => actionHeaders;

export async function action({request, context}: Route.ActionArgs) {
  const {cart} = context;

  const formData = await request.formData();

  const {action, inputs} = CartForm.getFormInput(formData);

  if (!action) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result: CartQueryDataReturn;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;

      // User inputted discount code
      const discountCodes = (
        formDiscountCode ? [formDiscountCode] : []
      ) as string[];

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes);

      result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesAdd: {
      const formGiftCardCode = inputs.giftCardCode;

      const giftCardCodes = (
        formGiftCardCode ? [formGiftCardCode] : []
      ) as string[];

      result = await cart.addGiftCardCodes(giftCardCodes);
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesRemove: {
      const appliedGiftCardIds = inputs.giftCardCodes as string[];
      result = await cart.removeGiftCardCodes(appliedGiftCardIds);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate: {
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
      });
      break;
    }
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
  const {cart: cartResult, errors, warnings} = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  return data(
    {
      cart: cartResult,
      errors,
      warnings,
      analytics: {
        cartId,
      },
    },
    {status, headers},
  );
}

export async function loader({context}: Route.LoaderArgs) {
  const {cart} = context;
  return await cart.get();
}

export default function Cart() {
  const originalCart = useLoaderData<typeof loader>();
  // Optimistic so qty/remove feel instant.
  const cart = useOptimisticCart(originalCart);
  const lines = (cart?.lines?.nodes ?? []) as CartLine[];
  const hasItems = (cart?.totalQuantity ?? 0) > 0;

  return (
    <div className="min-h-[60vh] bg-dark text-cream">
      <div className="mx-auto max-w-[1440px] px-5 py-12 lg:px-[70px] lg:py-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-[32px] font-semibold tracking-[-0.5px] lg:text-[40px]">
            Your cart
          </h1>
          <Link
            to="/"
            prefetch="intent"
            className="text-[15px] underline underline-offset-4 transition hover:text-sogility"
          >
            Continue shopping
          </Link>
        </div>

        {!hasItems ? (
          <div className="py-16 text-center">
            <p className="text-[18px] text-cream/70">Your cart is empty.</p>
            <Link
              to="/"
              prefetch="intent"
              className="mt-5 inline-block rounded-md bg-sogility px-7 py-3 text-[14px] font-bold uppercase tracking-[0.08em] text-white transition hover:brightness-110"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Column headers (desktop) */}
            <div className="mt-10 hidden grid-cols-[1fr_180px_120px] items-center gap-8 border-b border-white/10 pb-3 text-[12px] uppercase tracking-[0.12em] text-cream/50 lg:grid">
              <span>Product</span>
              <span className="justify-self-center">Quantity</span>
              <span className="justify-self-end">Total</span>
            </div>

            <ul>
              {lines.map((line) => (
                <CartRow key={line.id} line={line} />
              ))}
            </ul>

            {/* Summary */}
            <div className="mt-10 flex flex-col items-end gap-3">
              <div className="flex items-baseline gap-4">
                <span className="text-[18px] text-cream/80">Estimated total</span>
                {cart.cost?.subtotalAmount ? (
                  <span className="text-[22px] font-semibold">
                    <Money data={cart.cost.subtotalAmount} />
                  </span>
                ) : null}
              </div>
              <p className="max-w-[320px] text-right text-[13px] leading-[18px] text-cream/50">
                Taxes, discounts and shipping calculated at checkout.
              </p>
              {cart.checkoutUrl ? (
                <a
                  href={cart.checkoutUrl}
                  className="mt-2 flex w-full max-w-[420px] items-center justify-center rounded-md bg-sogility px-8 py-4 text-[15px] font-bold uppercase tracking-[0.08em] text-white transition hover:brightness-110"
                >
                  Checkout
                </a>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CartRow({line}: {line: CartLine}) {
  const {id, quantity, cost, merchandise} = line;
  const {product, title, image} = merchandise;
  const name = product?.title ?? title;

  return (
    <li className="grid gap-4 border-b border-white/10 py-6 lg:grid-cols-[1fr_180px_120px] lg:items-center lg:gap-8">
      {/* Product */}
      <div className="flex items-center gap-4">
        {image ? (
          <Image
            data={image}
            alt={image.altText ?? name}
            aspectRatio="1/1"
            width={96}
            height={96}
            loading="lazy"
            className="h-20 w-20 shrink-0 rounded-md bg-white/5 object-contain lg:h-24 lg:w-24"
          />
        ) : null}
        <div>
          <p className="text-[16px] font-medium lg:text-[18px]">{name}</p>
          {cost.amountPerQuantity ? (
            <p className="mt-1 text-[14px] text-cream/60">
              <Money data={cost.amountPerQuantity} />
            </p>
          ) : null}
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-3 lg:justify-self-center">
        <div className="flex items-center rounded-md border border-white/15">
          <QtyButton
            lineId={id}
            quantity={quantity - 1}
            disabled={quantity <= 1}
            label="Decrease quantity"
          >
            &minus;
          </QtyButton>
          <span className="w-10 text-center text-[15px] tabular-nums">
            {quantity}
          </span>
          <QtyButton lineId={id} quantity={quantity + 1} label="Increase quantity">
            +
          </QtyButton>
        </div>
        <RemoveButton lineId={id} />
      </div>

      {/* Total */}
      <span className="text-[16px] font-semibold lg:justify-self-end lg:text-[18px]">
        <span className="mr-2 text-cream/50 lg:hidden">Total:</span>
        <Money data={cost.totalAmount} />
      </span>
    </li>
  );
}

function QtyButton({
  lineId,
  quantity,
  disabled = false,
  label,
  children,
}: {
  lineId: string;
  quantity: number;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines: [{id: lineId, quantity}]}}
    >
      <button
        type="submit"
        disabled={disabled}
        aria-label={label}
        className="flex h-9 w-9 items-center justify-center text-[18px] leading-none text-cream transition hover:text-sogility disabled:opacity-30"
      >
        {children}
      </button>
    </CartForm>
  );
}

function RemoveButton({lineId}: {lineId: string}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds: [lineId]}}
    >
      <button
        type="submit"
        aria-label="Remove item"
        className="flex h-9 w-9 items-center justify-center text-cream/50 transition hover:text-white"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" />
        </svg>
      </button>
    </CartForm>
  );
}
