import React from 'react';
import { useInView } from 'react-intersection-observer';
import { TextGenerateEffect } from "./text-generate-effect";

const words = `Outside of programming, I have a deep passion for 3D art and enjoy creating and rendering imaginative scenes. Using technology to create beauty is a pursuit I find truly fulfilling.`;

export function TextGenerateEffectPreview() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: "-100px 0px",
    });

    return (
        <div ref={ref}>
            {inView && <TextGenerateEffect words={words} />}
        </div>
    );
}
