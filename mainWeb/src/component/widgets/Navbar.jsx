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
                            setActive("");
                            setIsNavClick(true);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            setTimeout(() => setIsNavClick(false), 500);
                        }}
                    >
                        <p className="text-white text-[18px] font-bold cursor-pointer flex">
                            Xingyi&nbsp;<span className="sm:block hidden"></span>
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
                        style={{
                            WebkitBackdropFilter: "saturate(190%) blur(50px)",
                            backdropFilter: "saturate(190%) blur(50px)",
                            background: "rgba(16,18,27,0.72)",
                        }}
                        className={`${
                            !toggle ? "hidden" : "flex"
                        } absolute top-20 right-0 z-40 mx-4 my-2 min-w-[200px] flex-col rounded-2xl overflow-hidden glass glass--card ${
                            scrolled ? "glass--scrolled" : ""
                        } p-4`}
                    >
                        <div
                            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/45"
                            aria-hidden="true"
                        />
                        <div className="relative z-10">
                            <ul className="list-none flex flex-col gap-1">
                                {navLinks.map((nav) => (
                                    <li
                                        key={nav.id}
                                        className={`w-full rounded-xl px-4 py-3 text-[16px] font-semibold tracking-tight transition ${
                                            active === nav.title
                                                ? "bg-white/15 text-white"
                                                : "text-white/85 hover:bg-white/10 hover:text-white"
                                        }`}
                                    >
                                        <a className="block w-full" href={`#${nav.id}`} onClick={(e) => handleNavClick(e, nav.id, nav.title)}>
                                            {nav.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;