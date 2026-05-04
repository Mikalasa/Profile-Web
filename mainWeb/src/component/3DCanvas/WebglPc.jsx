import React, { Suspense, useMemo, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Html, PresentationControls, useGLTF, PerformanceMonitor } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import CanvasLoader from "../widgets/CanvasLoader.jsx";

// Custom hook to detect the user's operating system
const useOperatingSystem = () => {
    const [os, setOs] = React.useState('unknown');

    React.useEffect(() => {
        const userAgent = window.navigator.userAgent;
        if (userAgent.includes('Win')) setOs('windows');
        else if (userAgent.includes('Mac')) setOs('mac');
    }, []);

    return os;
};

// Memoized MacModel component
const PcDragHint = ({ visible }) => (
    <AnimatePresence>
        {visible && (
            <motion.div
                className="pc-interaction-hint pc-drag-hint"
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="pc-drag-hint-icon" aria-hidden="true">
                    <span className="pc-drag-hint-arrow pc-drag-hint-arrow-left" />
                    <span className="pc-drag-hint-arrow pc-drag-hint-arrow-right" />
                </span>
                <span>Drag to view</span>
            </motion.div>
        )}
    </AnimatePresence>
);

const IframeScrollHint = ({ visible }) => (
    <AnimatePresence>
        {visible && (
            <motion.div
                className="webgl-iframe-scroll-hint"
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
                <span className="webgl-iframe-scroll-icon" aria-hidden="true">
                    <span />
                </span>
                <span>Hover screen to scroll</span>
            </motion.div>
        )}
    </AnimatePresence>
);

const MacModel = React.memo(() => {
    const { scene } = useGLTF(`${process.env.PUBLIC_URL}/3DModel/pc-bake.glb`);
    const [loadIframe, setLoadIframe] = React.useState(false);
    const [showScrollHint, setShowScrollHint] = React.useState(false);
    const invalidate = useThree((state) => state.invalidate);
    const refreshHtmlProjection = React.useCallback((frameLimit = 18) => {
        let frameId;
        let frameCount = 0;

        const invalidateFrame = () => {
            invalidate();
            frameCount += 1;

            if (frameCount < frameLimit) {
                frameId = window.requestAnimationFrame(invalidateFrame);
            }
        };

        frameId = window.requestAnimationFrame(invalidateFrame);
        return () => window.cancelAnimationFrame(frameId);
    }, [invalidate]);

    // Memoized positions and rotations
    const modelPosition = useMemo(() => [3, -3.0, 2.5], []);
    const modelRotation = useMemo(() => [0, -Math.PI / 2, -3.8 * (Math.PI / 180)], []);
    const iframePosition = useMemo(() => [0, 0.05, 1.35], []);

    const os = useOperatingSystem();

    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = false;
                child.receiveShadow = false;
            }
        });
    }, [scene]);

    useEffect(() => {
        let idleId;
        let scrollHintTimer;
        const delayId = window.setTimeout(() => {
            const showIframe = () => {
                setLoadIframe(true);
                scrollHintTimer = window.setTimeout(() => setShowScrollHint(true), 450);
            };

            if ("requestIdleCallback" in window) {
                idleId = window.requestIdleCallback(showIframe, { timeout: 1000 });
            } else {
                showIframe();
            }
        }, 900);

        return () => {
            window.clearTimeout(delayId);
            window.clearTimeout(scrollHintTimer);
            if (idleId && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId);
            }
        };
    }, []);

    useEffect(() => {
        if (!loadIframe) {
            return undefined;
        }

        return refreshHtmlProjection();
    }, [loadIframe, refreshHtmlProjection]);

    useEffect(() => {
        if (!showScrollHint) {
            return undefined;
        }

        const hideTimer = window.setTimeout(() => setShowScrollHint(false), 7600);
        return () => window.clearTimeout(hideTimer);
    }, [showScrollHint]);

    return (
        <>
            {/* Original ambient light */}
            <ambientLight intensity={10} color={"#ffffff"} />

            {/* Mac model */}
            <group position={modelPosition} rotation={modelRotation}>
                <primitive object={scene} scale={1} />
            </group>

            {/* iFrame content */}
            {loadIframe && (
                <group position={iframePosition}>
                    <Html
                        transform
                        wrapperClass="webgl-iframe-wrapper"
                        distanceFactor={1.70}
                        occlude
                    >
                        <div
                            className="webgl-iframe-screen"
                            onMouseEnter={() => setShowScrollHint(false)}
                        >
                            <iframe
                                title="iframe-pc"
                                className={`webgl-iframe webgl-iframe-${os}`}
                                sandbox="allow-scripts allow-same-origin"
                                loading="lazy"
                                onLoad={() => refreshHtmlProjection(36)}
                                src="https://mikalasa.github.io/Profile-Web/IframeWeb/"
                            />
                            <IframeScrollHint visible={showScrollHint} />
                        </div>
                    </Html>
                </group>
            )}
        </>
    );
});


// Main WebglPc component
const WebglPc = () => {
    const [showDragHint, setShowDragHint] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const showTimer = window.setTimeout(() => setShowDragHint(true), 350);
        const hideTimer = window.setTimeout(() => setShowDragHint(false), 6500);

        return () => {
            window.clearTimeout(showTimer);
            window.clearTimeout(hideTimer);
        };
    }, []);

    const handlePointerDown = () => {
        setIsDragging(true);
        setShowDragHint(false);
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            className={`pc-bg h-full pc-bg-interactive ${isDragging ? "pc-bg-dragging" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            <Canvas
                frameloop="demand"
                shadows={false}
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 15], fov: 25 }}
                gl={{ antialias: true }}
            >
                {/* Performance monitor to adjust settings based on device capability */}
                <PerformanceMonitor />

                {/* Suspense for lazy loading */}
                <Suspense fallback={<CanvasLoader />}>
                    {/* PresentationControls with your original values */}
                    <PresentationControls
                        global
                        snap
                        config={{ tension: 120, friction: 20 }}
                        azimuth={[(-20 * Math.PI) / 180, (20 * Math.PI) / 180]}
                        polar={[(-5 * Math.PI) / 180, (15 * Math.PI) / 180]}
                    >
                        <MacModel />
                    </PresentationControls>
                </Suspense>
            </Canvas>
            <PcDragHint visible={showDragHint} />
        </div>
    );
};

export default WebglPc;
