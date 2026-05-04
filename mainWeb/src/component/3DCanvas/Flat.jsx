import React, {useCallback, useEffect, useRef, useState} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useResponsiveViewport } from "../../utility/useResponsiveViewport";

const TABLET_SCREEN_FRAME = {
    left: 0.043,
    top: 0.061,
    width: 0.914,
    height: 0.876,
};

const PHONE_SCREEN_SCALE = {
    width: 0.885,
    height: 0.95,
};

function Flat() {
    const useTabletMockup = useResponsiveViewport(
        "(min-width: 768px) and (max-width: 1024px), (min-width: 1025px) and (max-width: 1368px) and (pointer: coarse)"
    );
    const mockupImage = process.env.PUBLIC_URL + (
        useTabletMockup
            ? '/3DTexture/mockup_ipad.png'
            : '/3DTexture/mockup_iphone.png'
    );
    const deviceClassName = useTabletMockup ? "device-mockup-tablet" : "device-mockup-phone";
    const imgRef = useRef(null);
    const [iframeSize, setIframeSize] = useState({ width: 0, height: 0 });
    const [loadIframe, setLoadIframe] = useState(false);
    const [showSwipeHint, setShowSwipeHint] = useState(false);

    const calculateIframeSize = useCallback(() => {
        if (!imgRef.current) {
            return null;
        }

        const { width: imgWidth, height: imgHeight } = imgRef.current.getBoundingClientRect();
        return useTabletMockup
            ? {
                width: imgWidth * TABLET_SCREEN_FRAME.width,
                height: imgHeight * TABLET_SCREEN_FRAME.height,
                left: imgWidth * TABLET_SCREEN_FRAME.left,
                top: imgHeight * TABLET_SCREEN_FRAME.top,
            }
            : {
                width: imgWidth * PHONE_SCREEN_SCALE.width,
                height: imgHeight * PHONE_SCREEN_SCALE.height,
            };
    }, [useTabletMockup]);

    useEffect(() => {
        setIframeSize({ width: 0, height: 0 });
    }, [mockupImage]);

    useEffect(() => {
        function updateIframeSize() {
            const nextSize = calculateIframeSize();
            if (nextSize) {
                setIframeSize(nextSize);
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
    }, [calculateIframeSize]);

    useEffect(() => {
        let idleId;
        const delayId = window.setTimeout(() => {
            const showIframe = () => {
                setLoadIframe(true);
                window.setTimeout(() => setShowSwipeHint(true), 450);
            };

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

    useEffect(() => {
        if (!showSwipeHint) {
            return undefined;
        }

        const hideTimer = window.setTimeout(() => setShowSwipeHint(false), 7200);
        return () => window.clearTimeout(hideTimer);
    }, [showSwipeHint]);

    function handleImageLoad() {
        const nextSize = calculateIframeSize();
        if (nextSize) {
            setIframeSize(nextSize);
        }
    }

    const iframeStyle = iframeSize.width && iframeSize.height
        ? {
            width: `${iframeSize.width}px`,
            height: `${iframeSize.height}px`,
            ...(useTabletMockup
                ? {
                    left: `${iframeSize.left}px`,
                    top: `${iframeSize.top}px`,
                    transform: "none",
                }
                : {}),
        }
        : undefined;

    const dismissSwipeHint = () => setShowSwipeHint(false);

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
                <div
                    className={`flat-iframe-screen-layer ${useTabletMockup ? "flat-iframe-screen-tablet" : "flat-iframe-screen-phone"}`}
                    style={iframeStyle}
                    onPointerEnter={dismissSwipeHint}
                    onPointerDown={dismissSwipeHint}
                    onTouchStart={dismissSwipeHint}
                >
                    <iframe
                        title={"iframe-flat"}
                        className={`flat-iframe-content ${useTabletMockup ? "webgl-iframe-tablet" : ""}`}
                        loading="lazy"
                        src="https://mikalasa.github.io/Profile-Web/IframeWeb/"
                    />
                    <AnimatePresence>
                        {showSwipeHint && (
                            <motion.div
                                className="flat-iframe-swipe-hint"
                                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="flat-iframe-swipe-icon" aria-hidden="true">
                                    <span />
                                </span>
                                <span>Swipe inside screen</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    </div>
  );
}

export default Flat;
