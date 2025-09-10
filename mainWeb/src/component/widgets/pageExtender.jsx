import { motion } from 'framer-motion';
import { textVariant } from "../../utility/custom-motion";
import { useInView } from 'react-intersection-observer';

function PageExtender() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-100px 0px",
    });
    return (
        <div id="about" className="projects-introduction mt-10 flex flex-col items-center justify-center mb-24">
            <motion.div
                ref={ref}
                className={`mt-14`} variants={textVariant(0)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}>
            </motion.div>
        </div>
    );
}

export default PageExtender;
