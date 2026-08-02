# SogilityGO Storefront (my.sogilitygo.com)

Headless Shopify storefront built with **Hydrogen** and hosted on **Oxygen**. It powers:

- **Parents landing page** — the site root `/` (`app/routes/_index.tsx`), live at https://my.sogilitygo.com
- **Partner landing pages** — `/partners/<handle>` (`app/routes/partners.$handle.tsx`), one dynamic route that serves every partner from Shopify data

> The main store at **www.sogilitygo.com** is a separate Shopify (Liquid) theme and is **not** in this repository.

## Tech stack

- Hydrogen 2026.4.x, React Router 7, TypeScript
- Tailwind CSS v4 (design tokens live in `app/styles/tailwind.css` under `@theme`)
- Vite build, self-hosted Inter font (`@fontsource/inter`)
- Shopify Storefront API version **2026-04**

## Prerequisites

- Node.js **22 or 24** (see `engines` in `package.json`)
- Shopify CLI (`npx shopify ...`, or install globally with `npm i -g @shopify/cli`)
- Access to the SogilityGO Shopify admin (store `nhhwax-cv.myshopify.com`)

## Local setup

```bash
npm install

# Link this project to the Shopify store (choose the "Parents Landing" storefront)
npx shopify hydrogen link

# Pull environment variables from Shopify into a local .env
npx shopify hydrogen env pull

# Start the dev server (http://localhost:3000)
npm run dev
# use a different port with:  npm run dev -- --port 3333
```

`.env` is gitignored and never committed. `hydrogen env pull` fetches everything the app
needs (Storefront API tokens, checkout domain, etc.) directly from your own Shopify store,
so no credentials have to be shared by hand.

### Environment variables

All of these live on Oxygen (Shopify admin → Hydrogen → Parents Landing → *Environments and
variables*) and are retrieved locally with `hydrogen env pull`:

| Variable | Purpose |
|---|---|
| `PUBLIC_STORE_DOMAIN` | `nhhwax-cv.myshopify.com` |
| `PUBLIC_STOREFRONT_API_TOKEN` | Storefront API (public client token) |
| `PUBLIC_STOREFRONT_ID` | Storefront id |
| `PUBLIC_CHECKOUT_DOMAIN` | `www.sogilitygo.com` — required for Shopify analytics + cross-domain attribution |
| `PUBLIC_CUSTOMER_ACCOUNT_API_URL` / `PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID` | Customer Account API |
| `PRIVATE_STOREFRONT_API_TOKEN`, `SESSION_SECRET`, `SHOP_ID` | server-side only |

## Common commands

```bash
npm run dev         # dev server (Hydrogen + Vite)
npm run typecheck   # react-router typegen + tsc --noEmit
npm run build       # production build
npm run preview     # preview a production build locally
npm run lint
```

## Deployment

Push to **`main`** and Oxygen auto-deploys. The GitHub → Oxygen connection is configured in
Shopify admin → **Hydrogen → Parents Landing → Oxygen deployments**. Production is
https://my.sogilitygo.com. Environment variables are stored on Oxygen and persist across
deploys.

## Editing content without code (Shopify metaobjects)

Some content is editable straight from Shopify admin, no code change or deploy needed.

### Promo banner — `site_banner`

Shopify admin → **Content → Metaobjects → Site banner** → open the entry:

- `enabled` (true/false) — show or hide the banner across the whole site
- `text` — the banner message

Read in `app/root.tsx`, rendered in `app/components/landing/LandingHeader.tsx`. Changes are
live within seconds. This controls **my.sogilitygo.com only**; the www.sogilitygo.com banner
is edited separately in that store's theme.

### Partner pages — `partner_page`

One entry per partner. Shopify admin → **Content → Metaobjects → Partner Page → Add entry**.
Fields: `name`, `logo`, `eyebrow`, `headline`, `body`, `offer_text`, `discount_code`. The
entry **Handle** becomes the URL slug: `my.sogilitygo.com/partners/<handle>`. The discount
code must exist and be active under **Discounts**. Read in `app/routes/partners.$handle.tsx`
(falls back to the seed in `app/data/partners.ts` if the metaobject is unavailable).

## Analytics & tracking

`app/components/landing/analytics.tsx` loads GA4, Google Ads, Meta Pixel, Yahoo, and HubSpot.
**Every third-party domain must be allow-listed in the Content Security Policy** in
`app/entry.server.tsx`, otherwise the browser silently blocks it.

## Project structure

```
app/routes/_index.tsx                Parents landing (home)
app/routes/partners.$handle.tsx      Partner pages (dynamic, metaobject-driven)
app/routes/cart.$lines.tsx           Cart permalink + ?discount= auto-apply
app/root.tsx                         Root loader (header, site_banner)
app/components/landing/              All landing sections + header/footer
app/components/landing/analytics.tsx GA4 / Google Ads / Meta / Yahoo / HubSpot
app/entry.server.tsx                 Content Security Policy
app/styles/tailwind.css              Design tokens (@theme)
public/landing/                      Images / assets
```

## Gotchas (please read before editing)

- **CSP** — `app/entry.server.tsx` uses a strict Content Security Policy. Any new script,
  pixel, iframe, image host, or fetch target must be added to the matching directive, or it
  will be silently blocked in the browser.
- **GA4 property id** — `G-Z5TKEJ2070` is correct. Do **not** change it to `G-Z5TKEJ2G70`;
  that id returns 404 from Google and stops all Google tracking (GA4 + Ads). There is a code
  comment in `analytics.tsx` explaining this.
- **`reset.css`** — intentionally not imported. Re-adding the scaffold `reset.css` breaks
  the Tailwind styles.
- **Codegen warning on build** — if the local folder path contains spaces or parentheses,
  `npm run build` prints "Unable to find GraphQL type definitions". It only affects local
  type generation, not the build output or Oxygen deploys (the deploy path has no spaces).
- **Checkout** — Buy buttons link to `/cart/<variantId>:1?discount=<CODE>` permalinks that
  create a cart and redirect to checkout on www.sogilitygo.com. The tier → variant mapping is
  fetched live by product handle in `app/routes/_index.tsx`.
- **Store plan** — Grow (not Plus). The checkout discount-code field cannot be removed or
  locked on this plan.

---

Original build: RJL Studio. Happy to help during the transition.
