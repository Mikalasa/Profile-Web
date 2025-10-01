import React, { useRef, useEffect, useState } from 'react';
import { skills } from '../../constants/config-skills';
import { motion, useInView, useReducedMotion } from "framer-motion";

// SkillCard 组件
const SkillCard = ({ skill }) => (
    <div className="flex justify-center items-center bg-white rounded-[1rem] shadow-md w-[60px] h-[60px] mr-4 text-sm text-center">
        <img
            src={process.env.PUBLIC_URL + skill.logoURL}
            alt={skill.name}
            className="w-[50px] h-[50px]"
        />
    </div>
);


// InfiniteScrollRow 组件
const InfiniteScrollRow = ({ skills, speed }) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const reduced = useReducedMotion();
    const [cycleWidth, setCycleWidth] = useState(0);
    const [repeatCount, setRepeatCount] = useState(2);
    const repeatedSkills = React.useMemo(
        () => Array.from({ length: repeatCount }).flatMap(() => skills),
        [skills, repeatCount]
    );


    // Measure the width of a single cycle (one set of skills)
    useEffect(() => {
        if (!contentRef.current) return;
        queueMicrotask(() => {
            if (!contentRef.current) return;
            const full = contentRef.current.scrollWidth;
            const single = repeatCount > 0 ? full / repeatCount : full;
            setCycleWidth(single);
        });
    }, [skills, repeatCount]);

    // Keep measurements in sync and ensure we have enough repeats to cover the width
    useEffect(() => {
        if (!containerRef.current || !contentRef.current) return;

        const measure = () => {
            const containerWidth = containerRef.current.offsetWidth;
            const full = contentRef.current.scrollWidth || 0;
            const single = repeatCount > 0 ? full / repeatCount : full;
            if (single > 0) {
                // Ensure at least two cycles, and enough to cover the container plus one extra for seamless looping
                const needed = Math.max(2, Math.ceil(containerWidth / single) + 1);
                if (needed !== repeatCount) setRepeatCount(needed);
                setCycleWidth(single);
            }
        };

        const ro = new ResizeObserver(measure);
        ro.observe(containerRef.current);
        // initial measure
        measure();
        return () => ro.disconnect();
    }, [skills, repeatCount]);

    const containerInView = useInView(containerRef, { margin: "0px", amount: 0.1 });
    // Convert the legacy per-frame speed into pixels/second (assumes 60fps previously)
    const pxPerSecond = Math.abs(speed) * 60;
    const duration = pxPerSecond > 0 ? cycleWidth / pxPerSecond : 0;
    const shouldAnimate = !reduced && containerInView && duration > 0;
    const fromX = speed > 0 ? 0 : -cycleWidth;
    const toX = speed > 0 ? -cycleWidth : 0;

    return (
        <div
            ref={containerRef}
            className="skill-loop-box relative overflow-hidden w-full h-24 mx-auto pointer-events-none"
        >
            <motion.div
                ref={contentRef}
                className="flex absolute whitespace-nowrap will-change-transform transform-gpu"
                animate={shouldAnimate ? { x: [fromX, toX] } : { x: 0 }}
                transition={shouldAnimate ? { duration, ease: "linear", repeat: Infinity } : {}}
            >
                {repeatedSkills.map((skill, index) => (
                    <SkillCard key={index} skill={skill} />
                ))}
            </motion.div>
        </div>
    );
};

// SkillCardList 组件
const SkillCardList = () => {
    const splitSkillsIntoRows = (skills) => {
        const total = skills.length;
        const perRow = Math.ceil(total / 3);
        const row1 = skills.slice(0, perRow);
        const row2 = skills.slice(perRow, perRow * 2);
        const row3 = skills.slice(perRow * 2);
        return [row1, row2, row3];
    };

    const [row1, row2, row3] = splitSkillsIntoRows(skills);
    // Tune this base speed (pixels per frame from the legacy impl). 0.25 ~= 15px/s
    const baseSpeed = 0.25;
    const moveToLeft = baseSpeed;
    const moveToRight = -baseSpeed;
    const motionRef = React.useRef(null);
    const isInView = useInView(motionRef, { once: true });
    const fadeInVariants = {
        hidden: { opacity: 0, y: 0 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 3, delay: 0 },
        },
    };

    return (
        <motion.div
            ref={motionRef}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeInVariants}
        >
            <div
                className="mt-4 flex flex-col space-y-4 mx-auto min-w-[300px] w-full sm:max-w-[300px] md:max-w-[500px] lg:max-w-[700px] xl:max-w-[1000px]">
                <InfiniteScrollRow skills={row1} speed={moveToLeft}/>
                <InfiniteScrollRow skills={row2} speed={moveToRight}/>
                <InfiniteScrollRow skills={row3} speed={moveToLeft}/>
            </div>
        </motion.div>

    );
};

export default SkillCardList;
