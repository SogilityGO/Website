import type {Route} from './+types/sitemap.$type.$page[.xml]';
import {getSitemap} from '@shopify/hydrogen';
import {getArticlePaths} from '~/lib/articlePaths';

export async function loader({
  request,
  params,
  context: {storefront},
}: Route.LoaderArgs) {
  const articlePaths = params.type === 'articles' ? await getArticlePaths(storefront) : null;
  const response = await getSitemap({
    storefront,
    request,
    params,
    // This app has no locale-prefixed page routes.
    locales: [],
    getLink: ({type, baseUrl, handle}) => {
      if (type === 'articles') {
        const path = handle ? articlePaths?.get(handle) : undefined;
        if (!path) throw new Error(`Missing blog path for article ${handle}`);
        return `${baseUrl}${path}`;
      }
      return `${baseUrl}/${type}/${handle}`;
    },
  });

  response.headers.set('Cache-Control', `max-age=${60 * 60 * 24}`);

  return response;
}
