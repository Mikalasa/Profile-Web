import React, { useEffect, useRef } from "react";

function Test() {
    const cardRef = useRef(null);
    const animationFrameId = useRef(null);

    useEffect(() => {
        let lastMousePosition = { x: 0, y: 0 };

        const handleMouseMove = (event) => {
            lastMousePosition = {
                x: event.pageX,
                y: event.pageY,
            };

            if (!animationFrameId.current) {
                animationFrameId.current = requestAnimationFrame(() => {
                    updateCardRotation(lastMousePosition);
                    animationFrameId.current = null; // 清空动画帧 ID
                });
            }
        };

        const updateCardRotation = ({ x, y }) => {
            const e = -(window.innerWidth / 2 - x) / 30;
            const n = (window.innerHeight / 2 - y) / 10;

            if (cardRef.current) {
                cardRef.current.style.transform = `rotateY(${e}deg) rotateX(${n}deg)`;
            }
        };

        const topElement = document.getElementById("hero-card-top");
        topElement.addEventListener("mousemove", handleMouseMove);

        // 清理事件监听器和动画帧
        return () => {
            topElement.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    return (
        <div id="hero-card-top" style={{ height: "100vh", width: "100vw" }}>
            <div className="hero-card-perspective">
                <div
                    className="hero-card"
                    ref={cardRef}
                >
                    <div className="hero-card-thumb"></div>
                    <h2>Virtual Reality</h2>
                    <span>Dreaming with your eyes open!</span>
                </div>
            </div>
        </div>
    );
}

export default Test;
