import ProjectCardList from "../widgets/ProjectCardList.jsx";
import ProjectIntroduction from "../widgets/ProjectIntroduction.jsx";

function Projects() {
  return (
      <section id="projects">
          <div className="layout-container h-svh">
              <div className="projects w-4/5 h-full flex flex-col">
                  <div className="shrink-0">
                      <ProjectIntroduction />
                  </div>

                  <div className="flex-1 min-h-0 mb-8">
                      <ProjectCardList />
                  </div>
              </div>
          </div>
      </section>
  );
}

export default Projects;