import { useEffect } from 'react';
import type { RefObject } from 'react';

/** Shrinks and dims each sticky card as the following cards slide over it. */
export function useStackDepth(ref: RefObject<HTMLElement | null>) {
    useEffect(() => {
        const stack = ref.current;
        if (!stack) return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        let frame = 0;

        const measure = () => {
            frame = 0;
            const items = Array.from(stack.children) as HTMLElement[];
            if (reduced.matches) {
                items.forEach(el => {
                    const card = el.firstElementChild as HTMLElement | null;
                    if (card) { card.style.transform = ''; card.style.filter = ''; }
                });
                return;
            }
            // Difference between consecutive sticky "top" values.
            const step = window.innerWidth <= 860 ? 16 : 24;
            const rects = items.map(el => el.getBoundingClientRect());
            items.forEach((el, i) => {
                let cover = 0;
                for (let j = i + 1; j < items.length; j++) {
                    const d = rects[j].top - (rects[i].top + (j - i) * step);
                    cover += Math.min(1, Math.max(0, 1 - d / (rects[i].height || 1)));
                }
                const card = el.firstElementChild as HTMLElement | null;
                if (!card) return;
                card.style.transform = `scale(${1 - cover * 0.05})`;
                card.style.filter = `brightness(${1 - cover * 0.09})`;
            });
        };
        const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };

        measure();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        reduced.addEventListener('change', schedule);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            reduced.removeEventListener('change', schedule);
        };
    }, [ref]);
}
