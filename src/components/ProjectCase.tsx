import { Link } from 'react-router-dom'
import { useState } from 'react'
import { projects, projectPath } from '../data/projects'
import type { CaseImage, CaseSectionId, Project } from '../data/projects'
import './ProjectCase.css'

const sections: { id: CaseSectionId; title: string; hint: string }[] = [
  { id: 'context', title: 'Contexto e problema', hint: 'Descrever o contexto e o problema abordado.' },
  { id: 'objective', title: 'Objetivo do projeto', hint: 'Registrar o objetivo e o escopo do projeto.' },
  { id: 'process', title: 'Processo de UX', hint: 'Documentar as etapas realizadas e suas evidências.' },
  { id: 'wireframes', title: 'Wireframes e decisões de UI', hint: 'Adicionar wireframes e explicar as decisões de interface.' },
  { id: 'solution', title: 'Solução final', hint: 'Apresentar as telas e os fluxos da solução.' },
  { id: 'learnings', title: 'Resultados e aprendizados', hint: 'Registrar apenas resultados verificados e aprendizados reais.' },
  { id: 'challenge', title: 'O desafio', hint: 'Descrever o desafio do projeto.' },
  { id: 'participation', title: 'Minha participação', hint: 'Descrever as contribuições no trabalho em equipe.' },
  { id: 'identity', title: 'Identidade visual', hint: 'Apresentar a identidade visual original.' },
  { id: 'mascot', title: 'Conheça a Bloom', hint: 'Apresentar a mascote do projeto.' },
  { id: 'retrospective', title: 'O que eu faria diferente hoje', hint: 'Registrar uma avaliação retrospectiva.' },
  { id: 'recognition', title: 'Reconhecimento acadêmico', hint: 'Apresentar o reconhecimento documentado.' },
  { id: 'journey', title: 'Experiência de produto', hint: 'Apresentar a jornada do usuário.' },
  { id: 'validation', title: 'Validação e testes', hint: 'Apresentar as evidências de validação.' },
]
const defaultSectionOrder: CaseSectionId[] = ['context', 'objective', 'process', 'wireframes', 'solution', 'learnings']

function CaseFigure({ image, cover = false }: { image: CaseImage; cover?: boolean }) {
  return <figure className="case-figure">
    <img src={image.src} alt={image.alt} loading={cover ? 'eager' : 'lazy'} />
    {image.caption && <figcaption>{image.caption}</figcaption>}
    {image.fullSizeLink && <a className="case-image-link" href={image.src} target="_blank" rel="noopener noreferrer">Abrir imagem em tamanho original <span className="case-sr-only">(abre em nova aba)</span><span aria-hidden="true">↗</span></a>}
  </figure>
}

function CaseAnimation({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  // Start still: animation is opt-in, including for reduced-motion users.
  const [playing, setPlaying] = useState(false)
  return <figure className="case-animation">
    <img src={playing ? src : poster} alt={alt} loading="lazy" />
    <figcaption><p>Bloom em movimento</p><button type="button" aria-pressed={playing} onClick={() => setPlaying(value => !value)}>{playing ? 'Parar animação' : 'Reproduzir animação'}</button></figcaption>
  </figure>
}

export function ProjectCase({ project, nextProject }: { project: Project; nextProject: Project }) {
  const visibleSections = (project.sectionOrder ?? defaultSectionOrder).map(id => sections.find(section => section.id === id)!)
  const relatedProjects = project.relatedSlugs?.flatMap(slug => projects.filter(item => item.slug === slug)) ?? []
  const facts = [
    ['Tipo de projeto', project.type], [project.toolsDescription ? 'Ferramentas e tecnologias' : 'Ferramentas', project.toolsDescription ?? project.tools.join(', ')],
    ['Período', project.period], ['Minha atuação', project.role],
  ]

  return <main id="conteudo" className="project-case container" data-accent={project.accent} tabIndex={-1}>
    <nav className="case-breadcrumb" aria-label="Breadcrumb">
      <ol><li><Link to="/">Início</Link></li><li><Link to="/#projetos">Projetos</Link></li><li aria-current="page">{project.name}</li></ol>
    </nav>
    <header className={`case-hero${project.logo ? ' case-hero-branded' : ''}${project.heroDecoration ? ' case-hero-decorated' : ''}`}>
      <div className="case-hero-copy">
      <p className="eyebrow">{project.eyebrow ?? 'ESTUDO DE CASO / UX/UI DESIGN'}</p>
      <h1>{project.name}</h1>
      {project.subtitle && <p className="case-subtitle">{project.subtitle}</p>}
      <p className="case-description">{project.description}</p>
      {(project.status || !project.hideEmptyFields) && <p className="case-draft">{project.status ?? 'Case em preparação · Conteúdo a preencher.'}</p>}
      {project.tags && <ul className="case-tags" aria-label="Áreas e tecnologias do projeto">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
      </div>
      {project.heroImage ? <div className="case-city-art"><img className="case-city-photo" src={project.heroImage.src} alt={project.heroImage.alt} />{project.logo && <div className="case-city-mark"><img src={project.logo.src} alt={project.logo.alt} /><span aria-hidden="true">Portal Urbano</span></div>}</div> : project.logo && <div className="case-brand-art"><img src={project.logo.src} alt={project.logo.alt} /><span className="case-brand-rule" aria-hidden="true" /></div>}
      {project.heroDecoration && <img className="case-hero-cat" src={project.heroDecoration} alt="" aria-hidden="true" draggable={false} />}
    </header>
    {project.cover ? <CaseFigure image={project.cover} cover /> : !project.hideEmptyFields && !project.logo && !project.heroImage && <div className="case-cover-placeholder"><span className="eyebrow">IMAGEM DE CAPA</span><p>Espaço reservado para a apresentação do projeto.</p></div>}
    <dl className="case-facts">{facts.filter(([, value]) => !project.hideEmptyFields || value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value || 'A preencher'}</dd></div>)}</dl>
    <div className="case-sections">{visibleSections.map(({ id, title, hint }, index) => <section className="case-section" data-section={id} key={id} aria-labelledby={`case-${id}`}>
      <div><p className="eyebrow">0{index + 1}{project.sections[id]?.eyebrow && ` / ${project.sections[id].eyebrow}`}</p><h2 id={`case-${id}`}>{project.sections[id]?.title ?? title}</h2></div>
      <div className="case-section-body">
        {project.sections[id]?.text ? <p className="case-copy">{project.sections[id].text}</p> : !project.hideEmptyFields && <p className="case-placeholder"><span>A preencher</span>{hint}</p>}
        {project.sections[id]?.items && <ul className="case-contributions">{project.sections[id].items.map(item => <li key={item}>{item}</li>)}</ul>}
        {project.sections[id]?.question && <p className="case-design-question">{project.sections[id].question}</p>}
        {project.sections[id]?.sources && <div className="case-sources"><p className="eyebrow">DOCUMENTAÇÃO E EVIDÊNCIAS</p><ul>{project.sections[id].sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<span className="case-sr-only"> (abre em nova aba)</span><span aria-hidden="true"> ↗</span></a></li>)}</ul></div>}
      </div>
      {project.sections[id]?.steps && <ol className="case-media case-steps">{project.sections[id].steps.map((step, stepIndex) => <li key={step.title}><span className="eyebrow" aria-hidden="true">0{stepIndex + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>}
      {project.sections[id]?.animation && <div className="case-media"><CaseAnimation {...project.sections[id].animation} /></div>}
      {!!project.sections[id]?.images.length && <div className={`case-media${project.sections[id]?.gallery ? ' case-gallery' : ''}`}>{project.sections[id].images.map(image => <CaseFigure key={image.src} image={image} />)}</div>}
      {!project.hideEmptyFields && project.sections[id]?.pendingImage && !project.sections[id]?.images.length && <div className="case-media case-image-placeholder"><p className="eyebrow">IMAGEM A ADICIONAR</p><p>{project.sections[id].pendingImage}</p></div>}
      {!project.hideEmptyFields && !!project.sections[id]?.pendingScreenshots?.length && !project.sections[id]?.images.length && <div className="case-media"><p className="case-gallery-note">As capturas reais da solução serão adicionadas nesta galeria.</p><ul className="case-screenshot-slots">{project.sections[id].pendingScreenshots.map(label => <li key={label}><span className="eyebrow">SCREENSHOT A ADICIONAR</span><p>{label}</p></li>)}</ul></div>}
    </section>)}</div>
    {project.reflection && <aside className="case-reflection" aria-labelledby="case-reflection-title"><p className="eyebrow">REFLEXÃO RETROSPECTIVA</p><h2 id="case-reflection-title">{project.reflection.title}</h2><p>{project.reflection.text}</p></aside>}
    <nav className="case-pagination" aria-label="Navegação entre projetos">
      <Link className={project.originalUrl ? 'button case-return' : 'text-link'} to="/#projetos">← Voltar aos projetos</Link>
      {project.originalUrl && <a className="button case-original" href={project.originalUrl} target="_blank" rel="noopener noreferrer">Ver projeto original <span aria-hidden="true">↗</span><span className="case-sr-only"> (abre em nova aba)</span></a>}
      <Link className="case-next" to={projectPath(nextProject.slug)}><span className="eyebrow">PRÓXIMO PROJETO</span><span>{nextProject.name} <span aria-hidden="true">→</span></span></Link>
    </nav>
    {relatedProjects.length > 0 && <section className="case-related" aria-labelledby="case-related-title"><p className="eyebrow">CONTINUE EXPLORANDO</p><h2 id="case-related-title">Trabalhos relacionados</h2><div>{relatedProjects.map(item => <Link to={projectPath(item.slug)} key={item.slug}><h3>{item.name}</h3><p>{item.relatedDescription ?? item.description}</p><span className="text-link">Ver case <span aria-hidden="true">→</span></span></Link>)}</div></section>}
  </main>
}
