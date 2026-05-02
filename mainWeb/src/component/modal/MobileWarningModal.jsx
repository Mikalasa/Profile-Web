import React from "react";

const MobileWarningModal = ({ onClose }) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-md"
            role="presentation"
        >
            <div
                className="relative w-full max-w-[23rem] overflow-hidden rounded-[22px] border border-white/20 bg-[#070b12]/80 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.65),0_0_0_1px_rgba(96,165,250,0.12)] backdrop-blur-2xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="mobile-warning-title"
            >
                <div
                    className="pointer-events-none absolute inset-0 opacity-70"
                    style={{
                        background:
                            "radial-gradient(circle at 12% 0%, rgba(255,127,80,0.22), transparent 38%), radial-gradient(circle at 100% 8%, rgba(125,211,252,0.16), transparent 34%), linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.035))",
                    }}
                />
                <div
                    className="pointer-events-none absolute inset-0 opacity-25"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, rgba(255,255,255,0.16) 1px, transparent 1px)",
                        backgroundSize: "18px 18px",
                    }}
                />
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />

                <div className="relative">
                    <p className="mb-2 text-[0.7rem] font-extrabold uppercase leading-none tracking-[0.22em] text-[#FFB199]">
                        Display Notice
                    </p>
                    <h2
                        id="mobile-warning-title"
                        className="mb-3 text-2xl font-black leading-tight text-white"
                    >
                        Desktop mode shines brighter
                    </h2>
                    <p className="mb-6 text-[0.98rem] leading-7 text-white/75">
                        For the best experience, please visit this site on a desktop.
                    </p>
                    <button
                        onClick={onClose}
                        className="w-full rounded-xl border border-[#FF7F50]/35 bg-[#FF7F50]/90 px-4 py-3 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(255,127,80,0.24)] transition hover:bg-[#ff8f68] active:scale-[0.99]"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileWarningModal;
