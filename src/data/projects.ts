export type CaseImage = { src: string; alt: string; caption?: string; fullSizeLink?: boolean }
export type CaseSectionId = 'context' | 'challenge' | 'participation' | 'objective' | 'process' | 'wireframes' | 'identity' | 'mascot' | 'solution' | 'learnings' | 'retrospective' | 'recognition' | 'journey' | 'validation'
export type CaseSection = {
  text: string
  images: CaseImage[]
  title?: string
  eyebrow?: string
  pendingImage?: string
  items?: string[]
  steps?: { title: string; text: string }[]
  gallery?: boolean
  animation?: { src: string; poster: string; alt: string }
  pendingScreenshots?: string[]
  question?: string
  sources?: { label: string; url: string }[]
}
export type Project = {
  slug: string
  name: string
  description: string
  subtitle?: string
  eyebrow?: string
  tags?: string[]
  logo?: CaseImage
  heroImage?: CaseImage
  heroDecoration?: string
  toolsDescription?: string
  hideEmptyFields?: boolean
  relatedDescription?: string
  originalUrl?: string
  relatedSlugs?: string[]
  status?: string
  accent?: 'blue' | 'urban'
  sectionOrder?: CaseSectionId[]
  reflection?: { title: string; text: string }
  card: { kind: string; style: string; description: string }
  type: string
  tools: string[]
  period: string
  role: string
  cover: CaseImage | null
  sections: Partial<Record<CaseSectionId, CaseSection>>
}

// Preencha os campos vazios com informações confirmadas e caminhos de imagens em public/.
// Cada projeto recebe seus próprios campos; os textos dos cards existentes são preservados.
const emptyCase = () => ({
  type: '', tools: [] as string[], period: '', role: '', cover: null,
  sections: {
    context: { text: '', images: [] },
    objective: { text: '', images: [] },
    process: { text: '', images: [] },
    wireframes: { text: '', images: [] },
    solution: { text: '', images: [] },
    learnings: { text: '', images: [] },
  },
})

const portalRepository = 'https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2026-1-e2-proj-int-t6-pmv-ads-2026-1-e2-proj-int-t6-p-urbano'
const portalSource = (path: string) => `${portalRepository}/blob/main/${encodeURI(path)}`

export const projects: Project[] = [
  {
    slug: 'pausa-azul', name: 'Pausa Azul',
    description: 'Projeto acadêmico desenvolvido em equipe para incentivar a leitura por meio de organização, acompanhamento de progresso e gamificação.',
    card: { kind: 'WEBSITE · BEM-ESTAR', style: 'pause', description: 'Um respiro na rotina. Um olhar mais gentil para o bem-estar no trabalho.' },
    ...emptyCase(),
    eyebrow: 'PRIMEIRO PROJETO · 2025',
    subtitle: 'Uma experiência para transformar a leitura em hábito.',
    tags: ['UX/UI Design', 'Identidade Visual', 'Ilustração Digital', 'HTML', 'CSS', 'JavaScript'],
    logo: { src: '/projects/pausa-azul/logo-pausa-azul.png', alt: 'Logo do Pausa Azul com uma coruja ilustrada' },
    originalUrl: 'https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2025-2-e1-proj-web-t6-ads-2025-projeto-pausa-azul-grupo1/codigo-fonte/home/',
    relatedSlugs: ['portal-urbano', 'agenda-facil'],
    period: '2025',
    status: 'Projeto acadêmico em equipe · Primeiras experiências com UX/UI',
    accent: 'blue',
    type: 'Projeto acadêmico · Plataforma web',
    tools: ['HTML', 'CSS', 'JavaScript'],
    role: 'UX/UI, identidade visual, ilustrações, organização, implementação básica e participação nos testes, em equipe.',
    sectionOrder: ['challenge', 'participation', 'process', 'mascot', 'solution', 'learnings', 'retrospective'],
    sections: {
      context: {
        title: 'Visão geral',
        text: 'O Pausa Azul foi meu primeiro projeto acadêmico de desenvolvimento web e uma das minhas primeiras experiências práticas com UX/UI Design. Desenvolvido em equipe, foi uma oportunidade de participar da construção de uma aplicação com HTML, CSS e JavaScript.\n\nContribuí com wireframes, padronização das interfaces, identidade visual, mascote, organização do projeto e atividades básicas de implementação.',
        images: [],
      },
      challenge: {
        title: 'Como tornar a leitura mais envolvente?',
        text: 'A proposta era facilitar a organização dos livros e tornar o acompanhamento da leitura mais motivador. O Pausa Azul conecta biblioteca, progresso e gamificação para apoiar a construção do hábito de ler.',
        images: [],
      },
      participation: {
        title: 'Minha participação',
        text: 'O Pausa Azul foi construído em equipe. Como uma das minhas primeiras experiências práticas com UX/UI e desenvolvimento web, contribuí nas seguintes atividades:',
        items: [
          'Wireframes e estruturação de interfaces.',
          'Identidade visual e ilustrações.',
          'Padronização de componentes.',
          'Organização do projeto e colaboração com a equipe.',
          'Implementação básica em HTML, CSS e JavaScript.',
          'Participação nos testes.',
        ],
        images: [],
      },
      objective: {
        title: 'Objetivo',
        text: 'Facilitar o acompanhamento da jornada de leitura, conectando organização de livros, progresso e conquistas em um só lugar.',
        images: [],
      },
      process: {
        title: 'Processo de UX/UI',
        text: 'Da organização da proposta à construção das interfaces, o processo conectou decisões de design e desenvolvimento em equipe.',
        steps: [
          { title: 'Entendimento do problema e requisitos', text: 'Organizar o que a plataforma precisava oferecer para apoiar a jornada de leitura.' },
          { title: 'Organização de fluxos', text: 'Estruturar os caminhos de navegação e as relações entre funcionalidades.' },
          { title: 'Wireframes e interfaces', text: 'Trabalhar a disposição das informações e a padronização dos elementos de interface.' },
          { title: 'Identidade visual e desenvolvimento', text: 'Conectar linguagem visual, ilustrações e implementação em HTML, CSS e JavaScript.' },
        ],
        images: [],
      },
      identity: {
        text: 'A identidade visual reúne azul, dourado, tipografia e a mascote Bloom. Participei da construção dessa identidade e da padronização das interfaces para manter uma linguagem visual consistente entre as telas.',
        images: [],
      },
      mascot: {
        title: 'Conheça a Bloom',
        text: 'A Bloom faz parte da identidade visual do Pausa Azul. A coruja aparece no logo e em ilustrações com diferentes acessórios, reunidas aqui em suas versões originais. Minha participação incluiu a identidade visual e as ilustrações do projeto.',
        gallery: true,
        animation: { src: '/projects/pausa-azul/bloom-animado.gif', poster: '/projects/pausa-azul/bloom-original.jpeg', alt: 'Bloom, a mascote do Pausa Azul' },
        images: [
          { src: '/projects/pausa-azul/bloom-original.jpeg', alt: 'Bloom em sua versão original, uma coruja azul de óculos.', caption: 'Bloom original' },
          { src: '/projects/pausa-azul/bloom-bigode.png', alt: 'Bloom com chapéu e bigode.', caption: 'Bloom de bigode' },
          { src: '/projects/pausa-azul/bloom-lacinho.png', alt: 'Bloom com um laço rosa.', caption: 'Bloom de lacinho' },
          { src: '/projects/pausa-azul/bloom-perfil.jpg', alt: 'Bloom com cachecol colorido e uma marca de raio na testa.', caption: 'Bloom de perfil' },
        ],
      },
      solution: {
        title: 'Solução',
        text: 'Uma plataforma para reunir os livros, acompanhar a jornada de leitura e registrar experiências. A proposta se organiza em cinco funcionalidades:',
        items: ['Biblioteca organizada por status.', 'Acompanhamento de progresso.', 'Gamificação e conquistas.', 'Perfil do usuário.', 'Avaliações e resenhas.'],
        images: [],
        pendingScreenshots: ['Biblioteca por status', 'Progresso de leitura', 'Gamificação e conquistas', 'Perfil do usuário', 'Avaliações e resenhas'],
      },
      learnings: {
        title: 'Meu primeiro projeto. Muitos aprendizados.',
        text: 'O Pausa Azul marcou meu primeiro contato prático com a construção de uma aplicação web. Na época, eu ainda estava desenvolvendo meus conhecimentos de UX/UI e front-end. Hoje consigo identificar oportunidades de melhoria na hierarquia visual, na usabilidade e na organização dos componentes. Esse projeto representa o início da minha evolução como designer.',
        images: [],
      },
      retrospective: {
        title: 'O que eu faria diferente hoje?',
        text: 'Em uma avaliação retrospectiva, eu revisaria a hierarquia para destacar informações prioritárias e organizaria componentes para dar mais consistência às interfaces. Também planejaria uma validação de usabilidade para observar dificuldades nos fluxos e orientar as próximas decisões.\n\nSão oportunidades de evolução que identifico hoje, não melhorias já implementadas ou novos testes realizados.',
        images: [],
      },
    },
  },
  {
    slug: 'portal-urbano', name: 'Portal Urbano',
    description: 'O Portal Urbano é uma plataforma web desenvolvida em equipe durante o Eixo 2 do curso de Análise e Desenvolvimento de Sistemas da PUC Minas. O projeto busca facilitar o registro, a visualização e a consulta de ocorrências urbanas, reunindo informações relevantes em uma experiência mais organizada e acessível.',
    relatedDescription: 'Plataforma para registro e acompanhamento de ocorrências urbanas.',
    card: { kind: 'WEB · CIDADANIA', style: 'urban', description: 'Conexões entre pessoas e cidade para pensar espaços mais humanos.' },
    ...emptyCase(),
    eyebrow: 'PROJETO ACADÊMICO · PUC MINAS · 2026',
    subtitle: 'Tecnologia para aproximar cidadãos dos desafios da cidade.',
    tags: ['UX Design', 'Experiência de Produto', 'Fluxos de Usuário', 'Desenvolvimento Web'],
    status: 'Segundo projeto acadêmico · PUC Minas · Trabalho em equipe',
    accent: 'urban',
    hideEmptyFields: true,
    logo: { src: '/projects/portal-urbano/logo-portal-urbano.png', alt: 'Símbolo do Portal Urbano: marcador de localização com um trabalhador' },
    heroImage: { src: '/projects/portal-urbano/banner-cidade.png', alt: 'Vista da cidade ao anoitecer, com edifícios e luzes urbanas' },
    type: 'Projeto acadêmico em equipe',
    tools: ['C#', 'ASP.NET Core MVC', 'Entity Framework Core', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    toolsDescription: 'ASP.NET Core MVC, C#, HTML, CSS, JavaScript e ferramentas de documentação e prototipação utilizadas no projeto.',
    period: '1º semestre de 2026 · Eixo 2',
    role: 'UX, experiência de produto, fluxos de usuário, documentação e colaboração no desenvolvimento.',
    sectionOrder: ['context', 'objective', 'process', 'journey', 'solution', 'participation', 'validation', 'recognition', 'learnings'],
    sections: {
      recognition: {
        eyebrow: 'RECONHECIMENTO ACADÊMICO',
        title: 'Projeto Destaque do Eixo 2.',
        text: 'O Portal Urbano recebeu o reconhecimento de Projeto Destaque do Eixo 2, no primeiro semestre de 2026, pela PUC Minas. A conquista reconheceu o trabalho coletivo da equipe, sua dedicação e o desenvolvimento da solução apresentada.',
        images: [{
          src: '/projects/portal-urbano/certificado-projeto-destaque-redigido.jpeg',
          alt: 'Certificado redigido da PUC Minas que reconhece o Portal Urbano como Projeto Destaque do Eixo 2 no primeiro semestre de 2026.',
          caption: 'Reconhecimento institucional ao trabalho coletivo da equipe · PUC Minas, 2026.',
          fullSizeLink: true,
        }],
      },
      context: {
        title: 'Quando os problemas da cidade precisam ser vistos.',
        text: 'Problemas urbanos, como buracos nas vias, falhas na iluminação pública e outras ocorrências de infraestrutura, fazem parte do cotidiano das cidades. Entretanto, registrar e consultar essas situações pode envolver informações dispersas e caminhos pouco claros para o cidadão.\n\nPartindo desse cenário, desenvolvemos o Portal Urbano como uma proposta acadêmica para organizar registros de ocorrências e facilitar o acesso às informações.',
        question: 'Como tornar o registro e a consulta de ocorrências urbanas mais simples, claros e acessíveis?',
        images: [],
      },
      objective: {
        title: 'Organizar informações para facilitar a participação.',
        text: 'O objetivo do Portal Urbano foi desenvolver uma aplicação web que permitisse aos usuários registrar ocorrências urbanas, visualizar relatos existentes e consultar informações de maneira estruturada.',
        items: ['Facilitar o registro de ocorrências.', 'Organizar a visualização dos relatos.', 'Tornar a navegação e a consulta mais intuitivas.'],
        images: [],
      },
      process: {
        title: 'Antes das telas, a jornada do usuário.',
        text: 'Neste projeto, meu foco esteve principalmente na experiência do produto: compreender como as pessoas navegariam pela plataforma, quais informações precisariam encontrar e quais etapas seriam necessárias para concluir suas tarefas.',
        steps: [
          { title: 'Entendimento do problema', text: 'Análise do contexto, dos requisitos e das necessidades que o produto deveria atender.' },
          { title: 'Estruturação da experiência', text: 'Organização dos caminhos de navegação, histórias de usuário e funcionalidades.' },
          { title: 'Fluxos e casos de uso', text: 'Representação das interações e das etapas necessárias para registrar e consultar ocorrências.' },
          { title: 'Desenvolvimento e validação', text: 'Colaboração com a equipe na implementação, documentação e avaliação do funcionamento da solução.' },
        ],
        images: [],
      },
      participation: {
        title: 'Minha contribuição para o produto.',
        text: 'O Portal Urbano foi desenvolvido em equipe, e minha participação esteve ligada principalmente à estruturação da experiência do usuário e à organização do produto.',
        items: ['Elaboração e organização de fluxos de usuário.', 'Participação na definição de casos de uso.', 'Contribuição com documentação e diagramas.', 'Planejamento e participação em testes.', 'Organização de atividades e alinhamentos da equipe.', 'Colaboração nas atividades de desenvolvimento.'],
        images: [],
      },
      journey: {
        title: 'Do problema identificado ao registro na plataforma.',
        text: 'Este fluxo conceitual resume o caminho principal do produto, com base na autenticação, no formulário de denúncia e nas visualizações presentes no código. O formulário solicita título, categoria e endereço, e permite complementar o relato com descrição e imagens.',
        steps: [
          { title: 'Identificar', text: 'Reconhecer uma ocorrência urbana que precisa ser registrada.' },
          { title: 'Acessar', text: 'Cadastrar-se ou fazer login para iniciar uma denúncia.' },
          { title: 'Iniciar o registro', text: 'Acessar a opção de criar uma nova denúncia.' },
          { title: 'Informar', text: 'Preencher título, categoria e endereço, com descrição e imagens para contextualizar a ocorrência.' },
          { title: 'Publicar e visualizar', text: 'Enviar o registro para validação e moderação. Quando publicado, consultá-lo no feed e, com coordenadas válidas, no mapa.' },
        ],
        images: [],
      },
      solution: {
        title: 'Uma plataforma para visualizar e compartilhar ocorrências.',
        text: 'A solução reúne recursos para organizar relatos urbanos e permitir que os usuários naveguem entre diferentes ocorrências, consultem detalhes e compartilhem informações relevantes sobre os problemas registrados.',
        items: [
          'Registro de ocorrências com título, categoria, endereço, descrição e envio de imagens.',
          'Feed de ocorrências com imagens, informações da publicação e ordenação por interações.',
          'Mapa interativo com marcadores para ocorrências georreferenciadas.',
          'Detalhes no feed e nos marcadores do mapa, incluindo descrição, imagem e data.',
          'Filtro por categoria no feed; busca por texto e categoria no mapa.',
          'Perfil com as próprias publicações, edição de dados e exclusão de denúncias do usuário.',
          'Curtidas, comentários e reporte de postagens inadequadas.',
        ],
        sources: [
          { label: 'Código do feed', url: portalSource('src/PortalUrbano/Views/Home/Feed.cshtml') },
          { label: 'Código do mapa', url: portalSource('src/PortalUrbano/Views/Home/Index.cshtml') },
          { label: 'Registro e interações', url: portalSource('src/PortalUrbano/Controllers/DenunciaController.cs') },
          { label: 'Conta e perfil', url: portalSource('src/PortalUrbano/Controllers/AccountController.cs') },
        ],
        // Adicionar apenas capturas reais da aplicação atual.
        // A galeria só é renderizada quando há imagens; sem placeholders publicados.
        images: [],
      },
      validation: {
        title: 'Validar também faz parte de projetar.',
        text: 'Durante o desenvolvimento, a equipe realizou atividades de avaliação e testes para verificar o funcionamento da aplicação e identificar oportunidades de melhoria na experiência.\n\nOs registros da equipe documentam testes com cinco participantes, com diferentes níveis de familiaridade com tecnologia. Foram avaliados cadastro, login, recuperação de senha, mapa, feed, criação de denúncias, perfil e compreensão dos avisos de moderação.\n\nO plano previa observação das tarefas e questionário pós-teste. O registro disponível apresenta tempo, cliques, conclusão, erros e feedback por cenário; não detalha a aplicação do questionário.',
        items: [
          'Dificuldades observadas: encontrar botões e filtros, ler textos e ícones pequenos e compreender algumas mensagens de advertência.',
          'No registro de denúncias, houve dificuldade com anexos e CEP. Algumas tarefas no mapa, feed e perfil foram concluídas apenas parcialmente, com relatos de necessidade de auxílio.',
          'Aprendizado: tarefas concluídas não eliminam barreiras de uso. Clareza das ações, legibilidade e orientação nos formulários precisam ser avaliadas junto ao funcionamento técnico.',
          'Oportunidades futuras: tornar filtros e ações mais visíveis, revisar textos de ajuda e mensagens e validar os fluxos com diferentes perfis. Essas melhorias não são apresentadas como já implementadas.',
        ],
        sources: [
          { label: 'Plano de testes de usabilidade', url: portalSource('docs/10-Plano de Testes de Usabilidade.md') },
          { label: 'Registro de testes de usabilidade', url: portalSource('docs/11-Registro de Testes de Usabilidade.md') },
        ],
        images: [],
      },
      learnings: {
        title: 'Da interface à experiência do produto.',
        text: 'Depois do Pausa Azul, o Portal Urbano ampliou minha compreensão sobre o desenvolvimento de produtos digitais. Passei a olhar com mais atenção para os fluxos, os requisitos, a organização das funcionalidades e a relação entre experiência do usuário e implementação.\n\nEsse projeto reforçou algo que levo para minha atuação em UX/UI: uma boa experiência começa antes do desenho das telas, quando buscamos compreender as necessidades das pessoas e estruturar caminhos que façam sentido para elas.',
        images: [],
      },
    },
  },
  {
    slug: 'agenda-facil', name: 'Agenda Fácil',
    description: 'Aplicativo de agendamento de serviços de salão.',
    card: { kind: 'APP · ORGANIZAÇÃO', style: 'agenda', description: 'Mais clareza para organizar o dia e abrir espaço para o que importa.' },
    ...emptyCase(),
  },
]

export const projectPath = (slug: string) => `/projetos/${slug}`
