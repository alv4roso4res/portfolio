export type ProjectMedia =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; src: string; poster?: string; alt: string };

export type Project = {
  /** identificador estável, usado no data-attribute e na pasta em public/projects/ */
  slug: string;
  name: string;
  /** uma linha, aparece na lista */
  tagline: string;
  /** 2–4 frases, aparece no modal */
  description: string;
  stack: string[];
  /** link ao vivo */
  url?: string;
  /** link do repositório */
  repo?: string;
  /** o primeiro item é o destaque do modal */
  media: ProjectMedia[];
};

/**
 * Catálogo de projetos. Para adicionar um novo:
 * 1. crie a pasta public/projects/<slug>/ com as mídias (ver README de lá);
 * 2. acrescente um item aqui — a lista e o modal se montam sozinhos.
 *
 * TODO: revisar `description` e `stack` dos itens abaixo (preenchidos por
 * inferência a partir do nome/finalidade de cada projeto).
 */
export const projects: Project[] = [
  {
    slug: 'lessonplans',
    name: 'Gerador de Planos de Aula',
    tagline: 'Monta planos de aula completos a partir de poucas informações.',
    description:
        'Ferramenta que monta planos de aula a partir de poucos campos preenchidos pelo professor. A ideia é cortar o trabalho repetitivo de formatação e entregar um documento pronto para revisar. A interface é enxuta, para uso rápido entre uma aula e outra.',
    stack: ['React', 'Typescript', 'Vercel'],
    url: 'https://lessonplans.vercel.app/',
    repo: 'https://github.com/alv4roso4res/lessonplans',
    media: [
      {
        kind: 'image',
        src: '/projects/lessonplans/hero.png',
        alt: 'Tela inicial do gerador de planos de aula',
      },
      {
        kind: 'video',
        src: '/projects/lessonplans/demo.mp4',
        poster: '/projects/lessonplans/hero.png',
        alt: 'Demonstração da geração de um plano de aula do início ao fim',
      },
    ],
  },
  {
    slug: 'app-treino',
    name: 'Vibe Training',
    tagline: 'Aplicativo para auxiliar nos treinamentos e progressão de carga.',
    description:
      'App de acompanhamento de treino com cadastro aberto, em que cada pessoa vê apenas os próprios dados. O registro é feito série a série, com carga, repetições e a comparação com a última vez, e o treino em andamento fica salvo no banco — sair da tela não perde nada. A aba de estatísticas acompanha volume por semana, evolução por exercício e recordes.',
    stack: ['React', 'TypeScript', 'Supabase', 'Vercel'],
    url: 'https://vibetraining.vercel.app/',
    repo: 'https://github.com/alv4roso4res/app-treino',
    media: [
      {
        kind: 'image',
        src: '/projects/app-treino/hero.png',
        alt: 'Tela inicial com os cards das rotinas de treino',
      },
      {
        kind: 'video',
        src: '/projects/app-treino/demo.mp4',
        poster: '/projects/app-treino/hero.png',
        alt: 'Demonstração do registro de uma série e da aba de estatísticas',
      },
    ],
  },
  {
    slug: 'anajulia-niver',
    name: 'Ana Júlia - 1 aninho',
    tagline: 'Site comemorativo de primeiro aniversário.',
    description:
        'Site comemorativo criado para o primeiro aniversário da Ana Júlia. Reúne o convite, as informações da festa e as fotos em uma única página. Foi pensado para abrir rápido no celular, que é por onde os convidados acessam.',
    stack: ['TypeScript', 'Vite', 'Vercel'],
    url: 'https://anajulia-niver.vercel.app/',
    repo: 'https://github.com/alv4roso4res/anajulia-niver',
    media: [
      {
        kind: 'image',
        src: '/projects/anajulia-niver/hero.png',
        alt: 'Página inicial do site de aniversário da Ana Júlia',
      },
      {
        kind: 'video',
        src: '/projects/anajulia-niver/demo.mp4',
        poster: '/projects/anajulia-niver/hero.png',
        alt: 'Demonstração da navegação pelo site de aniversário',
      },
    ],
  },
  {
    slug: 'sistema-de-pedidos',
    name: 'Sistema de Pedidos',
    tagline: 'API REST de pedidos para lojas, com catálogo, clientes e pagamentos.',
    description:
      'API REST para gerenciar pedidos de uma loja: clientes, produtos organizados por categoria, itens de cada pedido e o pagamento associado. O ciclo do pedido é modelado por status, de aguardando pagamento até entregue ou cancelado. Acompanha documentação da API pelo Swagger e um painel administrativo em HTML e JavaScript, ainda em progresso.',
    stack: ['Java', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL'],
    // sem deploy publicado: o botão "ver ao vivo" não aparece neste projeto
    repo: 'https://github.com/alv4roso4res/sistemadepedidos',
    media: [
      {
        kind: 'image',
        src: '/projects/sistema-de-pedidos/hero.png',
        alt: 'Painel administrativo do sistema de pedidos',
      },
      {
        kind: 'image',
        src: '/projects/sistema-de-pedidos/pedidos.png',
        alt: 'Listagem de pedidos com cliente, status e valor',
      },
    ],
  }
];
