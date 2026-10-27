import { Header, Hero, Projects, Process, About, Contact, Footer } from './components/Sections'
import './App.css'
import { useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { ProjectCase } from './components/ProjectCase'
import { projects } from './data/projects'

function Home() {
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header /><main id="conteudo"><Hero /><Projects /><Process /><About /><Contact /></main><Footer /></>
}

function CasePage() {
  const { slug } = useParams()
  const index = projects.findIndex(project => project.slug === slug)
  if (index < 0) return <NotFound />
  return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header /><ProjectCase project={projects[index]} nextProject={projects[(index + 1) % projects.length]} /><Footer /></>
}

function NotFound() {
  return <><Header /><main id="conteudo" className="project-case container" tabIndex={-1}><div className="case-hero"><h1>Página não encontrada</h1><Link className="button" to="/">Voltar ao início</Link></div></main><Footer /></>
}

function RouteNavigation() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const project = projects.find(item => pathname === `/projetos/${item.slug}`)
    document.title = project ? `${project.name} — Ana Gonçalves` : 'Ana Gonçalves — UI/UX Designer'
    const frame = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : document.querySelector<HTMLElement>('main')
      if (hash && target) target.scrollIntoView()
      else window.scrollTo({ top: 0, behavior: 'instant' })
      if (target) {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
  return null
}

export default function App() {
  return <BrowserRouter><RouteNavigation /><Routes><Route path="/" element={<Home />} /><Route path="/projetos/:slug" element={<CasePage />} /><Route path="*" element={<NotFound />} /></Routes></BrowserRouter>
}
