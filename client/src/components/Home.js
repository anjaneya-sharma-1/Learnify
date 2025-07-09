
import React from 'react';
import Slider from './Slider';
import Launches from './Launches';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <Slider 
          data={[
            {
              image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=600&fit=crop',
              headline: 'Transform Your',
              headlineAccent: 'Learning Journey',
              subtitle: 'Discover world-class education that empowers you to achieve your dreams',
              buttonText: 'Start Learning Today',
              buttonLink: '#',
            },
            {
              image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop',
              headline: 'Unlock Your',
              headlineAccent: 'Potential',
              subtitle: 'Join a vibrant community of learners and educators',
              buttonText: 'Browse Courses',
              buttonLink: '#',
            },
            {
              image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=600&fit=crop',
              headline: 'Achieve',
              headlineAccent: 'Success',
              subtitle: 'Start your journey with expert guidance and resources',
              buttonText: 'Get Started',
              buttonLink: '#',
            },
          ]} 
        />
      </div>
      
      <div className="launches-section">
        <div className="section-header">
          <h2 className="section-title">Featured Courses</h2>
          <p className="section-subtitle">Explore our most popular and highly-rated educational programs</p>
        </div>
        <Launches/>
      </div>
    </div>
  );
}

export default Home;