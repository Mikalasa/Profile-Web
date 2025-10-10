import React, {lazy} from "react";
import withAutoScroll from "../../customHooks/withAutoScroll";

const Hero = lazy(() => import("../section/Hero.jsx"));
const Overview = lazy(() => import("../section/Overview.jsx"));
const Projects = lazy(() => import("../section/Projects.jsx"));
const About = lazy(() => import("../section/About.jsx"));

const AutoScrollHero = withAutoScroll(Hero);
const AutoScrollOverview = withAutoScroll(Overview);
const AutoScrollProjects = withAutoScroll(Projects);
const AutoScrollAbout = withAutoScroll(About);
function MainLayout() {

    return (
        <>
            <AutoScrollHero />
            <AutoScrollOverview />
            <AutoScrollProjects />
            <AutoScrollAbout />
        </>
    );
}

export default MainLayout;
