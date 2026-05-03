import React from "react";
import {Spotlight} from "./Spotlight";

export function SpotlightPreview() {

    return (
        <div className="iframe-hero w-full rounded-md flex items-center justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <Spotlight
                className="-top-40 left-0 md:left-40 md:-top-24"
                fill="white"
            />
            <div className="p-4 max-w-5xl mx-auto relative z-10 w-full">
                <h1 className="iframe-hero-title font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                    About Me.
                </h1>
                <p className="iframe-hero-copy mt-5 font-normal text-neutral-300 max-w-lg text-center mx-auto">
                    Let's code to build the world
                </p>
            </div>
        </div>
    );
}
