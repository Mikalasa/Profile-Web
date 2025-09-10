import OverviewInfo from "../section/OverviewInfo";
import SkillCardList from "../section/SkillCardList";
import MySocial from "../widgets/MySocial";
import The808Page from "../modal/The808Page";
import React, {useState} from "react";

function Overview() {
    const [show808Page, setShow808Page] = useState(false);
    const [platform, setPlatform] = useState('');

    const handle808Page = (name) => {
        if (show808Page) {
            setShow808Page(false);
            setPlatform('');
        }
        if (!show808Page) {
            setShow808Page(true);
            setPlatform(name);
        }
    }
    return (
        <section id="overview">
            <div className="layout-container w-4/5 min-h-screen mx-auto grid grid-cols-1 md:grid-cols-[auto_auto] gap-16 items-center">
                <div className="overview-box flex flex-col justify-evenly">
                    <OverviewInfo />
                    <SkillCardList />
                </div>
                <MySocial handle808Page={handle808Page} />
                {show808Page ? <The808Page platform={platform} handle808Page={handle808Page}/> : null}
            </div>
        </section>
    );
}

export default Overview;