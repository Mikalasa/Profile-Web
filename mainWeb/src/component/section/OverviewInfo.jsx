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
        <>
            <motion.div
                ref={ref}
                variants={textVariant(0)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}>
                <h2 className={customTailwind.sectionHeadText + " mt-10 sm:mt-5 py-5 sm:py-1 gradient-title-text"}>Overview</h2>
            </motion.div>

            <motion.p
                ref={ref}
                variants={fadeIn("", "", 0.3, 4)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className='mt-4 mb-4 text-[#C0C0C0] text-[17px] max-w-4xl leading-[30px] the-paragraph'
            >
                {IntroductionOverView.paragraph}
            </motion.p>
        </>
    );
}

export default OverviewInfo;
