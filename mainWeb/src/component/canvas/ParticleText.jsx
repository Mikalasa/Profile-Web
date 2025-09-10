import React, { useEffect, useRef } from 'react';
import Effect from '../../utility/effect';

const ParticleText = ({ text, fontSize, pixGap}) => {
    const canvasRef = useRef(null);
    const effectRef = useRef(null);
    const animationFrameId = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // 初始化效果
        effectRef.current = new Effect(ctx, canvas.width, canvas.height, fontSize, pixGap);
        effectRef.current.wrapText(text);

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            effectRef.current.mouse.x = e.clientX - rect.left;
            effectRef.current.mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            effectRef.current.mouse.x = null;
            effectRef.current.mouse.y = null;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            effectRef.current.resize(canvas.width, canvas.height);
            effectRef.current.wrapText(text);
        };
        window.addEventListener('resize', handleResize);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            effectRef.current.render();
            animationFrameId.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, [text]);

    return <canvas ref={canvasRef} style={{ background: 'black' }} />;
};

export default ParticleText;
