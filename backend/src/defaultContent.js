// Conteudo padrao do site. E usado para popular o banco na primeira vez
// (npm run seed) e como "fallback" caso alguma secao ainda nao tenha sido
// salva no banco. A gestora pode editar tudo isso depois pelo /acesso.

const COLORS = {
  purple: '#573B6F',
  gold: '#F4B030',
  green: '#378054',
  blue: '#516E90',
};

const defaultContent = {
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
    heroImage: { type: 'image', url: '/uploads/seed/hero-illustration.png' },
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
      { title: 'Extensão universitária', text: 'Conectamos o conhecimento produzido na universidade com a vida cotidiana por meio da escuta.', color: COLORS.green },
    ],
  },

  current_project: {
    badge: 'Trabalhando agora',
    title: 'Acompanhe as produções sonoras da RESINFOC',
    text: 'Em cada temporada, a rede explora temas de ciência e informação em episódios, entrevistas e conversas.',
    ctaLabel: 'Ver atualizações',
    image: { type: 'image', url: '' },
  },

  materias: {
    badge: 'Matérias',
    title: 'Matérias e conteúdos da rede',
    subtitle: 'Acompanhe reportagens, entrevistas e conteúdos que conectam informação, ciência e produção sonora.',
    bannerText: 'As reportagens completas e o acervo histórico do curso ficam no site do Jornal Comunicação.',
    bannerButtonLabel: 'Visitar site do jornal ↗',
    bannerUrl: 'https://jornalcomunicacao.ufpr.br/tag/jornal-comunicacao/',
    items: [
      { id: 'm1', tag: 'Ciência', title: 'Como a ciência chega ao cotidiano das pessoas', excerpt: 'Uma conversa sobre caminhos para aproximar universidade, informação e comunidade.', color: COLORS.purple, category: 'reportagem', date: 'Jun 2026', image: { type: 'image', url: '' }, link: '' },
      { id: 'm2', tag: 'Entrevista', title: 'Pesquisadora da UFPR fala sobre divulgação científica', excerpt: 'Bate-papo sobre transformar pesquisa em informação acessível para mais pessoas.', color: COLORS.gold, category: 'entrevista', date: 'Mai 2026', image: { type: 'image', url: '' }, link: '' },
      { id: 'm3', tag: 'Áudio', title: 'Por que escutar também é uma forma de aprender', excerpt: 'Um texto sobre o potencial das narrativas sonoras na universidade pública.', color: COLORS.green, category: 'opiniao', date: 'Mai 2026', image: { type: 'image', url: '' }, link: '' },
      { id: 'm4', tag: 'Bastidores', title: 'Como nasce um episódio da RESINFOC', excerpt: 'Da pesquisa ao roteiro e à edição: os caminhos de uma produção sonora.', color: COLORS.purple, category: 'reportagem', date: 'Abr 2026', image: { type: 'image', url: '' }, link: '' },
      { id: 'm5', tag: 'Coluna', title: 'O que aprendemos ao ouvir diferentes saberes', excerpt: 'Reflexões da equipe sobre escuta, ciência e produção de informação.', color: COLORS.blue, category: 'coluna', date: 'Abr 2026', image: { type: 'image', url: '' }, link: '' },
      { id: 'm6', tag: 'Entrevista', title: 'Egressa conta como o áudio mudou sua trajetória', excerpt: 'Depoimento de quem experimentou a produção sonora durante a formação.', color: COLORS.gold, category: 'entrevista', date: 'Mar 2026', image: { type: 'image', url: '' }, link: '' },
    ],
  },

  fotos: {
    badge: 'Registros',
    title: 'Registros para ouvir e compartilhar',
    subtitle: 'Fotos, vídeos e áudios dos bastidores, encontros e produções da RESINFOC.',
    ctaTitle: 'Fez parte de alguma produção com a gente?',
    ctaText: 'Manda sua foto, vídeo ou áudio e a gente inclui no acervo da RESINFOC.',
    ctaButtonLabel: 'Enviar registro',
    items: [
      { id: 'f1', type: 'image', url: '', label: 'Oficina de produção sonora' },
      { id: 'f2', type: 'image', url: '', label: 'Gravação de entrevista' },
      { id: 'f3', type: 'image', url: '', label: 'Reunião de roteiro' },
      { id: 'f4', type: 'image', url: '', label: 'Entrevista sobre ciência' },
      { id: 'f5', type: 'image', url: '', label: 'Edição de áudio' },
      { id: 'f6', type: 'image', url: '', label: 'Lançamento de episódio' },
      { id: 'f7', type: 'image', url: '', label: 'Estúdio de gravação' },
      { id: 'f8', type: 'image', url: '', label: 'Equipe da RESINFOC' },
      { id: 'f9', type: 'image', url: '', label: 'Encontro com a comunidade' },
    ],
  },

  sobre: {
    badge: 'Sobre o projeto',
    title: 'RESINFOC: Rede Sonora de Informação e Ciência',
    text:
      'A RESINFOC é um projeto de extensão da UFPR que aproxima ciência e cotidiano por meio de produções sonoras, entrevistas e conversas feitas com a comunidade.',
    image: { type: 'image', url: '' },
    stats: [
      { value: '+40', label: 'Estudantes envolvidos', color: COLORS.purple },
      { value: '12', label: 'Conteúdos publicados', color: COLORS.gold },
      { value: '6', label: 'Projetos sonoros', color: COLORS.green },
    ],
    missao: [
      { title: 'Democratizar a informação', text: 'Levar ciência e informação de qualidade a públicos diversos por meio do áudio.', color: COLORS.purple },
      { title: 'Formar comunicadores', text: 'Preparar estudantes para criar narrativas sonoras comprometidas com a escuta.', color: COLORS.gold },
      { title: 'Aproximar UFPR e comunidade', text: 'Criar pontes entre a universidade, os saberes e a vida cotidiana.', color: COLORS.green },
      { title: 'Fortalecer a divulgação científica', text: 'Valorizar conversas que tornam a ciência mais próxima e compartilhável.', color: COLORS.blue },
    ],
    passos: [
      { n: '1', title: 'Formação', text: 'Oficinas de pesquisa, entrevista, roteiro e produção de áudio.', color: COLORS.purple },
      { n: '2', title: 'Escuta', text: 'Definição de temas a partir de perguntas da comunidade e da ciência.', color: COLORS.gold },
      { n: '3', title: 'Produção', text: 'Entrevistas, gravação e edição de episódios e conversas.', color: COLORS.green },
      { n: '4', title: 'Compartilhamento', text: 'Publicação dos conteúdos no site, nas redes e nas plataformas de áudio.', color: COLORS.blue },
    ],
    ctaTitle: 'Quer fazer parte da RESINFOC?',
    ctaText: 'Estudantes, professores e moradores da comunidade são sempre bem-vindos para criar e ouvir com o projeto.',
    ctaButtonLabel: 'Fale com a gente',
  },

  atualizacoes: {
    badge: 'Em andamento',
    title: 'Atualizações do projeto atual',
    subtitle: 'Acompanhe de perto os episódios, entrevistas e projetos sonoros da rede.',
    coverImage: { type: 'image', url: '' },
    items: [
      { date: 'Jun 2026', title: 'Início da nova série de episódios', text: 'A equipe começou a pesquisar e gravar conversas sobre ciência e cotidiano.', color: COLORS.purple },
      { date: 'Mai 2026', title: 'Oficina de entrevista e captação de áudio', text: 'Encontro formativo sobre escuta, roteiro e produção sonora.', color: COLORS.gold },
      { date: 'Abr 2026', title: 'Parceria com o Jornal Comunicação', text: 'A rede amplia a circulação de conteúdos junto ao jornal-laboratório do curso.', color: COLORS.green },
      { date: 'Mar 2026', title: 'Primeiros temas definidos com a comunidade', text: 'Reuniões abertas para ouvir perguntas e interesses sobre ciência.', color: COLORS.blue },
      { date: 'Fev 2026', title: 'Lançamento oficial da RESINFOC', text: 'Início das atividades da rede com a primeira turma de estudantes.', color: COLORS.purple },
    ],
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
    description:
      'Rede Sonora de Informação e Ciência — um projeto de extensão da UFPR que conecta estudantes, professores e comunidade por meio do áudio e da ciência.',
    socials: [
      { name: 'Instagram', href: 'https://www.instagram.com/resinfoc.ufpr/' },
      { name: 'E-mail', href: 'mailto:resinfoc@ufpr.br' },
      { name: 'WhatsApp', href: '' },
    ],
  },

  newsletter_cta: {
    title: 'Receba as novidades da RESINFOC',
    text: 'Uma newsletter por mês com episódios, conversas e ciência para ouvir. Sem spam.',
  },
};

module.exports = { defaultContent, COLORS };
