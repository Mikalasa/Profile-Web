import {isMobile} from "react-device-detect";
import WebglPc from "../3DCanvas/WebglPc.jsx";
import Flat from "../3DCanvas/Flat.jsx";
import {useEffect, useRef, useState} from "react";
import { useResponsiveViewport } from "../../utility/useResponsiveViewport";

function About() {
    const [loadWebglPc, setLoadWebglPc] = useState(false);
    const webglPcRef = useRef(null);
    const isNarrowViewport = useResponsiveViewport();
    const isTabletViewport = useResponsiveViewport("(min-width: 768px) and (max-width: 1024px)");
    const useFlatExperience = isMobile || isNarrowViewport || isTabletViewport;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setLoadWebglPc(true);
                    observer.unobserve(webglPcRef.current);
                }
            },
            { threshold: 0.1 }
        );
        if (webglPcRef.current) {
            observer.observe(webglPcRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const sectionClassName = useFlatExperience
        ? "about-container about-container-flat layout-container min-h-[var(--app-svh)] md:h-svh"
        : "about-container layout-container min-h-[var(--app-svh)] md:h-svh";

    return (
        <section id="about" ref={webglPcRef} className={sectionClassName}>
            {!useFlatExperience && loadWebglPc ? <WebglPc/> : loadWebglPc && <Flat/>}
        </section>
    );
}

export default About;
