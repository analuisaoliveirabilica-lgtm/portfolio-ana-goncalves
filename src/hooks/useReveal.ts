import { useEffect } from 'react';

const ROOT_CLASS = 'reveal-on';

/**
 * Fades `.reveal` elements in once, as they enter the viewport.
 * Elements are only hidden after this adds `reveal-on` to <html>,
 * so nothing disappears if JavaScript fails.
 */
export function useReveal() {
    useEffect(() => {
        const root = document.documentElement;
        const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
            elements.forEach(el => el.classList.add('is-visible'));
            return;
        }
        root.classList.add(ROOT_CLASS);
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12 });
        elements.forEach(el => observer.observe(el));
        return () => {
            observer.disconnect();
            root.classList.remove(ROOT_CLASS);
        };
    }, []);
}
