import React, { useEffect, useState, useContext } from "react";
import { customTailwind } from "../../constants/custom-tailwind";
import { navLinks } from "../../constants/config-web-paragraph";
import { menu, close } from "../../constants/config-web-paragraph";
import { AutoScrollContext } from "../../utility/AutoScrollContext";

const Navbar = () => {
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { setIsNavClick } = useContext(AutoScrollContext);

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

    const handleNavClick = (e, navId, navTitle) => {
        e.preventDefault();
        setIsNavClick(true);
        setActive(navTitle);

        const el = document.getElementById(navId);
        if (el) el.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => setIsNavClick(false), 2000);
        if (toggle) setToggle(false); // close mobile menu
    };

    return (
        <nav
            id="navbar"
            className={`${customTailwind.paddingX} w-[92%] sm:w-4/5 fixed top-4 left-1/2 -translate-x-1/2 z-20 glass ${
                scrolled ? "glass--scrolled" : ""
            } rounded-2xl overflow-hidden glass--card h-[70px] flex items-center`}
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
                            setActive("");
                            setIsNavClick(true);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            setTimeout(() => setIsNavClick(false), 500);
                        }}
                    >
                        <p className="text-white text-[18px] font-bold cursor-pointer flex">
                            Xingyi&nbsp;<span className="sm:block hidden">|&nbsp;Developer</span>
                        </p>
                    </a>
                </div>

                {/* Desktop nav */}
                <ul className="list-none hidden sm:flex flex-row gap-10">
                    {navLinks.map((nav) => (
                        <li
                            key={nav.id}
                            className="navbar-item hover:text-gray-300 text-white text-[18px] font-medium cursor-pointer"
                        >
                            <a href={`#${nav.id}`} onClick={(e) => handleNavClick(e, nav.id, nav.title)}>
                                {nav.title}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile menu button + dropdown */}
                <div className="sm:hidden flex flex-1 justify-end items-center">
                    <button
                        aria-label="Toggle menu"
                        onClick={() => setToggle((t) => !t)}
                        className="p-2 rounded-xl active:scale-95 transition"
                    >
                        <img
                            src={toggle ? close : menu}
                            alt="menu"
                            className="w-[28px] h-[28px] object-contain"
                        />
                    </button>

                    <div
                        className={`${
                            !toggle ? "hidden" : "flex"
                        } p-6 glass-panel absolute top-20 right-0 mx-4 my-2 min-w-[160px] z-40 rounded-2xl`}
                    >
                        <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
                            {navLinks.map((nav) => (
                                <li
                                    key={nav.id}
                                    className={`font-poppins font-medium cursor-pointer text-[16px] ${
                                        active === nav.title ? "text-gray-300" : "text-white"
                                    }`}
                                >
                                    <a href={`#${nav.id}`} onClick={(e) => handleNavClick(e, nav.id, nav.title)}>
                                        {nav.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;