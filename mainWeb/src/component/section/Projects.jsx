import ProjectCardList from "../widgets/ProjectCardList.jsx";
import ProjectIntroduction from "../widgets/ProjectIntroduction.jsx";

function Projects() {
  return (
      <section id="projects">
          <div className="layout-container min-h-[var(--app-svh)] md:h-svh py-20 md:py-0">
              <div className="projects w-[88%] max-w-7xl h-full grid grid-cols-1 lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,2fr)] gap-8 lg:gap-12 items-center">
                  <ProjectIntroduction />
                  <div className="min-h-[28rem] h-[calc(var(--app-svh)-16rem)] md:h-[76vh] lg:h-[72vh]">
                      <ProjectCardList />
                  </div>
              </div>
          </div>
      </section>
  );
}

export default Projects;
