import React from "react";

const MobileWarningModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="group relative w-11/12 sm:w-2/3 md:w-1/3 overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
                {/* Subtle liquid-glass highlights */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="lg-blob lg-blob-1 absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
                    <div className="lg-blob lg-blob-2 absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
                    <div className="lg-shimmer absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-white/10" />
                </div>

                <style>{`
/* Liquid-glass motion (hover-only) */
.lg-shimmer {
  transform: translate3d(-12%, -8%, 0) scale(1.15);
  opacity: 0.9;
  filter: saturate(1.05);
  will-change: transform;
  animation: lg-shimmer-drift 6s ease-in-out infinite;
  animation-play-state: paused;
}

.lg-blob {
  will-change: transform;
  animation: lg-blob-float 7s ease-in-out infinite;
  animation-play-state: paused;
}

.lg-blob-1 { animation-duration: 7.5s; }
.lg-blob-2 { animation-duration: 9s; }

/* Enable motion only on hover */
.group:hover .lg-shimmer,
.group:hover .lg-blob {
  animation-play-state: running;
}

@keyframes lg-shimmer-drift {
  0%   { transform: translate3d(-12%, -8%, 0) scale(1.15); }
  50%  { transform: translate3d(10%, 6%, 0) scale(1.18); }
  100% { transform: translate3d(-12%, -8%, 0) scale(1.15); }
}

@keyframes lg-blob-float {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(10px, -12px, 0) scale(1.03); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}
`}</style>
                <div className="relative">
                    <h2 className="mb-3 text-2xl font-semibold tracking-tight text-white">
                        Notice
                    </h2>
                    <p className="mb-6 text-white/80">
                        For the best experience, please visit this site on a desktop.
                    </p>
                    <button
                        onClick={onClose}
                        className="w-full rounded-xl border border-white/20 bg-white/15 px-4 py-2.5 font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition hover:bg-white/25 active:scale-[0.99]"
                    >
                        Got It
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileWarningModal;
