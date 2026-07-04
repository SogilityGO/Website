# CONTEXT — Sogility GO · Partner Landing Pages (для web Claude Code)

> Портативная техническая выжимка проекта для новой сессии Claude Code.
> Загрузи этот файл в начало чата — и Claude сразу в теме по коду.
> (Полный внутренний HANDOFF.md с бизнес-контекстом остаётся локально; здесь — только то, что нужно для работы над кодом.)

---

## 1. Что за проект

Headless-сторфронт **SogilityGO** на **Shopify Hydrogen** (React Router 7, TypeScript, Tailwind v4), хостинг **Oxygen**. Бренд — домашний футбольный тренинг (US).

Две вещи в одном сторфронте:
- **Лендинг для родителей** — корень `/` (route `app/routes/_index.tsx`). Живёт на `https://my.sogilitygo.com`.
- **Партнёрские страницы** — `/partners/<handle>` (route `app/routes/partners.$handle.tsx`). Для футбольных клубов/лиг. Первый партнёр — **Indiana Soccer** (`/partners/indiana-soccer`).

⚠️ Основной магазин `www.sogilitygo.com` — это **отдельная Liquid-тема, НЕ в этом репо**. Не путать. Тариф Shopify — **Grow (не Plus)**.

---

## 2. Код, стек, деплой

- **Git:** `Olegrij/sogilitygo`, ветка `main`. **Push в `main` → Oxygen авто-деплоит.**
- **Стек:** Hydrogen 2026.4.x, React Router 7, TS, Tailwind v4, Inter (self-hosted), sharp (оптимизация ассетов).
- **Store domain:** `nhhwax-cv.myshopify.com` · **live:** `my.sogilitygo.com`.

### Команды
- Dev: `npm run dev -- --port 3333` → http://localhost:3333/
- Typecheck: `npm run typecheck`
- Build: `npm run build` (или `npx shopify hydrogen build` без codegen)
- Env: `npx shopify hydrogen env pull` (нужен логин в Shopify) — тянет `.env` (Storefront API токены). `.env` **gitignored**, в репо его нет. Нужен только чтобы гонять dev / запрашивать магазин локально; для «правка кода → push → Oxygen деплоит» не обязателен (env уже на Oxygen).

---

## 3. Архитектура партнёрских страниц (главное)

**Один динамический роут обслуживает всех партнёров.** Данные партнёра — в Shopify-метаобъекте; код на каждого партнёра не пишется.

### Роут `app/routes/partners.$handle.tsx`
- **Loader:** запрашивает метаобъект `partner_page` по handle через Storefront API (`PARTNER_METAOBJECT_QUERY`) → маппит в `PartnerData`. Если метаобъект пуст/недоступен → **фолбэк на seed** `app/data/partners.ts`. Если ни там, ни там → **404**.
- Плюс запрашивает варианты товаров для кнопок Buy (`PARTNER_TIERS_QUERY` → `CheckoutMap`).
- `meta`: `noindex, follow` (партнёрские страницы почти-дубли — не индексируем).

### Метаобъект `partner_page` (в Shopify admin)
Создан в **Settings → Custom data → Metaobjects**, **Storefront access = ON** (иначе Hydrogen не прочитает). Поля (ключи):
`name`, `logo` (File → отдаётся с Shopify CDN через image-transform webp/480), `eyebrow`, `headline`, `body` (multi-line, абзацы разделены `\n\n`), `offer_text`, `discount_code`.
Опциональные (cta/accent/banner) в метаобъекте НЕ заведены — дефолты в коде (`metaobjectToPartner`).

### Тип и seed данных — `app/data/partners.ts`
`PartnerData` (name, logo, logoAlt, heroImage?, eyebrow, headline, body[], offerText, discountCode, ctaText, accentColor, bannerMode, bannerText?). Seed-запись Indiana — фолбэк, если метаобъект отвалится.

### Компоненты
- `app/components/landing/PartnerHero.tsx` — партнёрский герой. **Мобайл:** фото-баннер (парень виден) + текст на тёмном под фото. **Десктоп:** фото-фон + текст слева, парень справа. ⚠️ Позиция парня по горизонтали задаётся шириной фото `lg:w-[118%]` (независимо от высоты `lg:min-h-[860px]`). Двигать парня → менять %. Ко-брендинг (лого партнёра × SogilityGO). Опц. `heroImage` — своё фото партнёра, иначе дефолтный hero SogilityGO.
- `app/components/landing/PartnerOffer.tsx` — зелёная плашка-оффер перед ценами.
- Остальные секции тела (`TrustedBy`, `PlayerJourney`, `VirtualCoach`, `TrainingBoard`, `Reviews`, `CoreSkills`, `SetupTraining`, `OwnerMessage`, `Faq`) — переиспользуются из `sections.tsx` как есть.

### Авто-применение партнёрской скидки (атрибуция)
Кнопки Buy на партнёрской странице ведут на `/cart/<variantId>:1?discount=<CODE>`. Роут `app/routes/cart.$lines.tsx` (scaffold) применяет `?discount=` при `cart.create()` → скидка доезжает до чекаута и **ложится на заказ**. `BuyButton`/`StartTraining`/`StartTrainingSlider` в `sections.tsx` принимают опц. `discountCode` (**обратно совместимо** — главный лендинг передаёт `undefined`). Проверено на проде: Indiana → −10% на чекауте, код на заказе.

### Скрытие баннера WC26
`app/components/landing/LandingHeader.tsx` через `useMatches()` определяет партнёрский роут и его `bannerMode` (`hide`/`replace`). На партнёрских страницах сайтовый промо-баннер WC26 скрыт.

### Фавикон
`app/assets/favicon.svg` — зелёный «GO» бейдж (линкуется в `root.tsx`), на всех страницах.

---

## 4. Как завести нового партнёра (команда, без кода)

**Shopify admin → Content → Metaobjects → Partner Page → Add entry** → заполнить поля (Name, Logo, Eyebrow, Headline, Body, Offer text, Discount code) → задать **Handle** (строчные + дефисы = слаг URL, напр. `missouri-youth-soccer`) → **Save** (Active).
→ Страница сразу живая на `my.sogilitygo.com/partners/<handle>`. **URL = Handle карточки.** Deploy не нужен. Промокод должен существовать и быть Active в Shopify (Discounts).

---

## 5. Текущий статус (технически)

**Готово и на проде (`main`):**
- Партнёрский лендинг (desktop + mobile), контент из метаобъекта, авто-скидка, скрытый баннер, бренд-фавикон.
- Первый партнёр Indiana Soccer — живой, end-to-end проверен.

**Опционально осталось:**
- Довести реальный тестовый заказ и сверить код на заказе в админке + HubSpot (на чекауте код уже стоит).
- При желании добавить в метаобъект поля accent_color / banner_mode / banner_text и расширить `metaobjectToPartner`.
- Опц. cart-attribute `partner` для атрибуции при свопе кода (правка `cart.$lines.tsx`).

---

## 6. Подводные камни

- **Атрибуция — по коду.** На тарифе Grow поле промокода на чекауте убрать нельзя. Партнёрский код авто-применяется и ложится на заказ, но покупатель может ввести другой код руками. Это лимит тарифа, не баг. Рычаг — держать партнёрский оффер не хуже публичного промо.
- **Codegen локально ругается** «Unable to find GraphQL type definitions» из-за пробела/скобок в пути папки — косметика, на билд не влияет; на Oxygen (путь без пробелов) codegen ок.
- **Не подключать обратно scaffold `reset.css`** — ломает стили (см. критические фиксы в полном HANDOFF).
- Storefront API version — **2026-04** (проверено рабочей).

---

## 7. Как проверять

- Типы: `npm run typecheck` (должен быть exit 0). Билд: `npm run build` (exit 0).
- Визуально: поднять dev и открыть страницу. (Локально использовался chrome-devtools MCP для скриншотов — в web его нет, проверяй глазами на dev/preview или на задеплоенной странице.)
- Метаобъект живьём можно дёрнуть Storefront API (`metaobject(handle:{type:"partner_page",handle:"indiana-soccer"})`).

---

## 8. Ключевые файлы

```
app/routes/partners.$handle.tsx     — партнёрский роут (loader + метаобъект + 404 + noindex)
app/data/partners.ts                — PartnerData тип + seed-фолбэк
app/components/landing/PartnerHero.tsx   — партнёрский герой (mobile/desktop)
app/components/landing/PartnerOffer.tsx  — оффер-плашка
app/components/landing/sections.tsx      — секции тела + BuyButton/StartTraining (discountCode)
app/components/landing/LandingHeader.tsx — хедер + скрытие баннера на партнёрских
app/routes/cart.$lines.tsx          — cart permalink + ?discount= (scaffold)
app/routes/_index.tsx               — главный лендинг для родителей
app/assets/favicon.svg              — бренд-фавикон
app/styles/tailwind.css             — @theme токены (бренд-зелёный #30BE2D, dark #282938, cream #F8F8F1 и т.д.)
```
