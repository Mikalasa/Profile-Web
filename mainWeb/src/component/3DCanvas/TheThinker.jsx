// TheThinkerCanvas.jsx

import React, { Suspense, useEffect, useMemo, memo, useState } from "react";
import {Canvas, useLoader, useThree} from "@react-three/fiber";
import { Float, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { TextureLoader } from "three";
import CanvasLoader from "../widgets/CanvasLoader.jsx";
import { isMobile } from "react-device-detect";

// Preload the GLTF model for faster loading
useGLTF.preload(`${process.env.PUBLIC_URL}/3DModel/the_thinker.glb`);

const ThinkerModel = memo(({ compactMode }) => {
    const { scene } = useGLTF(`${process.env.PUBLIC_URL}/3DModel/the_thinker.glb`);

    // Memoize calculations for performance
    const scale = useMemo(() => (compactMode ? 2.5 : 3.5), [compactMode]);
    const position = useMemo(() => (compactMode ? [-1.8, 3, 10] : [-5.0, -0.5, 5]), [compactMode]);
    const rotationIndex = useMemo(() => (compactMode ? 0.25 : 1), [compactMode]);
    const ambientIntensity = useMemo(() => (compactMode ? 0.34 : 0.15), [compactMode]);
    const lightBoost = useMemo(() => (compactMode ? 1.55 : 1), [compactMode]);
    const enableShadows = useMemo(() => !compactMode, [compactMode]);

    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = enableShadows;
                    child.receiveShadow = enableShadows;
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
    }, [scene, enableShadows]);

    return (
        <>
            {/* Original lighting setup */}
            <ambientLight intensity={ambientIntensity} color="#ffffff" />
            <pointLight
                intensity={30 * lightBoost}
                position={[-1, 5, 7]}
                color="#FFEED6"
                castShadow={enableShadows}
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
                shadow-radius={10}
            />
            <pointLight
                intensity={30 * lightBoost}
                position={[-8, 6, -3]}
                color="#CFE3FF"
                castShadow={enableShadows}
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
                shadow-radius={10}
            />
            <pointLight
                intensity={40 * lightBoost}
                position={[-8, 6, -3]}
                color="#B5D9FF"
                // castShadow
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
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

const GroundPlane = memo(({ compactMode }) => {
    // Use useLoader for efficient texture loading
    const texture = useLoader(TextureLoader, `${process.env.PUBLIC_URL}/3DTexture/hero-ground.webp`);

    return (
        <mesh
            rotation={[-Math.PI / 2 - 0.3, 0, -0.1]}
            position={[0, -3, 0]}
            receiveShadow={!compactMode}
        >
            <planeGeometry args={[400, 400]} />
            <meshPhysicalMaterial map={texture} metalness={0.7} roughness={0.2} />
        </mesh>
    );
});

const DynamicFrameControl = ({ fps = 30 }) => {
    const invalidate = useThree((state) => state.invalidate);

    useEffect(() => {
        const interval = window.setInterval(() => {
            if (!document.hidden) {
                invalidate();
            }
        }, 1000 / fps);

        invalidate();

        return () => window.clearInterval(interval);
    }, [fps, invalidate]);

    return null;
};

const TheThinkerCanvas = ({ compactMode = isMobile }) => {
    const [isDragging, setIsDragging] = useState(false);
    const maxPolarAngle = Math.PI / 4;
    const minPolarAngle = Math.PI / 3;
    const minAzimuthAngle = compactMode ? -Math.PI / 12 : -Math.PI / 8;
    const maxAzimuthAngle = compactMode ? Math.PI / 30 : Math.PI / 12;

    const handlePointerDown = () => {
        if (compactMode) {
            return;
        }

        setIsDragging(true);
        window.dispatchEvent(new CustomEvent("thinker-model-interacted"));
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            className={`thinker-bg ${!compactMode ? "thinker-bg-interactive" : ""} ${isDragging ? "thinker-bg-dragging" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            <Canvas
                frameloop="demand"
                shadows={!compactMode}
                dpr={[1, 2]} // Limit device pixel ratio for performance
                camera={{ position: compactMode ? [0, 15, 26] : [0, 30, 0], fov: 25, near: 0.1, far: 200 }}
                onCreated={({ camera }) => {
                    if (compactMode) {
                        camera.lookAt(0, 0, 0);
                        camera.updateProjectionMatrix();
                    }
                }}
                gl={{ antialias: true, alpha: false }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <DynamicFrameControl fps={30} />
                    {!compactMode && (
                        <OrbitControls
                            enableRotate={true}
                            enableZoom={false}
                            maxPolarAngle={maxPolarAngle}
                            minPolarAngle={minPolarAngle}
                            minAzimuthAngle={minAzimuthAngle}
                            maxAzimuthAngle={maxAzimuthAngle}
                        />
                    )}
                    <ThinkerModel compactMode={compactMode} />
                    <GroundPlane compactMode={compactMode} />
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    );
};

export default TheThinkerCanvas;
