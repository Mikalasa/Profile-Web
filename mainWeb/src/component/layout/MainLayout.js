import React, {lazy} from "react";
import withAutoScroll from "../../customHooks/withAutoScroll";

const Hero = lazy(() => import("./Hero.jsx"));
// const ParticleTextWrapper = lazy(() => import("./ParticleTextWrapper.jsx"));
const Overview = lazy(() => import("./Overview.jsx"));
const Projects = lazy(() => import("./Projects.jsx"));
const About = lazy(() => import("./About.jsx"));
const ContactForm = lazy(() => import("../section/ContactForm.jsx"));

const AutoScrollHero = withAutoScroll(Hero);
// const AutoScrollParticleText = withAutoScroll(ParticleTextWrapper);
const AutoScrollOverview = withAutoScroll(Overview);
const AutoScrollProjects = withAutoScroll(Projects);
const AutoScrollAbout = withAutoScroll(About);
function MainLayout() {

    return (
        <>
            <AutoScrollHero />
            {/*<AutoScrollParticleText text="Welcome to my profile website！🚀" />*/}
            <AutoScrollOverview />
            <AutoScrollProjects />
            <AutoScrollAbout />
            {/*<ContactForm />*/}
        </>
    );
}

export default MainLayout;
