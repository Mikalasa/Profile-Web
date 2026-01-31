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
        {"A creative developer."}
    </>
}

export const IntroductionOverView = {
    paragraph:
        <>
            Throughout my career, I have taken on roles as both a <span
            className="text-[20px] the-highLight-words">front-end developer</span> and a <span
            className="text-[20px] the-highLight-words">tester</span>.
            <br/>
            <br/>
            Beyond my <span className="text-[20px] the-highLight-words">core skills</span>
            , I see development not merely as coding, but as a mindset and a path toward the future.
        </>
}
export const projectOverView = {
    paragraph:
        <>
            Exploring and building engaging <span
            className="text-[20px] the-highLight-words">full-stack</span> and <span
            className="text-[20px] the-highLight-words">AI</span> projects.
        </>
}


export {
    menu,
    close,
};
