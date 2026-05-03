"use client";
import React from "react";

export function SparklesPreview() {
    return (
        <section className="ending-page w-full overflow-hidden" aria-label="Ending animation">
            <div className="ending-system">
                <div className="orb-pulse">
                    <span className="signal-orbit signal-orbit-one" aria-hidden="true" />
                    <span className="signal-orbit signal-orbit-two" aria-hidden="true" />
                    <span className="orb-ring orb-ring-one" aria-hidden="true" />
                    <span className="orb-ring orb-ring-two" aria-hidden="true" />
                    <span className="signal-node signal-node-one" aria-hidden="true" />
                    <span className="signal-node signal-node-two" aria-hidden="true" />
                    <span className="signal-node signal-node-three" aria-hidden="true" />
                    <span className="orb-core" aria-hidden="true" />
                    <div className="glass-chip">
                        <span className="chip-light" aria-hidden="true" />
                        <span className="chip-name">Xingyi</span>
                        <span className="chip-scan" aria-hidden="true" />
                    </div>
                </div>
                <p>Signal Continues</p>
                <span className="signal-wave" aria-hidden="true" />
            </div>
        </section>
    );
}
