
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Slider.css';

const Slider = ({ data }) => {
  return (
    <div className="slider-wrapper">
      <Carousel 
        fade 
        className="custom-carousel"
        interval={4000}
        controls={true}
        indicators={true}
        pause="hover"
      >
        {data.map((item, index) => (
          <Carousel.Item key={index} className="carousel-item-custom">
            <div className="image-container">
              <img 
                className="d-block w-100 carousel-image" 
                src={item.image}
                alt={`Education slide ${index + 1}`}
                loading="lazy"
              />
              <div className="slider-dark-overlay"></div>
              <div className="slider-content">
                <h1 className="slider-title">
                  {item.headline} <span className="slider-title-accent">{item.headlineAccent}</span>
                </h1>
                <p className="slider-subtitle">{item.subtitle}</p>
                {item.buttonText && (
                  <a href={item.buttonLink} className="slider-btn">{item.buttonText}</a>
                )}
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Slider;