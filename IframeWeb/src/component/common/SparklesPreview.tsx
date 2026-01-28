"use client";
import React from "react";

export function SparklesPreview() {
    return (
        <div className="h-[15rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
            <h1 className="text-4xl md:text-9xl lg:text-11xl font-bold text-center text-neutral-300 relative z-20 mb-2">
                Thanks
            </h1>
            <div className="my-10 w-[40rem] relative">
                {/* Gradients */}
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
        </div>
    );
}
