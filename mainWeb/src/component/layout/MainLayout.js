import React, { lazy } from "react";
import withAutoScroll from "../../customHooks/withAutoScroll";
import { useResponsiveViewport } from "../../utility/useResponsiveViewport";

const Hero = lazy(() => import("../section/Hero.jsx"));
const Overview = lazy(() => import("../section/Overview.jsx"));
const Projects = lazy(() => import("../section/Projects.jsx"));
const About = lazy(() => import("../section/About.jsx"));

const AutoHero = withAutoScroll(Hero);
const AutoOverview = withAutoScroll(Overview);
const AutoProjects = withAutoScroll(Projects);
const AutoAbout = withAutoScroll(About);

function MainLayout() {
    const isNarrowViewport = useResponsiveViewport();
    const HeroComponent = isNarrowViewport ? Hero : AutoHero;
    const OverviewComponent = isNarrowViewport ? Overview : AutoOverview;
    const ProjectsComponent = isNarrowViewport ? Projects : AutoProjects;
    const AboutComponent = isNarrowViewport ? About : AutoAbout;

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
