import React, { useEffect, useState } from "react";
import { customTailwind } from "../../constants/custom-tailwind";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [toggle, setToggle] = useState(false);

    // Smooth + performant scroll listener
    useEffect(() => {
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 12); // snappy material change
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll(); // set initial
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            id="navbar"
            className={`${customTailwind.paddingX} w-[92%] sm:w-4/5 fixed top-4 left-1/2 -translate-x-1/2 z-20 glass ${
                scrolled ? "glass--scrolled" : ""
            } rounded-2xl overflow-visible sm:overflow-hidden glass--card h-[70px] flex items-center`}
        >
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                {/* Brand */}
                <div className="flex gap-4">
                    <img
                        src={process.env.PUBLIC_URL + "/prod-favicon.png"}
                        className="h-[32px] w-[32px]"
                        alt="Logo"
                    />
                    <a
                        href="/"
                        className="navbar-item flex items-center gap-2"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                    >
                        <p className="text-white text-[18px] font-bold cursor-pointer flex">
                            Xingyi&nbsp;<span className="sm:block hidden"></span>
                        </p>
                    </a>
                </div>

                {/* Desktop nav */}
                <ul className="list-none hidden sm:flex flex-row gap-10">
                    <li className="navbar-item hover:text-gray-300 text-white text-[18px] font-medium cursor-pointer">
                        <a href="https://github.com/Mikalasa" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    </li>
                    <li className="navbar-item hover:text-gray-300 text-white text-[18px] font-medium cursor-pointer">
                        <a href="https://medium.com/@xingyi-posts" target="_blank" rel="noopener noreferrer">
                            Medium
                        </a>
                    </li>
                    <li className="navbar-item hover:text-gray-300 text-white text-[18px] font-medium cursor-pointer">
                        <a href="https://www.behance.net/xingyixxx" target="_blank" rel="noopener noreferrer">
                            Behance
                        </a>
                    </li>
                </ul>

                {/* Mobile hamburger toggle */}
                <div className="sm:hidden flex flex-1 justify-end items-center relative">
                    <button
                        onClick={() => setToggle(!toggle)}
                        className="text-white text-[24px] font-bold cursor-pointer focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {/* Hamburger icon */}
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {toggle ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                    <div
                        className={`${
                            toggle ? "flex" : "hidden"
                        } absolute top-20 right-0 flex-col glass glass--card rounded-xl w-40 py-4 shadow-lg z-30`}
                    >
                        <ul className="flex flex-col gap-4 px-4">
                            <li>
                                <a
                                    href="https://github.com/Mikalasa"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setToggle(false)}
                                    className="text-white text-[18px] font-medium cursor-pointer block"
                                >
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://medium.com/@xingyi-posts"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setToggle(false)}
                                    className="text-white text-[18px] font-medium cursor-pointer block"
                                >
                                    Medium
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.behance.net/xingyixxx"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setToggle(false)}
                                    className="text-white text-[18px] font-medium cursor-pointer block"
                                >
                                    Behance
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;