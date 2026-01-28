import {VerticalTimeline, VerticalTimelineElement} from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import {experienceConfig} from "../../experience-config";
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';


function TimeLine() {
  return (
    <>
        <VerticalTimeline>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2025"
                iconStyle={{ background: '#f8f9fa', color: '#212529' }}
                icon={<WorkIcon />}
            >
                <div className="p-4 bg-white border rounded-lg shadow-lg">
                    <h3 className="text-[12px] sm:text-2xl font-bold text-black">Software Tester</h3>
                    <h4 className="text-[9px] sm:text-lg text-gray-500">New Zealand</h4>
                    <p className="text-[9px] sm:text-lg text-gray-700">{experienceConfig.experience[3].description}</p>
                </div>
            </VerticalTimelineElement>

            <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="2023 - 2024"
                iconStyle={{ background: 'linear-gradient(to bottom, #444, #222)', color: '#fff' }}
                icon={<SchoolIcon />}
            >
                <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                    <h3 className="text-[12px] sm:text-2xl font-bold text-white">Master of Software Development</h3>
                    <h4 className="text-[9px] sm:text-lg text-gray-300">New Zealand</h4>
                    <p className="text-[9px] sm:text-lg text-gray-400">{experienceConfig.experience[2].description}</p>
                </div>
            </VerticalTimelineElement>

            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="2022"
                iconStyle={{ background: '#f8f9fa', color: '#212529' }}
                icon={<WorkIcon />}
            >
                <div className="p-4 bg-white border rounded-lg shadow-lg">
                    <h3 className="text-[12px] sm:text-2xl font-bold text-black">Front-end Developer</h3>
                    <h4 className="text-[9px] sm:text-lg text-gray-500">Shanghai, China</h4>
                    <p className="text-[9px] sm:text-lg text-gray-700">{experienceConfig.experience[1].description}</p>
                </div>
            </VerticalTimelineElement>

            <VerticalTimelineElement
                className="vertical-timeline-element--education"
                date="2018 - 2021"
                iconStyle={{ background: 'linear-gradient(to bottom, #444, #222)', color: '#fff' }}
                icon={<SchoolIcon />}
            >
                <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                    <h3 className="text-[12px] sm:text-2xl font-bold text-white">Bachelor of Creativity</h3>
                    <h4 className="text-[9px] sm:text-lg text-gray-300">New Zealand</h4>
                    <p className="text-[9px] sm:text-lg text-gray-400">{experienceConfig.experience[0].description}</p>
                </div>
            </VerticalTimelineElement>
        </VerticalTimeline>

    </>
  );
}

export default TimeLine;