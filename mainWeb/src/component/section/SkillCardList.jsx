import React, { useRef, useEffect, useState } from 'react';
import { skills } from '../../constants/config-skills';
import {motion, useInView} from "framer-motion";

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
    const positionRef = useRef(0);
    const [repeatCount, setRepeatCount] = useState(1);
    const rowWidthPerCycle = useRef(0);
    const repeatedSkills = React.useMemo(() => {
        return Array.from({ length: repeatCount }).flatMap(() => skills);
    }, [repeatCount, skills]);


    useEffect(() => {
        if (contentRef.current) {
            rowWidthPerCycle.current = contentRef.current.scrollWidth / repeatCount;
        }
    }, [repeatCount, skills]);


    // 动态计算需要的重复次数
    const calculateRepeatCount = () => {
        if (containerRef.current && contentRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const cardWidthWithMargin = contentRef.current.children[0].offsetWidth + 16; // 单个方块宽度 + margin-right (16px)
            const count = Math.ceil(containerWidth / (cardWidthWithMargin * skills.length)) + 2;
            setRepeatCount(count);
        }
    };

    useEffect(() => {
        calculateRepeatCount();
        window.addEventListener('resize', calculateRepeatCount);
        return () => {
            window.removeEventListener('resize', calculateRepeatCount);
        };
    }, [skills]);

    useEffect(() => {
        if (!contentRef.current) return;

        const totalRowWidth = contentRef.current.scrollWidth;

        let animationFrameId;

        const scroll = () => {
            positionRef.current -= speed;

            let current = positionRef.current;

            if (speed > 0 && Math.abs(current) >= totalRowWidth / repeatCount) {
                current = 0;
            }

            if (speed < 0 && current >= 0) {
                current = -totalRowWidth / repeatCount;
            }

            positionRef.current = current;

            if (contentRef.current) {
                contentRef.current.style.transform = `translateX(${current}px)`;
            }

            animationFrameId = requestAnimationFrame(scroll);
        };


        animationFrameId = requestAnimationFrame(scroll);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [skills, speed, repeatCount]);

    return (
        <div ref={containerRef} className="skill-loop-box relative overflow-hidden w-full h-24 mx-auto">
            <div
                ref={contentRef}
                className="flex absolute whitespace-nowrap"
                style={{
                    transform: `translateX(${positionRef}px)`,
                }}
            >
                {repeatedSkills.map((skill, index) => (
                    <SkillCard key={index} skill={skill} />
                ))}

            </div>
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
    const [speed, setSpeed] = useState(0.25);
    const moveToLeft = speed;
    const moveToRight = -speed;
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
