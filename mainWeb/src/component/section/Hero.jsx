import React, { lazy, Suspense, useEffect, useState } from "react";
import MouseScrollicon from "../widgets/MouseScrollicon.jsx";
import HeroCard from "../widgets/HeroCard.jsx";
import HeroCardMobile from "../widgets/HeroCard_Mobile.jsx";
import { isMobile } from "react-device-detect";
import { useResponsiveViewport } from "../../utility/useResponsiveViewport";

const TheThinkerCanvas = lazy(() => import("../3DCanvas/TheThinker.jsx"));

function Hero() {
    const [showCanvas, setShowCanvas] = useState(false);
    const isNarrowViewport = useResponsiveViewport();
    const isTabletViewport = useResponsiveViewport("(min-width: 768px) and (max-width: 1024px)");
    const useMobileHeroExperience = isMobile || isNarrowViewport || isTabletViewport;

    useEffect(() => {
        let idleId;
        const delayId = window.setTimeout(() => {
            const loadCanvas = () => setShowCanvas(true);

            if ("requestIdleCallback" in window) {
                idleId = window.requestIdleCallback(loadCanvas, { timeout: 1200 });
            } else {
                loadCanvas();
            }
        }, useMobileHeroExperience ? 700 : 450);

        return () => {
            window.clearTimeout(delayId);
            if (idleId && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId);
            }
        };
    }, [useMobileHeroExperience]);

    return (
        <section id='hero' className="hero-container h-[var(--app-svh)] md:h-svh layout-container">
            {useMobileHeroExperience ? (
                <HeroCardMobile/>
            ) : (
                <div className="hero-desktop-stage">
                    <div className="hero-desktop-card-slot">
                        <HeroCard/>
                    </div>
                </div>
            )}
            {showCanvas && (
                <Suspense fallback={null}>
                    <TheThinkerCanvas compactMode={useMobileHeroExperience}/>
                </Suspense>
            )}
            <MouseScrollicon/>
        </section>
    );
}

export default Hero;
