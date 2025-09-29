import React, { useState, useEffect, useCallback } from 'react';
import './HeroSectionR.css';

const HeroSectionR = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array immagini carosello hero (path corretto per Vite: /nomefile.ext)
  const slides = [
    {
      id: 1,
      image: '/progettazione3d.jpeg',
      alt: 'Progettazione 3D',
      title: '3D Design & Stampa 3D',
      subtitle: 'Dal concept al pezzo finito',
      description: 'Dal modello digitale all\'oggetto reale: creazioni uniche, prototipi, gadget e design personalizzati.',
    },
    {
      id: 2,
      image: '/abbigliamentopersonalizzato.jpeg',
      alt: 'Abbigliamento personalizzato',
      title: 'Abbigliamento Personalizzato',
      subtitle: 'Indossa la tua idea',
      description: 'T-shirt, body, cappellini e accessori personalizzati: ogni capo diventa un messaggio, ogni stile la tua firma.',
    },
    {
      id: 3,
      image: '/webdevelopement.jpeg',
      alt: 'Web development/design',
      title: 'Web & App Design',
      subtitle: 'Esperienze digitali efficaci',
      description: 'Siti Web moderni, App intuitive e soluzioni grafiche per far crescere il tuo brand online.',
    },
    {
      id: 4,
      image: '/prankservice.jpeg',
      alt: 'Prank service',
      title: 'Idee Regalo',
      subtitle: 'Sorprendi con originalità',
      description: 'Creazioni originali e personalizzate, perfette per sorprendere e lasciare il segno in ogni occasione.',
    },
  ];

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => prev === 0 ? slides.length - 1 : prev - 1);
  }, [slides.length]);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [prevSlide, nextSlide]);


  // Create particles (più varietà e dimensioni)
  const createParticles = () => {
    const particles = [];
    const particleCount = 28;
    const colors = ['#2563EB', '#60A5FA', '#F97316', '#FACC15', '#fff', '#ffe066'];
    const sizes = [4, 6, 8, 10];
    for (let i = 0; i < particleCount; i++) {
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      particles.push(
        <div
          key={i}
          className="particle"
          style={{
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 8 + 's',
            animationDuration: (7 + Math.random() * 5) + 's',
            background: colors[Math.floor(Math.random() * colors.length)],
            width: size + 'px',
            height: size + 'px',
            opacity: 0.7 + Math.random() * 0.3
          }}
        />
      );
    }
    return particles;
  };

  const getSlideClass = (index) => {
    if (index === currentSlide) return 'slide active';
    if (index === (currentSlide === 0 ? slides.length - 1 : currentSlide - 1)) return 'slide prev';
    if (index === (currentSlide === slides.length - 1 ? 0 : currentSlide + 1)) return 'slide next';
    return 'slide';
  };

  return (
    <section className="hero-carousel" aria-label="Hero con carosello immagini">
      <div className="carousel-container">
        {slides.map((slide, index) => {
          // Applica una classe speciale per centrare meglio le teste nelle slide 1 e 2
          let extraClass = '';
          if (slide.id === 1) extraClass = ' hero-center-top';
          if (slide.id === 2) extraClass = ' hero-center-mid';
          return (
            <div
              key={slide.id}
              className={getSlideClass(index) + extraClass}
              style={{ backgroundImage: `url(${slide.image})` }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slide.alt} (${index + 1} di ${slides.length})`}
              tabIndex={index === currentSlide ? 0 : -1}
            >
              <img 
                src={slide.image} 
                alt={slide.alt} 
                style={{ display: 'none', objectFit: 'cover', width: '100vw', height: '88vh' }} 
                loading="lazy"
                decoding="async"
              />
              <div className="slide-overlay"></div>
              {index === currentSlide && (
                <div 
                  className={`slide-content${(slide.id === 2 ? ' align-right slide-content-gift' : '')}${(slide.id === 4 ? ' align-right slide-content-gift' : '')}${(slide.id !== 2 && slide.id !== 4 ? ' align-left' : '')}`}
                  aria-live="polite"
                >
                  <h2 className={"slide-title" + (slide.id === 2 ? " slide-title-abbl" : "")}
                    >
                    <span className="hero-decor-line" aria-hidden="true"></span>
                    {slide.title}
                  </h2>
                  {slide.subtitle && <h3 className="slide-subtitle">{slide.subtitle}</h3>}
                  {slide.description && <p className="slide-description">{slide.description}</p>}
                  <button className="hero-cta-btn" tabIndex={0} aria-label="Scopri di più">
                    Scopri di più
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="floating-particles" aria-hidden="true">
        {createParticles()}
      </div>

      <nav className="carousel-nav" aria-label="Navigazione carosello">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Vai alla slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : undefined}
            tabIndex={0}
          />
        ))}
      </nav>

      {/* Frecce e counter immagini rimossi temporaneamente */}

      <div className="progress-bar" key={currentSlide} aria-hidden="true"></div>
    </section>
  );
};
export default HeroSectionR;