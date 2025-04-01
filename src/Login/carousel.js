import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './carousel.css';

const Carousel = () => {
  const images = [
    {
      src: "https://larevistadelsureste.com/storage/2023/02/RUTA-DOS-CHIAPAS.jpg",
      alt: "San Cristóbal de las Casas",
      caption: "Explora los Pueblos Mágicos"
    },
    {
      src: "https://cdn.pixabay.com/photo/2016/04/12/18/29/mexico-1325046_1280.jpg",
      alt: "Canon del Usumacinta",
      caption: "Descubre la naturaleza"
    },
    {
      src: "https://larevistadelsureste.com/storage/2023/02/acantilado-isla-mujeres-scaled-1-2048x1365.jpg",
      alt: "Isla Mujeres",
      caption: "Explora Nuevos Lugares"
    },
    {
      src: "https://cdn.pixabay.com/photo/2018/09/15/19/39/chiapas-3680170_1280.jpg",
      alt: "Templo Maya",
      caption: "Conoce nuestra cultura"
    }
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="custom-carousel">
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            <img 
              src={image.src} 
              className="carousel-image" 
              alt={image.alt} 
            />
            <div className="carousel-caption">
              <h3>{image.caption}</h3>
            </div>
          </div>
        ))}
      </div>

      <button className="carousel-control prev" onClick={prevSlide}>
        <FiChevronLeft className="control-icon" />
      </button>
      <button className="carousel-control next" onClick={nextSlide}>
        <FiChevronRight className="control-icon" />
      </button>

      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;