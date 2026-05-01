import { motion } from 'framer-motion';
import {customTailwind} from "../../constants/custom-tailwind";
import { fadeIn, textVariant } from "../../utility/custom-motion";
import { projectOverView } from "../../constants/config-web-paragraph";
import { projects } from "../../constants/config-projectsText";
import { useInView } from 'react-intersection-observer';

function ProjectIntroduction() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-100px 0px",
    });
    const projectTypes = Array.from(
        new Set(projects.flatMap((project) => project.type))
    ).slice(0, 4);

    return (
        <aside className="projects-introduction flex flex-col justify-center max-w-xl lg:max-w-none">
            <motion.div
                ref={ref}
                variants={textVariant(0)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}>
                <p className="text-[#FF7F50] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
                    Selected Work
                </p>
                <h2 className={customTailwind.sectionHeadText + " gradient-title-text"}>Projects</h2>
            </motion.div>

            <motion.p
                ref={ref}
                variants={fadeIn("", "", 0.3, 4)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className='text-[#C0C0C0] text-[17px] leading-[30px] mt-5 max-w-md'
            >
                {projectOverView.paragraph}
            </motion.p>

            <motion.div
                variants={fadeIn("", "", 0.55, 2)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="mt-8 grid grid-cols-2 gap-4 max-w-sm"
            >
                <div className="border-l border-[#FF7F50]/70 pl-4">
                    <p className="text-white text-3xl font-bold leading-none">{projects.length}</p>
                    <p className="text-[#9CA3AF] text-sm mt-2">Projects</p>
                </div>
                <div className="border-l border-sky-300/60 pl-4">
                    <p className="text-white text-3xl font-bold leading-none">{projectTypes.length}</p>
                    <p className="text-[#9CA3AF] text-sm mt-2">Categories</p>
                </div>
            </motion.div>

            <motion.div
                variants={fadeIn("", "", 0.75, 2)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="mt-7 flex flex-wrap gap-2 max-w-md"
            >
                {projectTypes.map((type) => (
                    <span
                        key={type}
                        className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-sm text-[#D7DCE8]"
                    >
                        {type}
                    </span>
                ))}
            </motion.div>
        </aside>
    );
}

export default ProjectIntroduction;
