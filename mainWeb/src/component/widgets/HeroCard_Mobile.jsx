import { motion } from 'framer-motion';
import {customTailwind} from "../../constants/custom-tailwind";
import {isMobile} from "react-device-detect";
import {heroText} from "../../constants/config-web-paragraph";


function HeroCardMobile() {
    const isMobileCanvasCoverDiv = (
        <>
            <div className="isMobileCanvasCoverDiv-right"></div>
            <div className="isMobileCanvasCoverDiv-buttom"></div>
        </>
    )

    return (
        <motion.div
            id="hero-card-bg"
            className={` ${customTailwind.paddingX} flex flex-row items-start gap-5`}
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 5, type: 'spring', damping: 10, stiffness: 100}}
        >
            <div>
                <div id="hero-card-top">
                    <div
                        className="hero-card"
                    >
                        <div className='hero-card-title flex flex-col items-center mt-5'>
                            <div className='w-5 h-5 rounded-full bg-[#FF7F50]'/>
                            <div className='w-1 sm:h-80 h-40 violet-gradient'/>
                        </div>
                        <motion.div className={"hero-card-des"}>
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

            {isMobile ? (
                isMobileCanvasCoverDiv
            ) : null}
        </motion.div>

    );
}

export default HeroCardMobile;