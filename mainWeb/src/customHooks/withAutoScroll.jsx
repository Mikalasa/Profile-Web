import React, { useEffect, useRef, useContext } from 'react';
import { AutoScrollContext } from '../utility/AutoScrollContext';

const autoScrollState = {
    isSnapping: false,
    unlockTimer: null,
};

function withAutoScroll(WrappedComponent) {
    return function AutoScrollWrapper(props) {
        const componentRef = useRef(null);
        const hasInitialized = useRef(false);
        const lastScrollY = useRef(typeof window === 'undefined' ? 0 : window.scrollY);
        const scrollDirection = useRef('down');
        const { isNavClick } = useContext(AutoScrollContext);

        useEffect(() => {
            const updateScrollDirection = () => {
                const currentScrollY = window.scrollY;
                if (Math.abs(currentScrollY - lastScrollY.current) < 2) {
                    return;
                }

                scrollDirection.current = currentScrollY > lastScrollY.current ? 'down' : 'up';
                lastScrollY.current = currentScrollY;
            };

            window.addEventListener('scroll', updateScrollDirection, { passive: true });

            const observer = new IntersectionObserver(
                (entries) => {
                    if (!hasInitialized.current) {
                        hasInitialized.current = true;
                        return;
                    }

                    // 如果是导航栏点击导致的滚动，跳过自动滚动
                    if (isNavClick || autoScrollState.isSnapping) {
                        return;
                    }

                    entries.forEach((entry) => {
                        if (!entry.isIntersecting || entry.intersectionRatio < 0.35) {
                            return;
                        }

                        const rect = entry.boundingClientRect;
                        const viewportHeight = window.innerHeight;
                        const isEnteringFromBelow =
                            scrollDirection.current === 'down' &&
                            rect.top > 0 &&
                            rect.top < viewportHeight * 0.65;
                        const isEnteringFromAbove =
                            scrollDirection.current === 'up' &&
                            rect.top < 0 &&
                            rect.bottom > viewportHeight * 0.35;

                        if (!isEnteringFromBelow && !isEnteringFromAbove) {
                            return;
                        }

                        autoScrollState.isSnapping = true;
                        window.clearTimeout(autoScrollState.unlockTimer);
                        entry.target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                        autoScrollState.unlockTimer = window.setTimeout(() => {
                            autoScrollState.isSnapping = false;
                        }, 850);
                    });
                },
                {
                    threshold: [0.35, 0.5],
                }
            );

            const observedNode = componentRef.current;
            if (observedNode) {
                observer.observe(observedNode);
            }

            return () => {
                if (observedNode) {
                    observer.unobserve(observedNode);
                }
                window.removeEventListener('scroll', updateScrollDirection);
            };
        }, [isNavClick]);

        return (
            <div ref={componentRef}>
                <WrappedComponent {...props} />
            </div>
        );
    };
}

export default withAutoScroll;
