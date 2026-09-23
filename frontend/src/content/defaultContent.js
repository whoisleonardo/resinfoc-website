// Copia local do conteudo padrao, usada apenas como fallback caso a API
// nao possa ser alcancada (ex: backend fora do ar). Assim que a API responde,
// o conteudo salvo pela gestora no /acesso sempre tem prioridade.

const COLORS = {
  purple: '#1F5278',
  gold: '#A63D32',
  green: '#173143',
  blue: '#1F5278',
};

export const defaultContent = {
  site: {
    siteName: 'RESINFOC',
    tagline: 'Rede Sonora de Informação e Ciência',
    logoHeader: { type: 'image', url: '/resinfoc-logo.png' },
    logoFooter: { type: 'image', url: '/resinfoc-logo.png' },
  },
  home_hero: {
    badge: 'Projeto de extensão · UFPR',
    title: 'Informação e ciência para ouvir, compartilhar e transformar.',
    subtitle:
      'A RESINFOC é a Rede Sonora de Informação e Ciência: um projeto de extensão da UFPR que aproxima a ciência do cotidiano por meio do áudio.',
    ctaPrimaryLabel: 'Conheça a RESINFOC',
    ctaSecondaryLabel: 'Ver matérias',
    heroImage: { type: 'image', url: '' },
    spotify: {
      label: 'Ouça o RESINFOC',
      title: 'Informação e ciência no seu fone',
      text: 'Episódios, entrevistas e conversas para aproximar a ciência do cotidiano.',
      url: 'https://open.spotify.com/show/03hof1vNtNXhtwey0UPZYp?si=DovdvEyUQXaGKAewF9ROww&utm_source=copy-link',
      ctaLabel: 'Ouvir no Spotify ↗',
    },
  },
  pillars: {
    items: [
      { title: 'Ciência em diálogo', text: 'Traduzimos conhecimentos científicos em conversas acessíveis e relevantes.', color: COLORS.purple },
      { title: 'Produção sonora', text: 'Estudantes aprendem a criar episódios, entrevistas e narrativas em áudio.', color: COLORS.gold },
      { title: 'Extensão universitária', text: 'Conectamos a universidade com a vida cotidiana por meio da escuta.', color: COLORS.green },
    ],
  },
  current_project: {
    badge: 'Trabalhando agora',
    title: 'Acompanhe as produções sonoras da RESINFOC',
    text: 'Em cada temporada, a rede explora temas de ciência e informação em episódios e conversas.',
    ctaLabel: 'Ver atualizações',
    image: { type: 'image', url: '' },
  },
  materias: { bannerUrl: 'https://jornalcomunicacao.ufpr.br/tag/jornal-comunicacao/', items: [] },
  fotos: { items: [] },
  sobre: {
    badge: 'Sobre o projeto',
    title: 'RESINFOC: Rede Sonora de Informação e Ciência',
    text: 'A RESINFOC é um projeto de extensão da UFPR que aproxima ciência e cotidiano com produção sonora, escuta e conversa.',
    image: { type: 'image', url: '' },
    stats: [
      { value: '+40', label: 'Estudantes envolvidos', color: COLORS.purple },
      { value: '12', label: 'Matérias publicadas', color: COLORS.gold },
      { value: '6', label: 'Projetos realizados', color: COLORS.green },
    ],
    missao: [],
    passos: [],
    ctaTitle: 'Quer fazer parte da RESINFOC?',
    ctaText: 'Estudantes, professores e a comunidade são sempre bem-vindos para criar e ouvir conosco.',
    ctaButtonLabel: 'Fale com a gente',
  },
  atualizacoes: {
    badge: 'Em andamento',
    title: 'Atualizações do projeto atual',
    subtitle: 'Acompanhe de perto os episódios, entrevistas e projetos sonoros da rede.',
    coverImage: { type: 'image', url: '' },
    items: [],
  },
  contato: {
    badge: 'Contato',
    title: 'Fale com a gente',
    subtitle: 'Dúvidas, sugestões de tema, parcerias ou vontade de participar da RESINFOC? Manda pra gente.',
    address: 'Setor de Artes, Comunicação e Design\nUniversidade Federal do Paraná\nCuritiba, PR',
    email: 'resinfoc@ufpr.br',
    instagram: '@resinfoc.ufpr',
    whatsapp: '',
    projects: [{ name: 'ResInfoc', url: '' }],
  },
  footer: {
    description: 'Rede Sonora de Informação e Ciência — um projeto de extensão da UFPR.',
    socials: [
      { name: 'Instagram', href: '#' },
      { name: 'E-mail', href: 'mailto:resinfoc@ufpr.br' },
      { name: 'WhatsApp', href: '#' },
    ],
  },
};
