import './Footer.css';

const LINKEDIN_URL = 'https://www.linkedin.com/in/ana-luísa-gonçalves-94888935a';
const INSTAGRAM_URL = 'https://www.instagram.com/analuisa_gon/';

function SocialLinks() {
    const links = [
        { name: 'LinkedIn', url: LINKEDIN_URL, icon: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7m4 0v-7m0 3a3 3 0 0 1 6 0v4" /><circle cx="8" cy="7" r=".7" fill="currentColor" stroke="none" /></> },
        { name: 'Instagram', url: INSTAGRAM_URL, icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></> },
    ].filter(link => link.url.trim());
    if (!links.length) return null;
    return <nav className="footer-socials" aria-label="Redes profissionais">
        {links.map(link => <a key={link.name} className="footer-social-link" href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name + ' de Ana Luísa Gonçalves (abre em nova aba)'} title={link.name}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{link.icon}</svg>
        </a>)}
    </nav>;
}
export function Footer() {
    return <footer className="footer container"><a href="#inicio" className="wordmark" aria-label="Página inicial"><img src="/images/logo-ana.png" alt="Logo Ana" /></a><p>© {new Date().getFullYear()} · Feito com intenção e carinho.</p><SocialLinks /><a href="#inicio" className="back-top">Voltar ao topo <span aria-hidden="true">↑</span></a></footer>;
}
