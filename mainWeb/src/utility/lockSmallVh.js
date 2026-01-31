// utility/lockSmallVh.js
export function lockMinViewportHeightVar(varName = "--app-svh") {
    // 只在移动端启用（你已经用了 react-device-detect，这里再保险一层）
    const isMobile =
        (navigator.maxTouchPoints || 0) > 0 &&
        window.matchMedia("(max-width: 1024px)").matches;

    if (!isMobile) return () => {};

    // 从 HTML head 里预先写入的值开始（避免首屏闪）
    let minH = parseInt(
        getComputedStyle(document.documentElement)
            .getPropertyValue(varName),
        10
    );

    if (!minH || Number.isNaN(minH)) {
        minH = Math.round(
            window.visualViewport?.height || window.innerHeight
        );
        document.documentElement.style.setProperty(varName, `${minH}px`);
    }

    let rafId = 0;

    const readHeight = () =>
        Math.round(window.visualViewport?.height || window.innerHeight);

    const apply = () => {
        rafId = 0;
        const h = readHeight();

        // 只减不增：永远锁在“地址栏 + 底栏都在”的高度
        if (h > 0 && h < minH) {
            minH = h;
            document.documentElement.style.setProperty(varName, `${minH}px`);
        }
    };

    const schedule = () => {
        if (rafId) return;
        rafId = requestAnimationFrame(apply);
    };

    window.addEventListener("resize", schedule, { passive: true });
    window.visualViewport?.addEventListener("resize", schedule, { passive: true });

    // 横竖屏切换时重置（否则可能锁到旧方向的高度）
    const onOrientationChange = () => {
        minH = readHeight();
        document.documentElement.style.setProperty(varName, `${minH}px`);
    };

    window.addEventListener("orientationchange", onOrientationChange, { passive: true });

    return () => {
        window.removeEventListener("resize", schedule);
        window.visualViewport?.removeEventListener("resize", schedule);
        window.removeEventListener("orientationchange", onOrientationChange);
        if (rafId) cancelAnimationFrame(rafId);
    };
}