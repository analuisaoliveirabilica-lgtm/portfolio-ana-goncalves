import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { Arrow } from './Decorations';
import './Header.css';

function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
    const { pathname } = useLocation();
    if (pathname !== '/') return <>
        <Link to="/#projetos" onClick={onNavigate}>Projetos</Link>
        <Link to="/#processo" onClick={onNavigate}>Processo</Link>
        <Link to="/#sobre" onClick={onNavigate}>Sobre mim</Link>
        <Link className="button button-small" to="/#contato" onClick={onNavigate}>Vamos conversar? <Arrow /></Link>
    </>;
    return <>
        <a href="#projetos" onClick={onNavigate}>Projetos</a>
        <a href="#processo" onClick={onNavigate}>Processo</a>
        <a href="#sobre" onClick={onNavigate}>Sobre mim</a>
        <a className="button button-small" href="#contato" onClick={onNavigate}>Vamos conversar? <Arrow /></a>
    </>;
}

export function Header() {
    const [phase, setPhase] = useState<'closed' | 'open' | 'closing'>('closed');
    const dialogRef = useRef<HTMLDialogElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const active = phase !== 'closed';

    useEffect(() => {
        if (!active) return;
        const dialog = dialogRef.current;
        if (!dialog) return;
        const overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        dialog.showModal(); // Native modal keeps focus inside and makes the page inert.
        return () => {
            dialog.close();
            document.body.style.overflow = overflow;
            triggerRef.current?.focus({ preventScroll: true });
        };
    }, [active]);

    useEffect(() => {
        const mobile = window.matchMedia('(max-width: 700px)');
        const onChange = () => {
            if (!mobile.matches) {
                clearTimeout(timerRef.current);
                setPhase('closed');
            }
        };
        mobile.addEventListener('change', onChange);
        return () => {
            clearTimeout(timerRef.current);
            mobile.removeEventListener('change', onChange);
        };
    }, []);

    const close = () => {
        if (phase !== 'open') return;
        setPhase('closing');
        const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 280;
        timerRef.current = setTimeout(() => setPhase('closed'), delay);
    };

    const containFocus = (event: KeyboardEvent<HTMLDialogElement>) => {
        if (event.key !== 'Tab') return;
        const items = event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]');
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
        }
    };

    return <>
        <header className="site-header container" id="inicio">
            <Link className="wordmark" to="/" aria-label="Página inicial"><img src="/images/logo-ana.png" alt="Logo Ana" /></Link>
            <button ref={triggerRef} className="menu-toggle" aria-label="Abrir menu de navegação" aria-haspopup="dialog" aria-expanded={active} aria-controls="mobile-navigation" onClick={() => setPhase('open')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <nav id="navigation" className="navigation" aria-label="Navegação principal"><NavigationLinks /></nav>
        </header>
        {createPortal(<dialog ref={dialogRef} id="mobile-navigation" className="mobile-drawer" data-phase={phase} aria-label="Menu de navegação" onKeyDown={containFocus} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
            <div className="drawer-panel">
                <button className="drawer-close" aria-label="Fechar menu de navegação" onClick={close} autoFocus>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
                </button>
                <nav className="drawer-links" aria-label="Navegação mobile"><NavigationLinks onNavigate={close} /></nav>
            </div>
        </dialog>, document.body)}
    </>;
}
