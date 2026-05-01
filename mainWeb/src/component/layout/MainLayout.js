import React, { lazy } from "react";
import { isMobile } from "react-device-detect";
import withAutoScroll from "../../customHooks/withAutoScroll";

const Hero = lazy(() => import("../section/Hero.jsx"));
const Overview = lazy(() => import("../section/Overview.jsx"));
const Projects = lazy(() => import("../section/Projects.jsx"));
const About = lazy(() => import("../section/About.jsx"));

const AutoHero = withAutoScroll(Hero);
const AutoOverview = withAutoScroll(Overview);
const AutoProjects = withAutoScroll(Projects);
const AutoAbout = withAutoScroll(About);

function MainLayout() {
    const HeroComponent = isMobile ? Hero : AutoHero;
    const OverviewComponent = isMobile ? Overview : AutoOverview;
    const ProjectsComponent = isMobile ? Projects : AutoProjects;
    const AboutComponent = isMobile ? About : AutoAbout;

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
