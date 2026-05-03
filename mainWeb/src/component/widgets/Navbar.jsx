import React, { useContext, useEffect, useRef, useState } from "react";
import { navLinks } from "../../constants/config-web-paragraph";
import { AutoScrollContext } from "../../utility/AutoScrollContext";

const externalLinks = [
    {
        title: "GitHub",
        href: "https://github.com/Mikalasa",
        icon: `${process.env.PUBLIC_URL}/socialIcon/github-mark.png`,
    },
    {
        title: "Medium",
        href: "https://medium.com/@xingyi-posts",
        icon: "https://cdn.simpleicons.org/medium/ffffff",
    },
    {
        title: "Behance",
        href: "https://www.behance.net/xingyixxx",
        icon: "https://cdn.simpleicons.org/behance/ffffff",
    },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const navRef = useRef(null);
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

    useEffect(() => {
        const sectionIds = ["hero", ...navLinks.map((link) => link.id)];
        let ticking = false;

        const updateActiveSection = () => {
            const sections = sectionIds
                .map((id) => document.getElementById(id))
                .filter(Boolean);

            if (!sections.length) return;

            const navHeight = navRef.current?.offsetHeight ?? 0;
            const anchorY = navHeight + window.innerHeight * 0.38;

            const currentSection = sections.find((section) => {
                const rect = section.getBoundingClientRect();
                return rect.top <= anchorY && rect.bottom > anchorY;
            });

            if (currentSection?.id) {
                setActiveSection(currentSection.id);
                return;
            }

            const closestSection = sections.reduce((closest, section) => {
                const rect = section.getBoundingClientRect();
                const distance = Math.abs(rect.top - anchorY);
                return distance < closest.distance ? { id: section.id, distance } : closest;
            }, { id: "hero", distance: Number.POSITIVE_INFINITY });

            setActiveSection(closestSection.id);
        };

        const requestUpdate = () => {
            if (ticking) return;

            ticking = true;
            window.requestAnimationFrame(() => {
                updateActiveSection();
                ticking = false;
            });
        };

        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);

        const initialUpdateId = window.setTimeout(updateActiveSection, 0);
        return () => {
            window.clearTimeout(initialUpdateId);
            window.removeEventListener("scroll", requestUpdate);
            window.removeEventListener("resize", requestUpdate);
        };
    }, []);

    useEffect(() => {
        const closeOnOutsideClick = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setToggle(false);
            }
        };

        const closeOnEsc = (event) => {
            if (event.key === "Escape") setToggle(false);
        };

        document.addEventListener("mousedown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEsc);
        return () => {
            document.removeEventListener("mousedown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEsc);
        };
    }, []);

    const scrollToSection = (id) => (event) => {
        event.preventDefault();
        const target = document.getElementById(id);
        if (!target) return;

        setIsNavClick(true);
        setActiveSection(id);
        setToggle(false);
        const targetTop = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: targetTop, behavior: "smooth" });
        window.setTimeout(() => setIsNavClick(false), 900);
    };

    const renderSectionLinks = (isMobileMenu = false) => (
        navLinks.map((link) => (
            <li key={link.id}>
                <a
                    href={`#${link.id}`}
                    onClick={scrollToSection(link.id)}
                    className={`navbar-item navbar-section-link ${
                        activeSection === link.id ? "navbar-item-active" : ""
                    } ${isMobileMenu ? "navbar-mobile-link" : ""}`}
                >
                    {link.title}
                </a>
            </li>
        ))
    );

    const renderExternalLinks = (isMobileMenu = false) => (
        externalLinks.map((link) => (
            <li key={link.href}>
                <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setToggle(false)}
                    aria-label={link.title}
                    className={`navbar-item navbar-external-link ${
                        isMobileMenu ? "navbar-mobile-link" : "navbar-external-icon-link"
                    }`}
                >
                    {isMobileMenu ? (
                        link.title
                    ) : (
                        <>
                            <img src={link.icon} alt="" aria-hidden="true" />
                            <span className="sr-only">{link.title}</span>
                        </>
                    )}
                </a>
            </li>
        ))
    );

    return (
        <nav
            ref={navRef}
            id="navbar"
            className={`navbar-shell fixed top-4 left-1/2 -translate-x-1/2 z-20 glass ${
                scrolled ? "glass--scrolled" : ""
            } glass--card`}
        >
            <div className="navbar-inner">
                {/* Brand */}
                <div className="navbar-brand">
                    <img
                        src={process.env.PUBLIC_URL + "/prod-favicon.png"}
                        className="navbar-logo"
                        alt="Logo"
                    />
                    <span className="navbar-brand-name">
                        Xingyi
                    </span>
                </div>

                {/* Desktop nav */}
                <ul className="navbar-section-list">
                    {renderSectionLinks()}
                </ul>

                <ul className="navbar-external-list">
                    {renderExternalLinks()}
                </ul>

                {/* Mobile hamburger toggle */}
                <div className="navbar-mobile">
                    <button
                        onClick={() => setToggle(!toggle)}
                        className="navbar-menu-button"
                        aria-label="Toggle menu"
                        aria-expanded={toggle}
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
                        } navbar-mobile-menu glass glass--card`}
                    >
                        <ul className="navbar-mobile-group">
                            {renderSectionLinks(true)}
                        </ul>
                        <ul className="navbar-mobile-group navbar-mobile-external-group">
                            {renderExternalLinks(true)}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
