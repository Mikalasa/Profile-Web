import ProjectCardList from "../section/ProjectCardList.jsx";
import ProjectIntroduction from "../section/ProjectIntroduction.jsx";
import PageExtender from "../widgets/pageExtender.jsx";
import {isMobile} from "react-device-detect";

function Projects() {
  return (
      <section id="projects">
          <div className="layout-container">
              <div className="projects">
                  <ProjectIntroduction/>
                  <ProjectCardList/>
                  {isMobile ? <></> : <PageExtender/>}
              </div>
          </div>
      </section>

  );
}

export default Projects;