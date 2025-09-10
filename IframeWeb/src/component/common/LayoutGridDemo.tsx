"use client";
import React from "react";
import {LayoutGrid} from "./Layout-grid";

export function LayoutGridDemo() {
    return (
        <div className="h-screen py-10 sm:py-20 w-full LayoutGridDemo relative">
            <LayoutGrid cards={cards} />
        </div>
    );
}

const SkeletonOne = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">Sword</p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                A sword, a chessboard, the tranquil forest, the elegance of simplicity, as time slips by.
            </p>
        </div>
    );
};

const SkeletonTwo = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">The Cyber Life</p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                A robot undergoing repairs. It took a month of modeling,
                using mouse modeling instead of 3D sculpting, an interesting practice experience.
            </p>
        </div>
    );
};
const SkeletonThree = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">Little Robot</p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                A tiny robotic bug walks across the desolate Gobi,
                its large eye curiously observing the world around it.
            </p>
        </div>
    );
};
const SkeletonFour = () => {
    return (
        <div>
            <p className="font-bold text-4xl text-white">Earth</p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Humanity's home, viewed from space, with the scattering of the atmosphere,
                the white clouds, the blue seawater, this unique home.
            </p>
        </div>
    );
};

const cards = [
    {
        id: 1,
        content: <SkeletonOne />,
        className: "md:col-span-2",
        thumbnail: "./1.webp"
    },
    {
        id: 2,
        content: <SkeletonTwo />,
        className: "col-span-1",
        thumbnail: "./2.webp"
    },
    {
        id: 3,
        content: <SkeletonThree />,
        className: "col-span-1",
        thumbnail: "./3.webp"
    },
    {
        id: 4,
        content: <SkeletonFour />,
        className: "md:col-span-2",
        thumbnail: "./4.webp"
    },
];
