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
        <aside className="projects-introduction">
            <motion.div
                ref={ref}
                variants={textVariant(0)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}>
                <p className="projects-eyebrow">
                    Selected Work
                </p>
                <h2 className={customTailwind.sectionHeadText + " projects-heading gradient-title-text"}>Projects</h2>
            </motion.div>

            <motion.p
                ref={ref}
                variants={fadeIn("", "", 0.3, 4)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className='projects-copy'
            >
                {projectOverView.paragraph}
            </motion.p>

            <motion.div
                variants={fadeIn("", "", 0.55, 2)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="projects-metrics"
            >
                <div className="projects-metric projects-metric-warm">
                    <p>{projects.length}</p>
                    <span>Projects</span>
                </div>
                <div className="projects-metric projects-metric-cool">
                    <p>{projectTypes.length}</p>
                    <span>Categories</span>
                </div>
            </motion.div>

            <motion.div
                variants={fadeIn("", "", 0.75, 2)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="projects-type-list"
            >
                {projectTypes.map((type) => (
                    <span
                        key={type}
                        className="projects-type-chip"
                    >
                        {type}
                    </span>
                ))}
            </motion.div>
        </aside>
    );
}

export default ProjectIntroduction;
