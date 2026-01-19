import React, { lazy } from "react";
import { isMobile } from "react-device-detect";
import withAutoScroll from "../../customHooks/withAutoScroll";

const Hero = lazy(() => import("../section/Hero.jsx"));
const Overview = lazy(() => import("../section/Overview.jsx"));
const Projects = lazy(() => import("../section/Projects.jsx"));
const About = lazy(() => import("../section/About.jsx"));

function MainLayout() {
    const HeroComponent = isMobile ? Hero : withAutoScroll(Hero);
    const OverviewComponent = isMobile ? Overview : withAutoScroll(Overview);
    const ProjectsComponent = isMobile ? Projects : withAutoScroll(Projects);
    const AboutComponent = isMobile ? About : withAutoScroll(About);

    return (
        <>
            <HeroComponent />
            <OverviewComponent />
            <ProjectsComponent />
            <AboutComponent />
        </>
    );
}

export default MainLayout;
