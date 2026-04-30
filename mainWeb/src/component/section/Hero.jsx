import React, { lazy, Suspense, useEffect, useState } from "react";
import MouseScrollicon from "../widgets/MouseScrollicon.jsx";
import HeroCard from "../widgets/HeroCard.jsx";
import HeroCard_Mobile from "../widgets/HeroCard_Mobile.jsx";
import { isMobile } from "react-device-detect";

const TheThinkerCanvas = lazy(() => import("../3DCanvas/TheThinker.jsx"));

function Hero() {
    const [showCanvas, setShowCanvas] = useState(false);

    useEffect(() => {
        let idleId;
        const delayId = window.setTimeout(() => {
            const loadCanvas = () => setShowCanvas(true);

            if ("requestIdleCallback" in window) {
                idleId = window.requestIdleCallback(loadCanvas, { timeout: 1200 });
            } else {
                loadCanvas();
            }
        }, isMobile ? 700 : 450);

        return () => {
            window.clearTimeout(delayId);
            if (idleId && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId);
            }
        };
    }, []);

    return (
        <section id='hero' className="hero-container h-[var(--app-svh)] md:h-svh layout-container">
            {isMobile ? <HeroCard_Mobile/> : <HeroCard/>}
            {showCanvas && (
                <Suspense fallback={null}>
                    <TheThinkerCanvas/>
                </Suspense>
            )}
            <MouseScrollicon/>
        </section>
    );
}

export default Hero;
