import { motion } from 'framer-motion';
import {customTailwind} from "../../constants/custom-tailwind";
import { fadeIn, textVariant } from "../../utility/custom-motion";
import {IntroductionOverView} from "../../constants/config-web-paragraph";
import { useInView } from 'react-intersection-observer';

function OverviewInfo() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-100px 0px",
    });
    return (
        <aside className="overview-info-container">
            <motion.div
                ref={ref}
                variants={textVariant(0)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}>
                <p className="overview-eyebrow">
                    Profile Snapshot
                </p>
                <h2 className={customTailwind.sectionHeadText + " overview-heading gradient-title-text"}>Overview</h2>
            </motion.div>

            <motion.p
                ref={ref}
                variants={fadeIn("", "", 0.3, 4)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className='overview-copy'
            >
                {IntroductionOverView.paragraph}
            </motion.p>

            <motion.div
                variants={fadeIn("", "", 0.55, 2)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="overview-interest-block"
            >
                <p className="overview-interest-label">Currently drawn to</p>
                <p className="overview-interest-copy">
                    AI development, framework design, and visual motion.
                </p>
            </motion.div>
        </aside>
    );
}

export default OverviewInfo;
