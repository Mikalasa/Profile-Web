import {VerticalTimeline, VerticalTimelineElement} from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import {experienceConfig} from "../../experience-config";
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';

const timelineItems = [
    {
        date: "2025",
        icon: <WorkIcon />,
        iconStyle: { background: '#f8f9fa', color: '#212529' },
        title: "Software Tester",
        location: "New Zealand",
        description: experienceConfig.experience[3].description,
        variant: "work",
    },
    {
        date: "2023 - 2024",
        icon: <SchoolIcon />,
        iconStyle: { background: 'linear-gradient(to bottom, #444, #222)', color: '#fff' },
        title: "Master of Software Development",
        location: "New Zealand",
        description: experienceConfig.experience[2].description,
        variant: "education",
    },
    {
        date: "2022",
        icon: <WorkIcon />,
        iconStyle: { background: '#f8f9fa', color: '#212529' },
        title: "Front-end Developer",
        location: "Shanghai, China",
        description: experienceConfig.experience[1].description,
        variant: "work",
    },
    {
        date: "2018 - 2021",
        icon: <SchoolIcon />,
        iconStyle: { background: 'linear-gradient(to bottom, #444, #222)', color: '#fff' },
        title: "Bachelor of Creativity",
        location: "New Zealand",
        description: experienceConfig.experience[0].description,
        variant: "education",
    },
];

const ExperienceCard = ({ item }) => (
    <div className={`experience-card experience-card-${item.variant}`}>
        <h3>{item.title}</h3>
        <h4>{item.location}</h4>
        <div className="experience-description">{item.description}</div>
    </div>
);

function TimeLine() {
  return (
    <section className="timeline-section" aria-label="Experience timeline">
        <VerticalTimeline lineColor="rgba(255, 255, 255, 0.18)">
            {timelineItems.map((item) => (
                <VerticalTimelineElement
                    key={`${item.title}-${item.date}`}
                    className={`vertical-timeline-element--${item.variant}`}
                    date={item.date}
                    dateClassName="experience-date"
                    iconStyle={item.iconStyle}
                    icon={item.icon}
                    contentArrowStyle={{ borderRight: "7px solid rgba(255, 255, 255, 0.1)" }}
                >
                    <ExperienceCard item={item} />
                </VerticalTimelineElement>
            ))}
        </VerticalTimeline>
    </section>
  );
}

export default TimeLine;
