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
    const isTabletViewport = useResponsiveViewport(
        "(min-width: 768px) and (max-width: 1024px), (min-width: 1025px) and (max-width: 1368px) and (pointer: coarse)"
    );
    const useDirectSections = isNarrowViewport || isTabletViewport;
    const HeroComponent = useDirectSections ? Hero : AutoHero;
    const OverviewComponent = useDirectSections ? Overview : AutoOverview;
    const ProjectsComponent = useDirectSections ? Projects : AutoProjects;
    const AboutComponent = useDirectSections ? About : AutoAbout;

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
