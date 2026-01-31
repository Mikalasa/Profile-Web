import { motion } from 'framer-motion';
import {customTailwind} from "../../constants/custom-tailwind";
import { fadeIn, textVariant } from "../../utility/custom-motion";
import { projectOverView } from "../../constants/config-web-paragraph";
import { useInView } from 'react-intersection-observer';

function ProjectIntroduction() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-100px 0px",
    });
    return (
        <div className="projects-introduction py-4 flex flex-col justify-center">
            <motion.div
                ref={ref}
                className={`mt-14`} variants={textVariant(0)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}>
                <h2 className={customTailwind.sectionHeadText + " gradient-title-text" + " mt-6"}>Projects</h2>
            </motion.div>

            <motion.p
                ref={ref}
                variants={fadeIn("", "", 0.3, 4)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className='text-[#C0C0C0] text-[17px] leading-[30px]'
            >
                {projectOverView.paragraph}
            </motion.p>
        </div>
    );
}

export default ProjectIntroduction;
