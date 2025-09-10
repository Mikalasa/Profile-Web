import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const textVariant = (delay) => {
    return {
        hidden: {
            y: 50,
            opacity: 0,
        },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                duration: 2,
                delay: delay,
            },
        },
    };
};
const TextFadeIn = ({ text }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });


    return (
        <div
            className="generate-text-box  text-neutral-300 text-x sm:text-2xl w-3/4 sm:w-2/3 md:w-1/2 font-bold text-start mt-10"
        >
            {text}
        </div>
    );
};

function HobbieText() {
    const text = `Beyond programming, I love 3D art and enjoy creating imaginative scenes, blending technology with creativity to craft beauty.`;
    return <TextFadeIn text={text} />;
}

export default HobbieText;