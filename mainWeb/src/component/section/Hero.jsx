import TheThinkerCanvas from "../3DCanvas/TheThinker.jsx";
import MouseScrollicon from "../widgets/MouseScrollicon.jsx";
import HeroCard from "../widgets/HeroCard.jsx";
import HeroCard_Mobile from "../widgets/HeroCard_Mobile.jsx";
import { isMobile } from "react-device-detect";


function Hero() {
    return (
        <section id='hero' className="hero-container h-[var(--app-svh)] md:h-svh layout-container">
            {isMobile ? <HeroCard_Mobile/> : <HeroCard/>}
            <TheThinkerCanvas/>
            <MouseScrollicon/>
        </section>
    );
}

export default Hero;