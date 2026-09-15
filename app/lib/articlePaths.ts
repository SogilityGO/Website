import type {ArticlePathsQuery} from 'storefrontapi.generated';
import type {Storefront} from '@shopify/hydrogen';

/** Article sitemap resources omit the blog handle required by our routes. */
export async function getArticlePaths(storefront: Storefront) {
  const paths = new Map<string, string>();
  let after: string | null = null;
  do {
    const data: ArticlePathsQuery = await storefront.query(ARTICLE_PATHS_QUERY, {
      variables: {after},
      cache: storefront.CacheLong(),
    });
    for (const article of data.articles.nodes) {
      paths.set(article.handle, `/blogs/${article.blog.handle}/${article.handle}`);
    }
    after = data.articles.pageInfo.hasNextPage
      ? data.articles.pageInfo.endCursor ?? null
      : null;
  } while (after);
  return paths;
}

const ARTICLE_PATHS_QUERY = `#graphql
  query ArticlePaths($after: String) {
    articles(first: 250, after: $after) {
      nodes { handle blog { handle } }
      pageInfo { hasNextPage endCursor }
    }
  }
` as const;
