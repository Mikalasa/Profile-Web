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
                    whileHover={isMobile ? undefined : { scale: 1.1 }}
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
        // This container fills the remaining height of the Projects section.
        <div className="relative h-full w-full max-w-7xl mx-auto p-2">
            <div className="absolute inset-0 rounded-3xl pointer-events-none">
                {/* Edge glow (border-only) */}
                <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                        boxShadow: "0 0 0 1px rgba(120,180,255,0.35), 0 0 24px rgba(120,180,255,0.35)",
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
            <div className="relative z-10 h-full overflow-y-auto overscroll-contain px-2 sm:px-6 py-6 projectcardlist-scroll">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center px-2">
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