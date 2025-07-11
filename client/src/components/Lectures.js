import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLectures } from '../redux/lecturesDataSlice';
import { Link } from 'react-router-dom';
import '../styles/Lectures.css';

const Lectures = () => {
  const dispatch = useDispatch();
  const lectures = useSelector((state) => state.lecturesData.lectures);
  const status = useSelector((state) => state.lecturesData.status);
  const error = useSelector((state) => state.lecturesData.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchLectures());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="lectures-loading">Loading lectures...</div>;
  }

  if (status === 'failed') {
    return <div className="lectures-error">Error: {error}</div>;
  }

  return (
    <div className="lectures-container">
      <div className="lectures-header">
        <h1>Video Lectures</h1>
        <p>Learn from our comprehensive video library</p>
      </div>
      
      <div className="lectures-grid">
        {Array.isArray(lectures) && lectures.map((lecture) => (
          <div key={lecture.id} className="lecture-card">
            <Link to={`/lecture/${lecture.id}`} className="lecture-link">
              <div className="lecture-thumbnail">
                <img 
                  src={`https://img.youtube.com/vi/${lecture.youtubeVideoId}/maxresdefault.jpg`}
                  alt={lecture.title}
                  className="thumbnail-image"
                />
                <div className="play-overlay">
                  <div className="play-button">▶</div>
                </div>
                <div className="duration-badge">{lecture.duration}</div>
              </div>
              
              <div className="lecture-info">
                <h3 className="lecture-title">{lecture.title}</h3>
                <p className="lecture-description">{lecture.description}</p>
                
                <div className="lecture-meta">
                  <span className={`level-badge ${lecture.level.toLowerCase()}`}>
                    {lecture.level}
                  </span>
                  <div className="lecture-tags">
                    {lecture.tags && lecture.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lectures;
