# Portfólio — Ana Luísa Gonçalves

Portfólio pessoal de UI/UX Design e desenvolvimento de interfaces, criado para apresentar projetos, processo de trabalho e estudos de caso.

## Conteúdo

- Home com apresentação, projetos em destaque, processo criativo, seção sobre e contato.
- Estudos de caso para Pausa Azul, Portal Urbano e Agenda Fácil, acessíveis pelas rotas `/projetos/pausa-azul`, `/projetos/portal-urbano` e `/projetos/agenda-facil`.
- Navegação responsiva, carrossel de projetos em telas menores e mascote interativo na Home.

## Tecnologias

- React e React DOM
- TypeScript
- Vite
- React Router para navegação entre rotas
- CSS para estilos e responsividade
- Google Fonts: Manrope e DM Sans

## Requisitos

Tenha Node.js e npm instalados. As dependências e suas versões estão registradas em `package-lock.json`.

## Instalação e desenvolvimento

Na raiz do projeto, instale as dependências:

```bash
npm ci
```

Inicie o servidor local de desenvolvimento:

```bash
npm run dev
```

O Vite mostrará no terminal o endereço local para abrir no navegador.

## Build e pré-visualização

Para verificar os tipos e gerar a versão de produção:

```bash
npm run build
```

Os arquivos compilados são gravados em `dist/`. Para pré-visualizar essa versão localmente:

```bash
npm run preview
```

## Estrutura do projeto

- `src/components/` — seções, navegação, carrossel, cases e mascote.
- `src/data/projects.ts` — conteúdo estruturado dos projetos e estudos de caso.
- `src/App.tsx` — rotas da Home e dos estudos de caso.
- `src/` — aplicação, estilos e pontos de entrada.
- `public/` — imagens, ícones e outros arquivos servidos diretamente.
- `dist/` — saída gerada pelo build; não precisa ser versionada.

As páginas de case usam o componente `src/components/ProjectCase.tsx` e os dados em `src/data/projects.ts`. Imagens referenciadas nesses dados ficam em `public/`.

## Publicação na Netlify

O arquivo `netlify.toml` configura o comando `npm run build`, a pasta publicada `dist/` e o fallback de rotas SPA para `index.html`, necessário para acessar diretamente as rotas dos estudos de caso.
