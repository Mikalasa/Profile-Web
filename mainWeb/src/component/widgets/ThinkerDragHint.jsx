import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INTERACTION_EVENT = "thinker-model-interacted";

function ThinkerDragHint() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const showTimer = window.setTimeout(() => setVisible(true), 200);
        let autoHideScheduleTimer;
        let hideTimer;

        const dismissHint = () => {
            window.clearTimeout(autoHideScheduleTimer);
            window.clearTimeout(hideTimer);
            setVisible(false);
        };

        const scheduleAutoHide = () => {
            hideTimer = window.setTimeout(dismissHint, 5200);
        };

        window.addEventListener(INTERACTION_EVENT, dismissHint);
        autoHideScheduleTimer = window.setTimeout(scheduleAutoHide, 200);

        return () => {
            window.clearTimeout(showTimer);
            window.clearTimeout(autoHideScheduleTimer);
            window.clearTimeout(hideTimer);
            window.removeEventListener(INTERACTION_EVENT, dismissHint);
        };
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="thinker-drag-hint"
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="thinker-drag-hint-icon" aria-hidden="true">
                        <span className="thinker-drag-hint-dot" />
                    </span>
                    <span>Drag to rotate</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ThinkerDragHint;
