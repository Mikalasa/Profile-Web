import {isMobile} from "react-device-detect";
import WebglPc from "../canvas/WebglPc.jsx";
import Flat from "../canvas/Flat.jsx";
import {useEffect, useRef, useState} from "react";

function About() {
    useEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 100);
    }, []);
    const [loadWebglPc, setLoadWebglPc] = useState(false);
    const webglPcRef = useRef(null);

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
    return (
        <section id="about" ref={webglPcRef} className="about-container layout-container">
            {!isMobile && loadWebglPc ? <WebglPc/> : loadWebglPc && <Flat/>}
        </section>
    );
}

export default About;