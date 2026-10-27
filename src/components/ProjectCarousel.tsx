import { Children, useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import './ProjectCarousel.css';

/** Native scrolling preserves touch gestures, text selection and card links. */
export function ProjectCarousel({ children }: { children: ReactNode }) {
    const count = Children.count(children);
    const id = useId();
    const viewportRef = useRef<HTMLDivElement>(null);
    const [mobile, setMobile] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;
        const media = window.matchMedia('(max-width: 700px)');
        let frame = 0;
        const measure = () => {
            frame = 0;
            if (!media.matches) return;
            const max = viewport.scrollWidth - viewport.clientWidth;
            if (max > 0 && viewport.scrollLeft >= max - 2) {
                setIndex(count - 1);
                return;
            }
            const left = viewport.getBoundingClientRect().left;
            const distances = Array.from(viewport.children, child => Math.abs(child.getBoundingClientRect().left - left));
            setIndex(distances.indexOf(Math.min(...distances)));
        };
        const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
        const change = () => {
            setMobile(media.matches);
            if (!media.matches) {
                viewport.scrollLeft = 0;
                setIndex(0);
            } else schedule();
        };
        change();
        const observer = new ResizeObserver(schedule);
        observer.observe(viewport);
        viewport.addEventListener('scroll', schedule, { passive: true });
        media.addEventListener('change', change);
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            viewport.removeEventListener('scroll', schedule);
            media.removeEventListener('change', change);
        };
    }, [count]);

    const navigate = (next: number) => {
        const viewport = viewportRef.current;
        if (!viewport) return;
        const target = Math.max(0, Math.min(count - 1, next));
        const card = viewport.children[target];
        if (!card) return;
        const left = card.getBoundingClientRect().left - viewport.getBoundingClientRect().left + viewport.scrollLeft;
        viewport.scrollTo({ left, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    };
    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!mobile || event.target !== event.currentTarget) return;
        const target = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: count - 1 }[event.key];
        if (target === undefined) return;
        event.preventDefault();
        navigate(target);
    };

    return <div className="project-carousel">
        <div ref={viewportRef} id={id} className="project-grid carousel-viewport" tabIndex={mobile ? 0 : undefined} role={mobile ? 'region' : undefined} aria-roledescription={mobile ? 'carrossel' : undefined} aria-label={mobile ? 'Projetos em destaque' : undefined} aria-describedby={mobile && count > 1 ? `${id}-hint` : undefined} onKeyDown={onKeyDown}>
            {children}
        </div>
        {count > 1 && <div className="carousel-controls">
            <p id={`${id}-hint`} className="carousel-hint">Deslize para explorar</p>
            <div className="carousel-navigation">
                <button type="button" onClick={() => navigate(index - 1)} disabled={index === 0} aria-label="Ver projeto anterior" aria-controls={id}><span aria-hidden="true">←</span></button>
                <span className="carousel-position" role="status" aria-live="polite" aria-atomic="true">{index + 1} de {count}</span>
                <button type="button" onClick={() => navigate(index + 1)} disabled={index === count - 1} aria-label="Ver próximo projeto" aria-controls={id}><span aria-hidden="true">→</span></button>
            </div>
        </div>}
    </div>;
}
