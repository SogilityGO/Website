import {redirect} from 'react-router';
import type {Route} from './+types/articles.$articleHandle';
import {getArticlePaths} from '~/lib/articlePaths';

/** Recover links indexed from the old article sitemap without redirecting unknown slugs. */
export async function loader({params, request, context}: Route.LoaderArgs) {
  const paths = await getArticlePaths(context.storefront);
  const path = paths.get(params.articleHandle);
  if (!path) throw new Response('Article not found', {status: 404});
  return redirect(path + new URL(request.url).search, 301);
}
