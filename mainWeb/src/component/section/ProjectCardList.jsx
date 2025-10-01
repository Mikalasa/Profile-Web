import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../constants/config-projectsText';
import React from "react";
import { isMobile } from "react-device-detect";
const DesktopTilt = React.lazy(() =>
    import('react-tilt').then((module) => ({ default: module.Tilt }))
);

// ---------------------- ProjectCard component stays the same ----------------------
const ProjectCard = React.memo(({ project, custom }) => {
    const openSite = React.useCallback(() => {
        window.open(project.url, "_blank", "noopener,noreferrer");
    }, [project.url]);

    const openRepo = React.useCallback((e) => {
        e.stopPropagation();
        window.open(project.repo, "_blank", "noopener,noreferrer");
    }, [project.repo]);

    const card = (
        <motion.div
            className="project-card shadow-lg flex flex-col relative my-4 sm:my-8 cursor-pointer transform-gpu will-change-transform"
            onClick={openSite}
        >
            <div className='project-card-title-box flex justify-between items-center'>
                <h3 className='text-white font-bold text-[20px]'>{project.title}</h3>
                <motion.img
                    src={process.env.PUBLIC_URL + '/github-mark.png'}
                    className="github-icon z-10 will-change-transform transform-gpu"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.25 }}
                    onClick={openRepo}
                />
            </div>
            <div className="project-img-box mt-3 z-10 relative">
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
            ) : (
                <React.Suspense fallback={card}>
                    <DesktopTilt className="Tilt" options={{
                        max: 10,
                        perspective: 1000,
                        easing: "cubic-bezier(.03,.98,.52,.99)",
                        transition: true
                    }}>
                        {card}
                    </DesktopTilt>
                </React.Suspense>
            )}
        </div>
    );
});

// ---------------------- Slider Implementation ----------------------
export default function ProjectCardList() {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [cardsPerSlide, setCardsPerSlide] = React.useState(getCardsPerSlide());
    const [isHovered, setIsHovered] = React.useState(false);

    function getCardsPerSlide() {
        if (typeof window === "undefined") return 1;
        if (window.innerWidth >= 1024) return 3; // desktop
        if (window.innerWidth >= 640) return 2;  // tablet
        return 1;                               // mobile
    }

    React.useEffect(() => {
        const handleResize = () => setCardsPerSlide(getCardsPerSlide());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalSlides = Math.ceil(projects.length / cardsPerSlide);
    const startIndex = currentSlide * cardsPerSlide;
    const endIndex = startIndex + cardsPerSlide;
    const visibleProjects = projects.slice(startIndex, endIndex);

    // Autoplay with pause on hover
    React.useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 500000);
        return () => clearInterval(interval);
    }, [totalSlides, isHovered]);

    const handlePrev = () =>
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    const handleNext = () =>
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    const handleDotClick = (index) => setCurrentSlide(index);

    return (
        <div
            className="relative w-full max-w-7xl mx-auto px-4 py-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Slider */}
            <div className="overflow-hidden relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        className="flex gap-6 justify-center"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {visibleProjects.map((project, index) => (
                            <ProjectCard key={project.id || index} project={project} custom={index} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Arrow buttons */}
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow p-2 mx-2 transition"
                >
                    ←
                </button>

                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full shadow p-2 mx-2 transition"
                >
                    →
                </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`w-3 h-3 rounded-full transition ${
                            currentSlide === index
                                ? "bg-blue-500"
                                : "bg-gray-300 hover:bg-gray-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}