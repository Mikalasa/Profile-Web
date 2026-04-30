import React, { Suspense, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, PresentationControls, useGLTF, PerformanceMonitor } from '@react-three/drei';
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
const MacModel = React.memo(() => {
    const { scene } = useGLTF(`${process.env.PUBLIC_URL}/3DModel/pc-bake.glb`);
    const [loadIframe, setLoadIframe] = React.useState(false);

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
        const delayId = window.setTimeout(() => {
            const showIframe = () => setLoadIframe(true);

            if ("requestIdleCallback" in window) {
                idleId = window.requestIdleCallback(showIframe, { timeout: 1200 });
            } else {
                showIframe();
            }
        }, 900);

        return () => {
            window.clearTimeout(delayId);
            if (idleId && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId);
            }
        };
    }, []);

    return (
        <>
            {/* Original ambient light */}
            <ambientLight intensity={10} color={"#ffffff"} />

            {/* Mac model */}
            <group position={modelPosition} rotation={modelRotation}>
                <primitive object={scene} scale={1} />
            </group>

            {/* iFrame content */}
            <group position={iframePosition}>
                <Html
                    transform
                    wrapperClass="webgl-iframe-wrapper"
                    distanceFactor={1.70}
                    occlude
                >
                    {loadIframe && (
                        <iframe
                            title="iframe-pc"
                            className={`webgl-iframe webgl-iframe-${os}`}
                            sandbox="allow-scripts allow-same-origin"
                            loading="lazy"
                            src="https://mikalasa.github.io/Profile-Web/IframeWeb/"
                        />
                    )}
                </Html>
            </group>
        </>
    );
});


// Main WebglPc component
const WebglPc = () => {
    return (
        <div className="pc-bg h-full">
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
                        snap
                        config={{ tension: 120, friction: 20 }}
                        azimuth={[(-20 * Math.PI) / 180, (20 * Math.PI) / 180]}
                        polar={[(-5 * Math.PI) / 180, (15 * Math.PI) / 180]}
                    >
                        <MacModel />
                    </PresentationControls>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default WebglPc;
