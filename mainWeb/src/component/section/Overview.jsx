import OverviewInfo from "../widgets/OverviewInfo";
import SkillCardList from "../widgets/SkillCardList";

function Overview() {
    return (
        <section id="overview">
            <div className="layout-container h-svh flex justify-center items-center">
                <div className="overview-box w-3/4 flex flex-col ">
                    <OverviewInfo />
                    <SkillCardList />
                </div>
            </div>
        </section>
    );
}

export default Overview;