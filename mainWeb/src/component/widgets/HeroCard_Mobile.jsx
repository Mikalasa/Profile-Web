import { motion } from 'framer-motion';
import {customTailwind} from "../../constants/custom-tailwind";
import {heroText} from "../../constants/config-web-paragraph";


function HeroCardMobile() {
    return (
        <motion.div
            id="hero-card-bg-mobile"
            className={`${customTailwind.paddingX} flex flex-row items-start gap-5`}
            initial={{opacity: 0, y: 24, scale: 0.96}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 1.35, type: 'spring', damping: 14, stiffness: 90}}
        >
            <div>
                <div id="hero-card-top w-full">
                    <div className="hero-card-mobile">
                        <motion.div className="w-full relative">
                            <p className="hero-card-eyebrow">Creative Developer</p>
                            <h1 className={`${customTailwind.heroHeadText} text-white`}>{heroText.title_f}
                                <span className='text-[#FF7F50]'>{heroText.title_l}</span>
                            </h1>
                            <p className={`${customTailwind.heroSubText} hero-card-subtitle`}>
                                {heroText.description}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>

    );
}

export default HeroCardMobile;
