import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../../lib/config';

export async function GET(context) {
  const posts = (
    await getCollection('posts', ({ data }) => !data.draft && data.lang === 'pt')
  ).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: `${SITE.name} · Escritos`,
    description:
      'Notas sobre agentes de IA, prática de engenharia e carreira. Por Pedro Bonini.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/pt/blog/${post.slug}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>pt-br</language>`,
  });
}
