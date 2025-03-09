import React, { useState } from 'react';
import Lecture from './Lecture';
import '../styles/LecturePage.css'; // Importing the styles for LecturePage
const DropdownArrow  =<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>;
const UpArrow = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>;

const LecturePage = () => {
  const [sections, setSections] = useState([
    {
      sectionTitle: 'Section 1: Introduction',
      lectures: [
        { title: 'Lecture 1.1', description: 'Introduction to the course' },
        { title: 'Lecture 1.2', description: 'Course structure overview' }
      ],
      isOpen: false
    },
    {
      sectionTitle: 'Section 2: Advanced Concepts',
      lectures: [
        { title: 'Lecture 2.1', description: 'Understanding advanced topics' },
        { title: 'Lecture 2.2', description: 'In-depth study of React' }
      ],
      isOpen: false
    }
  ]);

  const toggleSection = (index) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, isOpen: !section.isOpen } : section
    );
    setSections(updatedSections);
  };

  const toggleCaptions = (lectureTitle) => {
    alert(`Toggling captions for ${lectureTitle}`);
  };

  return (
    <div className="lecture-page">
      {/* Left column */}
      <div className="left-content">
        <h1>Course Title</h1>
        <p>This is the course description providing an overview of what you will learn.</p>
      </div>
    
      {/* Right column for sections and lectures */}
      <div className="right-content">
        {sections.map((section, index) => (
          <div key={index} className="section">
            <h3 onClick={() => toggleSection(index)}>
              {section.sectionTitle} {section.isOpen ? UpArrow : DropdownArrow}
            </h3>
            {section.isOpen && (
              <div className="lectures">
                {section.lectures.map((lecture, i) => (
                  <Lecture
                    key={i}
                    title={lecture.title}
                    description={lecture.description}
                    onToggleCaptions={() => toggleCaptions(lecture.title)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LecturePage;
