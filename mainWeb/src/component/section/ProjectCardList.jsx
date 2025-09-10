import { motion } from 'framer-motion';
import {fadeIn} from '../../utility/custom-motion';
import { projects } from '../../constants/config-projectsText';
import { useInView } from 'react-intersection-observer';
import { Tilt } from 'react-tilt';
import React from "react";
import {isMobile} from "react-device-detect";


const ProjectCard = ({ project, custom }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: "-100px 0px",
    });
    const fadeInVariant = React.useMemo(() => fadeIn("up", "spring", custom * 0.1, 0.75), [custom]);
    const card = (
        <motion.div
            ref={ref}
            className="project-card shadow-lg flex flex-col relative my-4 sm:my-8 cursor-pointer"
            variants={fadeInVariant}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            custom={custom}
            onClick={() => window.open(project.url, "_blank")}
        >
            <div className='project-card-title-box flex justify-between items-center'>
                <h3 className='text-white font-bold text-[20px]'>{project.title}</h3>
                <motion.img
                    src={process.env.PUBLIC_URL + '/github-mark.png'}
                    className="github-icon z-10"
                    whileHover={{scale: 1.3}}
                    transition={{duration: 0.3}}
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.repo, "_blank");
                    }}
                />
            </div>
            <div className="project-img-box mt-3 z-10 relative">
                <img
                    src={process.env.PUBLIC_URL + project.imageURL}
                    alt={`${project.title} image`}
                    className="project-cover"
                />
                <div className="absolute bottom-2 right-2 flex flex-wrap gap-1">
                    {project.type.map((tag, index) => (
                        <div
                            key={index}
                            className="bg-black bg-opacity-40 text-white text-[11px] px-2 py-1 rounded"
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-2 project-text-box'>
                <ul className='list-disc pl-5 mt-2 text-gray-100 text-[12px]'>
                    {project.point && project.point.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}

                </ul>
                <p className='mt-2 text-gray-100 text-[14px]'>
                    {project.description}
                </p>
            </div>

            <div className='flex flex-wrap gap-2 project-tag-box'>
                {project.techStack.map((tag, index) => (
                    <p
                        key={index}
                        className={`text-[12px] ${tag + '-tag'} p-1 tech-stack-tag`}
                    >
                        {tag}
                    </p>
                ))}
            </div>
        </motion.div>
    )

    return (
        <div>
            {isMobile ? (
                    card
                ) :
                (
                    <Tilt className="Tilt" options={{
                        max: 20,
                        perspective: 1000,
                        easing: "cubic-bezier(.03,.98,.52,.99)",
                        transition: true
                    }}>
                        {card}
                    </Tilt>
                )
            }
        </div>
    );
};

function ProjectCardList() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0 sm:gap-4 p-4 mt-10">
            {projects.map((project, index) => (
                <div key={index} className="flex items-center justify-center">
                    <ProjectCard project={project} custom={index}/>
                </div>
            ))}
        </div>
    );
}

export default ProjectCardList;