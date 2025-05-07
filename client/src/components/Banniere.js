import { useState, useEffect } from 'react';
import './styles/Banniere.css';

// Images importées depuis le dossier components/image
import bann1 from '../components/images/bann1.jpg';
import bann2 from '../components/images/bann2.jpg';

function Banniere() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [bann1, bann2];

  // Fonction pour aller à l'image suivante
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Fonction pour aller à l'image précédente
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Changement automatique d'image toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      {/* Conteneur du carrousel */}
      <div className="carousel-slides">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <img
              src={image}
              alt={`Bannière ${index + 1}`}
              className="carousel-image"
            />
          </div>
        ))}
      </div>
      
      {/* Boutons de navigation */}
      <div className="carousel-controls">
        <button
          onClick={prevSlide}
          className="carousel-button prev"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="carousel-button next"
        >
          &gt;
        </button>
      </div>
      
      {/* Indicateurs de position */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Banniere;