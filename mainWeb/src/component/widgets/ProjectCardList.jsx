import { motion } from 'framer-motion';
import { projects } from '../../constants/config-projectsText';
import React from "react";
import { isMobile } from "react-device-detect";
const DesktopTilt = React.lazy(() =>
    import('react-tilt').then((module) => ({ default: module.Tilt }))
);

// ---------------------- ProjectCard component stays the same ----------------------
const ProjectCard = React.memo(({ project, custom }) => {
    const [isTiltActive, setIsTiltActive] = React.useState(false);
    const openSite = React.useCallback(() => {
        window.open(project.url, "_blank", "noopener,noreferrer");
    }, [project.url]);

    const openRepo = React.useCallback((e) => {
        e.stopPropagation();
        window.open(project.repo, "_blank", "noopener,noreferrer");
    }, [project.repo]);

    const card = (
        <motion.div
            className="project-card shadow-lg flex flex-col justify-between relative cursor-pointer transform-gpu will-change-transform"
            onClick={openSite}
        >
            <div className='project-card-title-box flex justify-between items-center'>
                <h3 className='text-white font-bold text-[20px]'>{project.title}</h3>
                <motion.img
                    src={process.env.PUBLIC_URL + '/socialIcon/github-mark.png'}
                    className="github-icon z-10 will-change-transform transform-gpu"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.25 }}
                    onClick={openRepo}
                />
            </div>
            <div className="project-img-box mt-4 z-10 relative flex items-center">
                <img
                    src={process.env.PUBLIC_URL + project.imageURL}
                    alt={`${project.title} image`}
                    className="project-cover"
                    loading="lazy"
                    decoding="async"
                    width={560}
                    height={315}
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
            <div className='project-tag-box flex-wrap gap-2'>
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
        <div
            onMouseEnter={() => setIsTiltActive(true)}
            onMouseLeave={() => setIsTiltActive(false)}
        >
            {isMobile ? (
                card
            ) : isTiltActive ? (
                <React.Suspense fallback={card}>
                    <DesktopTilt
                        className="Tilt"
                        options={{
                            max: 10,
                            perspective: 1000,
                            easing: "cubic-bezier(.03,.98,.52,.99)",
                            transition: true
                        }}
                    >
                        {card}
                    </DesktopTilt>
                </React.Suspense>
            ) : (
                card
            )}
        </div>
    );
});

export default function ProjectCardList() {
    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id || index}
                        project={project}
                        custom={index}
                    />
                ))}
            </div>
        </div>
    );
}