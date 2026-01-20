import { motion } from 'framer-motion';
import {customTailwind} from "../../constants/custom-tailwind";
import {isMobile} from "react-device-detect";
import {heroText} from "../../constants/config-web-paragraph";


function HeroCardMobile() {
    return (
        <motion.div
            id="hero-card-bg-mobile"
            className={` ${customTailwind.paddingX} flex flex-row items-start gap-5`}
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 5, type: 'spring', damping: 10, stiffness: 100}}
        >
            <div>
                <div id="hero-card-top w-full">
                    <div className="hero-card-mobile">
                        <motion.div className={"w-full relative"}>
                            <h1 className={`${customTailwind.heroHeadText} text-white`}>{heroText.title_f}
                                <span className='text-[#FF7F50]'>{heroText.title_l}</span>
                            </h1>
                            <br/>
                            <p className={`${customTailwind.heroSubText} mt-2 text-white-100`}>
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