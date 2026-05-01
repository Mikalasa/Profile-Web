import { motion } from 'framer-motion';
import {heroText} from "../../constants/config-web-paragraph";


function HeroCardMobile() {
    return (
        <motion.div
            className="mobile-hero-card-wrap"
            initial={{opacity: 0, y: 24, scale: 0.96}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 1.35, type: 'spring', damping: 14, stiffness: 90}}
        >
            <section className="mobile-hero-card" aria-label="Hero introduction">
                <p className="mobile-hero-kicker">Creative Developer</p>
                <h1 className="mobile-hero-title">
                    {heroText.title_f}
                    <span>{heroText.title_l}</span>
                </h1>
                <p className="mobile-hero-subtitle">
                    {heroText.description}
                </p>
            </section>
        </motion.div>

    );
}

export default HeroCardMobile;
