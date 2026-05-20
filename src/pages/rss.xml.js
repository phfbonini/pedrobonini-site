import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../lib/config';

export async function GET(context) {
  const posts = (
    await getCollection('posts', ({ data }) => !data.draft && data.lang === 'en')
  ).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: `${SITE.name} · Writing`,
    description:
      'Notes on AI agents, engineering practice, and career. By Pedro Bonini.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>en-us</language>`,
  });
}
