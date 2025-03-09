import React from 'react';
import '../styles/Lecture.css'; // Importing the styles for Lecture

const Lecture = ({ title, description, onToggleCaptions }) => {
  return (
    <div className="lecture">
      <h4>{title}</h4>
      <p>{description}</p>
      <button onClick={onToggleCaptions}>Toggle Captions</button>
      <button>Watch Now</button>
    </div>
  );
};

export default Lecture;
