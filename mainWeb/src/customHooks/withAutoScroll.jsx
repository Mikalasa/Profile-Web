import React, { useEffect, useRef, useContext } from 'react';
import { AutoScrollContext } from '../utility/AutoScrollContext';

function withAutoScroll(WrappedComponent) {
    return function AutoScrollWrapper(props) {
        const componentRef = useRef(null);
        const hasInitialized = useRef(false);
        const { isNavClick } = useContext(AutoScrollContext);

        useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (!hasInitialized.current) {
                        hasInitialized.current = true;
                        return;
                    }

                    // 如果是导航栏点击导致的滚动，跳过自动滚动
                    if (isNavClick) {
                        return;
                    }

                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                            });
                        }
                    });
                },
                {
                    threshold: 0.2,
                }
            );

            if (componentRef.current) {
                observer.observe(componentRef.current);
            }

            return () => {
                if (componentRef.current) {
                    observer.unobserve(componentRef.current);
                }
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
