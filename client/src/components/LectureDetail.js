import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLectureById, clearCurrentLecture } from '../redux/lecturesDataSlice';
import '../styles/LectureDetail.css';

const LectureDetail = () => {
  const { lectureId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const currentLecture = useSelector((state) => state.lecturesData.currentLecture);
  const status = useSelector((state) => state.lecturesData.currentLectureStatus);
  const error = useSelector((state) => state.lecturesData.error);

  useEffect(() => {
    if (lectureId) {
      dispatch(fetchLectureById(parseInt(lectureId)));
    }
    
    return () => {
      dispatch(clearCurrentLecture());
    };
  }, [lectureId, dispatch]);

  if (status === 'loading') {
    return <div className="lecture-detail-loading">Loading lecture...</div>;
  }

  if (status === 'failed') {
    return (
      <div className="lecture-detail-error">
        <h2>Error loading lecture</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/lectures')} className="back-button">
          Back to Lectures
        </button>
      </div>
    );
  }

  if (!currentLecture) {
    return (
      <div className="lecture-detail-error">
        <h2>Lecture not found</h2>
        <button onClick={() => navigate('/lectures')} className="back-button">
          Back to Lectures
        </button>
      </div>
    );
  }

  const getYouTubeEmbedUrl = (videoId) => {
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  };

  return (
    <div className="lecture-detail-container">
      <div className="lecture-detail-header">
        <button onClick={() => navigate('/lectures')} className="back-button">
          ← Back to Lectures
        </button>
        <div className="lecture-breadcrumb">
          <span>Lectures</span> / <span>{currentLecture.title}</span>
        </div>
      </div>

      <div className="lecture-content">
        <div className="video-section">
          <div className="video-container">
            <iframe
              src={getYouTubeEmbedUrl(currentLecture.youtubeVideoId)}
              title={currentLecture.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="youtube-player"
            ></iframe>
          </div>
        </div>

        <div className="lecture-info-section">
          <div className="lecture-header-info">
            <h1 className="lecture-title">{currentLecture.title}</h1>
            <div className="lecture-meta">
              <span className={`level-badge ${currentLecture.level.toLowerCase()}`}>
                {currentLecture.level}
              </span>
              <span className="duration">Duration: {currentLecture.duration}</span>
            </div>
          </div>

          <div className="lecture-description">
            <h3>About this lecture</h3>
            <p>{currentLecture.description}</p>
          </div>

          {currentLecture.tags && currentLecture.tags.length > 0 && (
            <div className="lecture-tags-section">
              <h4>Topics covered:</h4>
              <div className="tags-container">
                {currentLecture.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          )}

          <div className="lecture-actions">
            <button className="primary-button">Mark as Complete</button>
            <button className="secondary-button">Add to Favorites</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureDetail;
