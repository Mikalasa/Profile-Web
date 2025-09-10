import {Html} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import React, {useEffect, useRef, useState} from "react";

function Flat() {
    const mockupImage = process.env.PUBLIC_URL + '/mockup_iphone.png';
    const imgRef = useRef(null);
    const [iframeHeight, setIframeHeight] = useState(0);

    useEffect(() => {
        function updateIframeHeight() {
            if (imgRef.current) {
                const imgHeight = imgRef.current.clientHeight;
                setIframeHeight(imgHeight * 0.95);
            }
        }

        window.addEventListener('resize', updateIframeHeight);
        return () => {
            window.removeEventListener('resize', updateIframeHeight);
        };
    }, []);

    function handleImageLoad() {
        if (imgRef.current) {
            const imgHeight = imgRef.current.clientHeight;
            setIframeHeight(imgHeight * 0.95);
        }
    }

    return (
    <div className="flat-bg">
        <Canvas>
            <Html
                wrapperClass="webgl-iframe-wrapper"
            >
                <div className="iframe-flat-container">
                    <img
                        ref={imgRef}
                        src={mockupImage}
                        alt="Device mockup"
                        className="mockup-image"
                        onLoad={handleImageLoad}
                    />
                    <iframe
                        title={"iframe-flat"}
                        className="webgl-iframe-flat"
                        src="https://mikalasa.github.io/ProfileWeb-Iframe-About/"
                        style={{ height: `${iframeHeight}px` }}
                    />
                </div>
            </Html>
        </Canvas>
    </div>
  );
}

export default Flat;