import {Html} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import React, {useEffect, useRef, useState} from "react";

function Flat() {
    const mockupImage = process.env.PUBLIC_URL + '/3DTexture/mockup_iphone.png';
    const imgRef = useRef(null);
    const [iframeHeight, setIframeHeight] = useState(0);
    const [loadIframe, setLoadIframe] = useState(false);

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

    useEffect(() => {
        let idleId;
        const delayId = window.setTimeout(() => {
            const showIframe = () => setLoadIframe(true);

            if ("requestIdleCallback" in window) {
                idleId = window.requestIdleCallback(showIframe, { timeout: 1200 });
            } else {
                showIframe();
            }
        }, 900);

        return () => {
            window.clearTimeout(delayId);
            if (idleId && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId);
            }
        };
    }, []);

    function handleImageLoad() {
        if (imgRef.current) {
            const imgHeight = imgRef.current.clientHeight;
            setIframeHeight(imgHeight * 0.95);
        }
    }

    return (
    <div className="flat-bg my-10">
        <Canvas>
            <Html
                wrapperClass="webgl-iframe-wrapper"
                distanceFactor={6.2}
            >
                <div className="iframe-flat-container h-full">
                    <img
                        ref={imgRef}
                        src={mockupImage}
                        alt="Device mockup"
                        className="mockup-image"
                        onLoad={handleImageLoad}
                    />
                    {loadIframe && (
                        <iframe
                            title={"iframe-flat"}
                            className="webgl-iframe-flat"
                            loading="lazy"
                            src="https://mikalasa.github.io/Profile-Web/IframeWeb/"
                            style={{ height: `${iframeHeight}px` }}
                        />
                    )}
                </div>
            </Html>
        </Canvas>
    </div>
  );
}

export default Flat;
