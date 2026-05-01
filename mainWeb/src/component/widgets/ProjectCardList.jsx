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
    const projectTypeText = project.type.join(" / ");

    const openSite = React.useCallback(() => {
        window.open(project.url, "_blank", "noopener,noreferrer");
    }, [project.url]);

    const openRepo = React.useCallback((e) => {
        e.stopPropagation();
        window.open(project.repo, "_blank", "noopener,noreferrer");
    }, [project.repo]);

    const card = (
        <motion.div
            className="project-card shadow-lg relative cursor-pointer transform-gpu will-change-transform"
            onClick={openSite}
        >
            <div className='project-card-title-box'>
                <div className="min-w-0">
                    <h3 className='project-card-title'>{project.title}</h3>
                    <p className="project-card-meta">{projectTypeText}</p>
                </div>
            </div>
            <div className="project-img-box relative flex items-center">
                <motion.img
                    src={process.env.PUBLIC_URL + '/socialIcon/github-mark.png'}
                    className="github-icon will-change-transform transform-gpu"
                    whileHover={isMobile ? undefined : { scale: 1.1 }}
                    transition={{ duration: 0.25 }}
                    onClick={openRepo}
                />
                <img
                    src={process.env.PUBLIC_URL + project.imageURL}
                    alt={project.title}
                    className="project-cover"
                    loading="lazy"
                    decoding="async"
                    width={560}
                    height={315}
                />
            </div>
            <div className='project-tag-box flex-wrap gap-2'>
                <div className="project-tech-list">
                    {project.techStack.map((tag) => (
                        <span
                            key={tag}
                            className="project-tech-chip"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )

    return (
        <div
            className={`project-card-shell ${isTiltActive ? "project-card-shell-active" : ""}`}
            onMouseEnter={!isMobile ? () => setIsTiltActive(true) : undefined}
            onMouseLeave={!isMobile ? () => setIsTiltActive(false) : undefined}
        >
            {isMobile ? (
                card
            ) : isTiltActive ? (
                <React.Suspense fallback={card}>
                    <DesktopTilt
                        className="Tilt"
                        options={{
                            max: 5,
                            perspective: 1000,
                            scale: 1.05,
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
        // This container fills the remaining height of the Projects section.
        <div className="relative h-full w-full mx-auto">
            <div className="absolute inset-0 rounded-3xl pointer-events-none">
                {/* Edge glow (border-only) */}
                <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                        boxShadow: "0 0 0 2px rgba(120,180,255,0.35), 0 0 48px rgba(120,180,255,0.35)",
                    }}
                    aria-hidden="true"
                />

                {/* Glass background */}
                <div
                    className="absolute inset-0 rounded-3xl border border-white/10
                               bg-black/30 backdrop-blur-xl
                               shadow-[0_20px_80px_rgba(0,0,0,0.55)]"
                />
            </div>

            {/* Inner scroll area */}
            <div className="absolute inset-3 z-10 overflow-y-auto overscroll-contain px-3 sm:px-5 py-4 projectcardlist-scroll">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 justify-items-stretch">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id || index}
                            project={project}
                            custom={index}
                        />
                    ))}
                </div>

                {/* Subtle bottom fade cue */}
                <div className="pointer-events-none sticky bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/45 to-transparent" />
            </div>
        </div>
    );
}
