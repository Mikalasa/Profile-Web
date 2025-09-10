import React, { useEffect, useRef } from "react";
import { motion } from 'framer-motion';
import {customTailwind} from "../../constants/custom-tailwind";
import {isMobile} from "react-device-detect";
import {heroText} from "../../constants/config-web-paragraph";


function HeroCard() {
    const cardRef = useRef(null);
    const animationFrameId = useRef(null);

    useEffect(() => {
        let lastMousePosition = { x: 0, y: 0 };

        const handleMouseMove = (event) => {
            lastMousePosition = {
                x: event.pageX,
                y: event.pageY,
            };

            if (!animationFrameId.current) {
                animationFrameId.current = requestAnimationFrame(() => {
                    updateCardRotation(lastMousePosition);
                    animationFrameId.current = null;
                });
            }
        };

        const updateCardRotation = ({ x, y }) => {
            const e = -(window.innerWidth / 2 - x) / 30;
            const n = (window.innerHeight / 2 - y) / 30;

            if (cardRef.current) {
                cardRef.current.style.transform = `rotateY(${e}deg) rotateX(${n}deg)`;
            }
        };

        // const topElement = document.getElementById("hero-card-bg");
        const topElement = document.querySelector(".hero-container");

        topElement.addEventListener("mousemove", handleMouseMove);

        // remove event listener and animation frame
        return () => {
            topElement.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    const isMobileCanvasCoverDiv = (
        <>
            <div className="isMobileCanvasCoverDiv-right"></div>
            <div className="isMobileCanvasCoverDiv-buttom"></div>
        </>
    )

    return (
        <motion.div
            id="hero-card-bg"
            className={` ${customTailwind.paddingX} flex flex-row items-start gap-5`}
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 5, type: 'spring', damping: 10, stiffness: 100}}
        >
            <div>
                <div id="hero-card-top">
                    <div
                        className="hero-card"
                        ref={cardRef}
                    >
                        <div className="hero-card-thumb"></div>
                        <div className='hero-card-title flex flex-col justify-center items-center mt-5'>
                            <div className='w-5 h-5 rounded-full bg-[#FF7F50]'/>
                            <div className='w-1 sm:h-80 h-40 violet-gradient'/>
                        </div>
                        <motion.div className={"hero-card-des"}>
                            <h1 className={`${customTailwind.heroHeadText} text-white`}>{heroText.title_f}
                                <span className='text-[#FF7F50]'>{heroText.title_l}</span>
                            </h1>
                            <br/>
                            <p className={`${customTailwind.heroSubText} mt-2 text-white-100`}>
                                {heroText.description}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {isMobile ? (
                isMobileCanvasCoverDiv
            ) : null}
        </motion.div>

    );
}

export default HeroCard;