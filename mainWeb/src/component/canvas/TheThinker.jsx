// TheThinkerCanvas.jsx

import React, { Suspense, useEffect, useMemo, memo } from "react";
import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import { Float, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { TextureLoader } from "three";
import CanvasLoader from "../widgets/CanvasLoader.jsx";
import { isMobile } from "react-device-detect";

// Preload the GLTF model for faster loading
useGLTF.preload(`${process.env.PUBLIC_URL}/the_thinker.glb`);

const ThinkerModel = memo(() => {
    const { scene } = useGLTF(`${process.env.PUBLIC_URL}/the_thinker.glb`);

    // Memoize calculations for performance
    const scale = useMemo(() => (isMobile ? 2.5 : 3.5), []);
    const position = useMemo(() => (isMobile ? [-1.8, 3, 10] : [-5.0, -0.5, 5]), []);
    const rotationIndex = useMemo(() => (isMobile ? 0.25 : 1), []);

    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        }

        // Clean up resources when the component unmounts
        return () => {
            if (scene) {
                scene.traverse((child) => {
                    if (child.isMesh) {
                        child.geometry.dispose();
                        if (Array.isArray(child.material)) {
                            child.material.forEach((material) => material.dispose());
                        } else {
                            child.material.dispose();
                        }
                    }
                });
            }
        };
    }, [scene]);

    return (
        <>
            {/* Original lighting setup */}
            <ambientLight intensity={0.2} color="#ffffff" />
            <pointLight
                intensity={10}
                position={[-1, 5, 7]}
                castShadow
                shadow-mapSize-width={256}
                shadow-mapSize-height={256}
                shadow-radius={10}
            />
            <pointLight
                intensity={20}
                position={[-8, 6, -3]}
                castShadow
                shadow-mapSize-width={256}
                shadow-mapSize-height={256}
                shadow-radius={10}
            />

            {/* Model with original animation speed */}
            <Float speed={1} rotationIntensity={rotationIndex}>
                <primitive
                    object={scene}
                    scale={scale}
                    position={position}
                    rotation={[-0.3, 2.5, -0.1]}
                />
            </Float>
        </>
    );
});

const GroundPlane = memo(() => {
    // Use useLoader for efficient texture loading
    const texture = useLoader(TextureLoader, `${process.env.PUBLIC_URL}/hero-ground.webp`);

    return (
        <mesh
            rotation={[-Math.PI / 2 - 0.3, 0, -0.1]}
            position={[0, -3, 0]}
            receiveShadow
            castShadow
        >
            <planeGeometry args={[400, 400]} />
            <meshPhysicalMaterial map={texture} metalness={0.7} roughness={0.2} />
        </mesh>
    );
});

const DynamicFrameControl = ({ children }) => {
    const fps = 30; // Target frame rate
    let accumDelta = 0;

    useFrame((state, delta) => {
        accumDelta += delta;
        if (accumDelta >= 1 / fps) {
            accumDelta %= 1 / fps; // Reset accumulated time
            state.invalidate(); // Request a new frame
        }
    });

    return <>{children}</>;
};

const TheThinkerCanvas = () => {
    const maxPolarAngle = Math.PI / 4;
    const minPolarAngle = Math.PI / 3;
    const minAzimuthAngle = isMobile ? -Math.PI / 12 : -Math.PI / 8;
    const maxAzimuthAngle = isMobile ? Math.PI / 30 : Math.PI / 12;

    return (
        <div className="thinker-bg">
            <Canvas
                shadows
                dpr={[1, 2]} // Limit device pixel ratio for performance
                camera={{ position: [0, 30, 0], fov: 25, near: 0.1, far: 200 }}
                gl={{ antialias: true, alpha: false }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <DynamicFrameControl>
                        <OrbitControls
                            enableRotate={true}
                            enableZoom={false}
                            maxPolarAngle={maxPolarAngle}
                            minPolarAngle={minPolarAngle}
                            minAzimuthAngle={minAzimuthAngle}
                            maxAzimuthAngle={maxAzimuthAngle}
                        />
                        <ThinkerModel />
                        <GroundPlane />
                    </DynamicFrameControl>
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    );
};

export default TheThinkerCanvas;
