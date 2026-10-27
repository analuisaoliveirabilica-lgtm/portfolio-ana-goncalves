import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './FloatingCat.css';

const FLYING = '/images/gatinhosaltando.png';
const SITTING = '/images/gatinhosentado2.png';
const RESTING = '/images/gatinhodescansando.png';
const IDLE_DELAY = 1500;
const DEPARTURE_DELAY = 250;
const CURSOR_GAP = 25;
const EDGE = 10;
type CatPose = 'resting' | 'flying' | 'sitting';

/** Decorative only: never captures focus, selection or pointer input. */
export function FloatingCat() {
    const homeRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const home = homeRef.current;
        const follower = followerRef.current;
        if (!home || !follower) return;

        // React may reuse these nodes when an effect is restarted (e.g. Fast Refresh).
        // Match the initial resting state instead of retaining a previous hidden hero.
        home.dataset.following = 'false';
        home.dataset.touch = 'false';
        follower.dataset.visible = 'false';
        follower.dataset.pose = 'resting';

        const mouse = window.matchMedia('(hover: hover) and (pointer: fine)');
        const mobile = window.matchMedia('(max-width: 700px)');
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        let frame = 0;
        let scrollFrame = 0;
        let scrollLimit = window.innerHeight * 2;
        let inRange = window.scrollY <= scrollLimit;
        follower.dataset.inRange = String(inRange);
        let idleTimer: ReturnType<typeof setTimeout> | undefined;
        let departureTimer: ReturnType<typeof setTimeout> | undefined;
        let departed = false;
        let active = false;
        let pose: CatPose = 'resting';
        const setPose = (next: CatPose) => {
            pose = next;
            follower.dataset.pose = next;
        };
        let lastTime = 0;
        let x = 0;
        let y = 0;
        let targetX = 0;
        let targetY = 0;
        let tilt = 0;
        let cursorX = 0;
        let cursorY = 0;

        const clamp = (value: number, max: number) => Math.max(EDGE, Math.min(value, Math.max(EDGE, max)));
        const bounds = () => ({
            x: document.documentElement.clientWidth - follower.offsetWidth - EDGE,
            y: window.innerHeight - follower.offsetHeight - EDGE,
        });
        const updateTarget = () => {
            const limit = bounds();
            targetX = clamp(cursorX + CURSOR_GAP <= limit.x ? cursorX + CURSOR_GAP : cursorX - follower.offsetWidth - CURSOR_GAP, limit.x);
            targetY = clamp(cursorY + CURSOR_GAP <= limit.y ? cursorY + CURSOR_GAP : cursorY - follower.offsetHeight - CURSOR_GAP, limit.y);
        };
        const paint = () => {
            follower.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            follower.style.setProperty('--cat-tilt', `${tilt}deg`);
        };
        const animate = (time: number) => {
            frame = 0;
            if (!active || !inRange) return;
            const elapsed = lastTime ? Math.min(time - lastTime, 50) : 16;
            lastTime = time;
            // Time-based interpolation keeps the same feel on 60/120 Hz displays.
            const ease = 1 - Math.exp(-elapsed / (pose === 'sitting' ? 200 : 110));
            const dx = targetX - x;
            const desiredTilt = pose === 'sitting' ? 0 : Math.max(-8, Math.min(8, dx * 0.12));
            x += dx * ease;
            y += (targetY - y) * ease;
            tilt += (desiredTilt - tilt) * ease;
            paint();
            if (Math.abs(targetX - x) + Math.abs(targetY - y) + Math.abs(desiredTilt - tilt) > 0.1) {
                frame = requestAnimationFrame(animate);
            } else {
                x = targetX;
                y = targetY;
                tilt = 0;
                paint();
            }
        };
        const startFrame = () => {
            if (active && inRange && !frame) {
                lastTime = 0;
                frame = requestAnimationFrame(animate);
            }
        };
        const reset = () => {
            active = false;
            clearTimeout(idleTimer);
            clearTimeout(departureTimer);
            cancelAnimationFrame(frame);
            frame = 0;
            follower.dataset.visible = 'false';
            // Losing focus must never send a departed cat back to the hero.
        };
        const move = (event: PointerEvent) => {
            if (mobile.matches) return;
            if (event.pointerType !== 'mouse') {
                reset();
                home.dataset.touch = 'true';
                return;
            }
            if (!mouse.matches || reduced.matches) return;
            home.dataset.touch = 'false';
            cursorX = event.clientX;
            cursorY = event.clientY;
            updateTarget();
            if (!inRange) return;
            if (!active) {
                // Appear near the first cursor position, never fly across the page.
                x = targetX;
                y = targetY;
                tilt = 0;
                paint();
                active = true;
                if (!departed) {
                    departed = true;
                    home.dataset.following = 'true';
                    // Finish the hero fade before revealing the cursor mascot.
                    // Pointer updates continue during this short handoff.
                    departureTimer = setTimeout(() => {
                        if (active) follower.dataset.visible = 'true';
                    }, DEPARTURE_DELAY);
                } else {
                    follower.dataset.visible = 'true';
                }
            }
            setPose('flying');
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                setPose('sitting');
                startFrame();
            }, IDLE_DELAY);
            startFrame();
        };
        const updateScrollVisibility = () => {
            scrollFrame = 0;
            const nextInRange = window.scrollY <= scrollLimit;
            if (nextInRange === inRange) return;
            inRange = nextInRange;
            follower.dataset.inRange = String(inRange);
            if (!inRange) {
                // Freeze in place while CSS finishes the fade; retain pose/activation.
                cancelAnimationFrame(frame);
                frame = 0;
            } else if (active) {
                updateTarget();
                startFrame();
            }
        };
        const scroll = () => {
            if (mobile.matches || !mouse.matches || reduced.matches) return;
            if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollVisibility);
        };
        const resize = () => {
            scrollLimit = window.innerHeight * 2;
            cancelAnimationFrame(scrollFrame);
            updateScrollVisibility();
            if (!active) return;
            updateTarget();
            const limit = bounds();
            x = clamp(x, limit.x);
            y = clamp(y, limit.y);
            paint();
            startFrame();
        };
        const leave = (event: PointerEvent) => { if (!event.relatedTarget) reset(); };
        const visibility = () => { if (document.hidden) reset(); };
        const touch = (event: PointerEvent) => {
            if (event.pointerType === 'touch') {
                reset();
                home.dataset.touch = 'true';
            }
        };
        const syncDisplayMode = () => {
            reset();
            if (mobile.matches || !mouse.matches || reduced.matches) return;
            home.dataset.touch = 'false';
            if (!departed) return;

            // Returning from a static/mobile mode resumes the same departed cat.
            // Do not replay the hero handoff or wait for another pointer event.
            scrollLimit = window.innerHeight * 2;
            inRange = window.scrollY <= scrollLimit;
            follower.dataset.inRange = String(inRange);
            updateTarget();
            const limit = bounds();
            x = clamp(x, limit.x);
            y = clamp(y, limit.y);
            tilt = 0;
            active = true;
            setPose('sitting');
            paint();
            follower.dataset.visible = 'true';
            startFrame();
        };

        window.addEventListener('pointermove', move, { passive: true });
        window.addEventListener('pointerdown', touch, { passive: true });
        window.addEventListener('pointerout', leave);
        window.addEventListener('resize', resize);
        window.addEventListener('scroll', scroll, { passive: true });
        window.addEventListener('blur', reset);
        document.addEventListener('visibilitychange', visibility);
        mouse.addEventListener('change', syncDisplayMode);
        mobile.addEventListener('change', syncDisplayMode);
        reduced.addEventListener('change', syncDisplayMode);
        return () => {
            reset();
            cancelAnimationFrame(scrollFrame);
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerdown', touch);
            window.removeEventListener('pointerout', leave);
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', scroll);
            window.removeEventListener('blur', reset);
            document.removeEventListener('visibilitychange', visibility);
            mouse.removeEventListener('change', syncDisplayMode);
            mobile.removeEventListener('change', syncDisplayMode);
            reduced.removeEventListener('change', syncDisplayMode);
        };
    }, []);

    return <>
        <div ref={homeRef} className="mascot-space cat-home" aria-hidden="true">
            <div className="cat-display" data-pose="resting">
                <img className="cat-resting" src={RESTING} alt="" draggable={false} />
            </div>
        </div>
        {createPortal(
            <div ref={followerRef} className="floating-cat" data-visible="false" data-pose="resting" aria-hidden="true">
                <img className="cat-pose cat-flying" src={FLYING} alt="" draggable={false} />
                <img className="cat-pose cat-sitting" src={SITTING} alt="" draggable={false} />
            </div>,
            document.body,
        )}
    </>;
}
