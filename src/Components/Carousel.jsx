// ServicesCarousel.jsx
import React, { useState, useEffect } from 'react';
import './Carousel.css';

const ServicesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const services = [
    {
      name: "Web Development",
      description: "Custom websites and web applications",
      image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdlYiUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Web Development Service"
    },
    {
      name: "Mobile App",
      description: "iOS and Android applications",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Mobile App Development"
    },
    {
      name: "Graphic Design",
      description: "Visual content creation",
      image: "https://plus.unsplash.com/premium_photo-1661301026318-2ceafb57b0ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Z3JhcGhpYyUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D",
      alt: "Graphic Design Service"
    },
    {
      name: "Logo Design",
      description: "Brand identity creation",
      image: "https://media.istockphoto.com/id/899635470/photo/graphic-design-studio.webp?a=1&b=1&s=612x612&w=0&k=20&c=YJuel7NPYXYDlXrY1Wo2q-x7MEPQUFjmL5TAOS7B314=",
      alt: "Logo Design Service"
    },
    {
      name: "Album Art",
      description: "Music artwork and covers",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Album Art Service"
    },
    {
      name: "UI/UX Design",
      description: "User-centered design solutions",
      image: "https://media.istockphoto.com/id/2177184303/photo/white-man-programmer-or-it-specialist-software-developer-with-glasses-working-late-into-the.webp?a=1&b=1&s=612x612&w=0&k=20&c=XLBlBQCGyuWBaJTbzG7bntaoYBB-GdTiI6z4Co5mjAg=",
      alt: "UI/UX Design Service"
    },
    {
      name: "Digital Marketing",
      description: "Online promotion strategies",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Digital Marketing Service"
    }
  ];

  const updateCarousel = (newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setCurrentIndex((newIndex + services.length) % services.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const handlePrev = () => {
    updateCarousel(currentIndex - 1);
  };

  const handleNext = () => {
    updateCarousel(currentIndex + 1);
  };

  const handleDotClick = (index) => {
    updateCarousel(index);
  };

  const handleCardClick = (index) => {
    updateCarousel(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  // Touch swipe handling
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };
    
    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };
    
    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };
    
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('touchstart', handleTouchStart);
      carouselContainer.addEventListener('touchend', handleTouchEnd);
    }
    
    return () => {
      if (carouselContainer) {
        carouselContainer.removeEventListener('touchstart', handleTouchStart);
        carouselContainer.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentIndex]);

  const getCardClass = (index) => {
    const offset = (index - currentIndex + services.length) % services.length;
    
    if (offset === 0) return "card center";
    if (offset === 1) return "card right-1";
    if (offset === 2) return "card right-2";
    if (offset === services.length - 1) return "card left-1";
    if (offset === services.length - 2) return "card left-2";
    return "card hidden";
  };

  return (
    <div className="services-carousel-wrapper">
      <h1 className="about-title">OUR SERVICES</h1>
      
      <div className="carousel-container">
        <button className="nav-arrow left" onClick={handlePrev}>‹</button>
        
        <div className="carousel-track">
          {services.map((service, index) => (
            <div 
              key={index}
              className={getCardClass(index)}
              onClick={() => handleCardClick(index)}
            >
              <img src={service.image} alt={service.alt} />
              <div className="service-overlay">
                <h3>{service.name}</h3>
              </div>
            </div>
          ))}
        </div>
        
        <button className="nav-arrow right" onClick={handleNext}>›</button>
      </div>
      
      <div className="service-info">
        <h2 className="service-name">{services[currentIndex].name}</h2>
        <p className="service-description">{services[currentIndex].description}</p>
      </div>
      
      <div className="dots">
        {services.map((_, index) => (
          <div 
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ServicesCarousel;