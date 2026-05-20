export const SITE = {
  name: 'Pedro Bonini',
  domain: 'pedrobonini.com',
  url: 'https://pedrobonini.com',
  defaultLang: 'en' as const,
  email: 'phf_apps@outlook.com',
  github: 'https://github.com/phfbonini',
  githubUser: 'phfbonini',
  avatar: 'https://github.com/phfbonini.png',
  linkedin: 'https://www.linkedin.com/in/phfbonini/',
  bio: {
    en: 'Software engineer in southern Brazil. Building public-sector tech and AI agents.',
    pt: 'SWE do sul do Brasil, arquitetante tecnologias que impactam..',
  },
};

export const NAV = {
  en: [
    { label: 'home', href: '/' },
    { label: 'about', href: '/about' },
    { label: 'posts', href: '/blog' },
    { label: 'projects', href: '/projects' },
    { label: 'uses', href: '/uses' },
  ],
  pt: [
    { label: 'início', href: '/pt' },
    { label: 'sobre', href: '/pt/sobre' },
    { label: 'posts', href: '/pt/blog' },
    { label: 'projetos', href: '/pt/projects' },
    { label: 'uses', href: '/pt/uses' },
  ],
};

export const CATEGORIES = {
  en: {
    'ai-agents': 'ai-agents',
    engineering: 'engineering',
    career: 'career',
    personal: 'personal',
  },
  pt: {
    'ai-agents': 'ia-agentes',
    engineering: 'engenharia',
    career: 'carreira',
    personal: 'pessoal',
  },
};
