import React from "react";

const DesktopViewportNotice = () => {
    return (
        <div
            className="desktop-viewport-notice fixed bottom-5 left-1/2 z-40 w-[min(calc(100vw-2rem),24rem)] -translate-x-1/2"
            aria-live="polite"
        >
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-[#070b12]/95 px-4 py-3 text-white shadow-[0_18px_52px_rgba(0,0,0,0.68),0_0_0_1px_rgba(96,165,250,0.16)] backdrop-blur-2xl">
                <div
                    className="pointer-events-none absolute inset-0 opacity-55"
                    style={{
                        background:
                            "radial-gradient(circle at 8% 0%, rgba(255,127,80,0.16), transparent 42%), radial-gradient(circle at 100% 20%, rgba(125,211,252,0.12), transparent 36%)",
                    }}
                />
                <div className="relative flex items-start gap-3">
                    <div className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-[#FF7F50] shadow-[0_0_18px_rgba(255,127,80,0.75)]" />
                    <div>
                        <p className="text-[0.72rem] font-extrabold uppercase leading-none tracking-[0.18em] text-[#FFB199]">
                            Compact View
                        </p>
                        <p className="mt-1.5 text-sm font-semibold leading-6 text-white/90">
                            Widen the browser window to unlock the full 3D interactive experience.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopViewportNotice;
