// TheThinkerMobileCanvas.jsx

import React, { Suspense, useEffect, useMemo, memo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, Preload, useGLTF } from "@react-three/drei";
import { TextureLoader } from "three";
import CanvasLoader from "../widgets/CanvasLoader.jsx";
useGLTF.preload(`${process.env.PUBLIC_URL}/3DModel/the_thinker.glb`);

const ThinkerModelMobile = memo(() => {
    const { scene } = useGLTF(`${process.env.PUBLIC_URL}/3DModel/the_thinker.glb`);

    // 你原文件里移动端用的是：scale 2.5，position [-1.8, 3, 10]，rotationIntensity 0.25
    // 这里直接固定成移动端配置
    const scale = useMemo(() => 2.5, []);
    const position = useMemo(() => [-1.8, 3, 10], []);
    const rotationIntensity = useMemo(() => 0.25, []);

    useEffect(() => {
        if (!scene) return;

        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // 清理资源
        return () => {
            scene.traverse((child) => {
                if (child.isMesh) {
                    child.geometry?.dispose?.();
                    if (Array.isArray(child.material)) {
                        child.material.forEach((m) => m?.dispose?.());
                    } else {
                        child.material?.dispose?.();
                    }
                }
            });
        };
    }, [scene]);

    return (
        <>
            {/* 灯光：保持与你现在一致 */}
            <ambientLight intensity={0.15} color="#ffffff" />

            <pointLight
                intensity={30}
                position={[-1, 5, 7]}
                color="#FFEED6"
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-radius={10}
            />

            <pointLight
                intensity={30}
                position={[-8, 6, -3]}
                color="#CFE3FF"
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-radius={10}
            />

            <pointLight
                intensity={40}
                position={[-8, 6, -3]}
                color="#B5D9FF"
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-radius={10}
            />

            {/* 保留你想要的“背景中移动”的感觉：Float */}
            <Float speed={1} rotationIntensity={rotationIntensity}>
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

const GroundPlaneMobile = memo(() => {
    const texture = useLoader(
        TextureLoader,
        `${process.env.PUBLIC_URL}/3DTexture/hero-ground.webp`
    );

    return (
        <mesh
            rotation={[-Math.PI / 2 - 0.3, 0, -0.1]}
            position={[0, -3, 0]}
            receiveShadow
        >
            <planeGeometry args={[400, 400]} />
            <meshPhysicalMaterial map={texture} metalness={0.7} roughness={0.2} />
        </mesh>
    );
});

// 你原来的 30fps 控制逻辑保留：能让 Float 继续动，但避免满帧渲染
const DynamicFrameControlMobile = ({ children }) => {
    const fps = 30;
    let accumDelta = 0;

    useFrame((state, delta) => {
        accumDelta += delta;
        if (accumDelta >= 1 / fps) {
            accumDelta %= 1 / fps;
            state.invalidate();
        }
    });

    return <>{children}</>;
};

const TheThinkerMobileCanvas = () => {
    return (
        <div className="thinker-bg">
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 30, 0], fov: 25, near: 0.1, far: 200 }}
                gl={{ antialias: true, alpha: false }}
            >
                <Suspense fallback={<CanvasLoader />}>
                    <DynamicFrameControlMobile>
                        <ThinkerModelMobile />
                        <GroundPlaneMobile />
                    </DynamicFrameControlMobile>
                </Suspense>

                <Preload all />
            </Canvas>
        </div>
    );
};

export default TheThinkerMobileCanvas;