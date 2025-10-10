import ProjectCardList from "../widgets/ProjectCardList.jsx";
import ProjectIntroduction from "../widgets/ProjectIntroduction.jsx";

function Projects() {
  return (
      <section id="projects">
          <div className="layout-container">
              <div className="projects">
                  <ProjectIntroduction/>
                  <ProjectCardList/>
              </div>
          </div>
      </section>

  );
}

export default Projects;