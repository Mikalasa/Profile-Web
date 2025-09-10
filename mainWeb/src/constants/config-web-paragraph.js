import menu from "../assets/menu.svg";
import close from "../assets/close.svg";

export const navLinks = [
    {
        id: "overview",
        title: "Overview",
    },
    {
        id: "projects",
        title: "Projects",
    },
    {
        id: "about",
        title: "About",
    },
];

export const heroText = {
    title_f: "Hi, I'm ",
    title_l: "Xingyi",
    description: <>
        {"A passionate and creative developer."}
    </>
}

export const IntroductionOverView = {
    paragraph:
        <>
            I am deeply passionate about <span
            className="text-[20px] the-highLight-words-1">front-end development</span> and <span
            className="text-[20px] the-highLight-words-1">full-stack  development.</span>
            <br/>
            My background in design education has cultivated a strong interest in visually driven effect development. In my
            free time, I enjoy working on fun side projects and attending various meetups. Occasionally, I also write
            technical articles. Feel free to follow my channels to share and connect. Thank you!
            <br/>
            <br/>
            <span className="text-[20px] the-highLight-words-1">core skills.</span>
        </>
}
export const projectOverView = {
    paragraph:
        <>
            These are some personal projects I have completed in the past, primarily consisting of <span
            className="text-[20px] the-highLight-words-2">full-stack web applications</span> and <span
            className="text-[20px] the-highLight-words-2">games</span> based on frontend
            technologies.
            <br/>
            <br/>
            <span className="the-highlight-text-box">Click a card to view the live demo page for each project.</span>
        </>
}

export const aboutOverView = {
    paragraph:
        <>
            {
                `During more than two years of learning and working in code development, I have accumulated experience in the relevant industry.
                If you would like to know more about my experiences, please kindly browse through the webpage on the monitor below.`
            }
        </>
}

export {
    menu,
    close,
};
