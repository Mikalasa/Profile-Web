import React, {useEffect, useRef, useState} from "react";
import { useResponsiveViewport } from "../../utility/useResponsiveViewport";

function Flat() {
    const useTabletMockup = useResponsiveViewport("(min-width: 768px) and (max-width: 1024px)");
    const mockupImage = process.env.PUBLIC_URL + (
        useTabletMockup
            ? '/3DTexture/mockup_ipad.png'
            : '/3DTexture/mockup_iphone.png'
    );
    const deviceClassName = useTabletMockup ? "device-mockup-tablet" : "device-mockup-phone";
    const iframeClassName = useTabletMockup ? "webgl-iframe-flat webgl-iframe-tablet" : "webgl-iframe-flat";
    const imgRef = useRef(null);
    const [iframeSize, setIframeSize] = useState({ width: 0, height: 0 });
    const [loadIframe, setLoadIframe] = useState(false);

    useEffect(() => {
        setIframeSize({ width: 0, height: 0 });
    }, [mockupImage]);

    useEffect(() => {
        function updateIframeSize() {
            if (imgRef.current) {
                const imgHeight = imgRef.current.clientHeight;
                const imgWidth = imgRef.current.clientWidth;
                setIframeSize({
                    width: imgWidth * (useTabletMockup ? 0.91 : 0.88),
                    height: imgHeight * (useTabletMockup ? 0.88 : 0.95),
                });
            }
        }

        const resizeObserver = new ResizeObserver(updateIframeSize);
        if (imgRef.current) {
            resizeObserver.observe(imgRef.current);
        }

        window.addEventListener('resize', updateIframeSize);
        updateIframeSize();
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateIframeSize);
        };
    }, [useTabletMockup]);

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
            const imgWidth = imgRef.current.clientWidth;
            setIframeSize({
                width: imgWidth * (useTabletMockup ? 0.91 : 0.88),
                height: imgHeight * (useTabletMockup ? 0.88 : 0.95),
            });
        }
    }

    return (
    <div className="flat-bg">
        <div className="iframe-flat-container h-full">
            <img
                ref={imgRef}
                src={mockupImage}
                alt="Device mockup"
                className={`mockup-image ${deviceClassName}`}
                onLoad={handleImageLoad}
            />
            {loadIframe && (
                <iframe
                    title={"iframe-flat"}
                    className={iframeClassName}
                    loading="lazy"
                    src="https://mikalasa.github.io/Profile-Web/IframeWeb/"
                    style={
                        iframeSize.width && iframeSize.height
                            ? {
                                width: `${iframeSize.width}px`,
                                height: `${iframeSize.height}px`,
                            }
                            : undefined
                    }
                />
            )}
        </div>
    </div>
  );
}

export default Flat;
