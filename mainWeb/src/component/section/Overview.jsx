import OverviewInfo from "../widgets/OverviewInfo";
import SkillCardList from "../widgets/SkillCardList";

function Overview() {
    return (
        <section id="overview" className="overview-section">
            <div className="layout-container min-h-[var(--app-svh)] md:h-svh flex items-center py-20 md:py-0">
                <div className="overview-box w-[88%] md:w-[86%] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.9fr_1.35fr] gap-10 lg:gap-14 items-center">
                    <OverviewInfo />
                    <SkillCardList />
                </div>
            </div>
        </section>
    );
}

export default Overview;
