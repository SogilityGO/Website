const ATTRIBUTION_QUERY_KEYS = [
  'placement',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const;

const ATTRIBUTE_LABELS: Record<
  (typeof ATTRIBUTION_QUERY_KEYS)[number],
  string
> = {
  placement: 'Partner Placement',
  utm_source: 'UTM Source',
  utm_medium: 'UTM Medium',
  utm_campaign: 'UTM Campaign',
  utm_content: 'UTM Content',
  utm_term: 'UTM Term',
};

const MAX_ATTRIBUTE_LENGTH = 120;
const PARTNER_HANDLE_PATTERN = /^[a-z0-9][a-z0-9-]{0,79}$/;

type CartAttribute = {key: string; value: string};

function cleanAttributeValue(value: string | null): string | null {
  if (!value) return null;
  const clean = value
    .split('')
    .filter((character) => {
      const code = character.charCodeAt(0);
      return code >= 32 && code !== 127;
    })
    .join('')
    .trim()
    .slice(0, MAX_ATTRIBUTE_LENGTH);
  return clean || null;
}

export function cleanPartnerHandle(value: string | null): string | null {
  const clean = cleanAttributeValue(value)?.toLowerCase() ?? null;
  return clean && PARTNER_HANDLE_PATTERN.test(clean) ? clean : null;
}

export function buildPartnerCheckoutHref(params: {
  variantId: string;
  discountCode?: string;
  partnerHandle: string;
  currentSearch: URLSearchParams;
}): string {
  const {variantId, discountCode, partnerHandle, currentSearch} = params;
  const query = new URLSearchParams();

  if (discountCode) query.set('discount', discountCode);
  query.set('partner', partnerHandle);

  for (const key of ATTRIBUTION_QUERY_KEYS) {
    const value = cleanAttributeValue(currentSearch.get(key));
    if (value) query.set(key, value);
  }

  if (!query.has('placement') && query.has('utm_content')) {
    query.set('placement', query.get('utm_content')!);
  }

  return `/cart/${variantId}:1?${query.toString()}`;
}

export function getPartnerCartAttributes(
  searchParams: URLSearchParams,
): CartAttribute[] {
  const partnerHandle = cleanPartnerHandle(searchParams.get('partner'));
  if (!partnerHandle) return [];

  const attributes: CartAttribute[] = [
    {key: 'Partner', value: partnerHandle},
    {key: 'Partner Page', value: `/partners/${partnerHandle}`},
  ];

  for (const key of ATTRIBUTION_QUERY_KEYS) {
    const value = cleanAttributeValue(searchParams.get(key));
    if (value) attributes.push({key: ATTRIBUTE_LABELS[key], value});
  }

  return attributes;
}

export function addCheckoutLinkerParams(
  checkoutUrl: string,
  searchParams: URLSearchParams,
): string {
  const url = new URL(checkoutUrl);

  for (const key of ['_gl', '_ga']) {
    const value = searchParams.get(key);
    if (value) url.searchParams.set(key, value.slice(0, 1000));
  }

  return url.toString();
}

export function getPartnerEventAttribution(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const searchParams = new URLSearchParams(window.location.search);
  const properties: Record<string, string> = {};

  for (const key of ATTRIBUTION_QUERY_KEYS) {
    const value = cleanAttributeValue(searchParams.get(key));
    if (value) properties[key] = value;
  }

  return properties;
}
