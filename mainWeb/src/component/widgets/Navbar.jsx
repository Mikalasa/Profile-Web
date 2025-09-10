import React, { useEffect, useState, useContext } from "react";
import { customTailwind } from "../../constants/custom-tailwind";
import { navLinks } from "../../constants/config-web-paragraph";
import { menu, close } from "../../constants/config-web-paragraph";
import { AutoScrollContext } from '../../utility/AutoScrollContext';

const Navbar = () => {
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { setIsNavClick } = useContext(AutoScrollContext);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (e, navId, navTitle) => {
        e.preventDefault();
        setIsNavClick(true);
        setActive(navTitle);

        const element = document.getElementById(navId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }

        setTimeout(() => {
            setIsNavClick(false);
        }, 2000); // 根据滚动时间调整

        if (toggle) setToggle(false); // 关闭移动端菜单
    };

    const oldNav = () => {
        return (
            <nav
                id="navbar"
                className={`${customTailwind.paddingX} w-full flex items-center py-4 fixed top-0 z-20 custom-navbar ${
                    scrolled ? "custom-navbar-bg" : "bg-transparent"
                }`}
            >
                <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
                    <div className="flex gap-4">
                        <img src={process.env.PUBLIC_URL + "/prod-favicon.png"} className="h-[32px] w-[32px]"
                             alt="Logo"/>
                        <a
                            href="/"
                            className='navbar-item flex items-center gap-2'
                            onClick={(e) => {
                                e.preventDefault();
                                setActive("");
                                setIsNavClick(true);
                                window.scrollTo({top: 0, behavior: 'smooth'});
                                setTimeout(() => {
                                    setIsNavClick(false);
                                }, 500);
                            }}
                        >
                            <p className='text-white text-[18px] font-bold cursor-pointer flex '>
                                Xingyi &nbsp;
                                <span className='sm:block hidden'> |&nbsp; Developer</span>
                            </p>
                        </a>
                    </div>

                    {/* 桌面导航菜单 */}
                    <ul className='list-none hidden sm:flex flex-row gap-10'>
                        {navLinks.map((nav) => (
                            <li
                                key={nav.id}
                                className={`navbar-item hover:text-gray-300 text-white text-[18px] font-medium cursor-pointer`}
                            >
                                <a
                                    href={`#${nav.id}`}
                                    onClick={(e) => handleNavClick(e, nav.id, nav.title)}
                                >
                                    {nav.title}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* 移动端导航菜单 */}
                    <div className='sm:hidden flex flex-1 justify-end items-center'>
                        <img
                            src={toggle ? close : menu}
                            alt='menu'
                            className='w-[28px] h-[28px] object-contain'
                            onClick={() => setToggle(!toggle)}
                        />

                        <div
                            className={`${
                                !toggle ? "hidden" : "flex"
                            } p-6 custom-drop-down-menu absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
                        >
                            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                                {navLinks.map((nav) => (
                                    <li
                                        key={nav.id}
                                        className={`font-poppins font-medium cursor-pointer text-[16px] ${
                                            active === nav.title ? "text-gray-300" : "text-white"
                                        }`}
                                    >
                                        <a
                                            href={`#${nav.id}`}
                                            onClick={(e) => handleNavClick(e, nav.id, nav.title)}
                                        >
                                            {nav.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

    return (
        <>
            {oldNav()}
        </>
    );
};

export default Navbar;
