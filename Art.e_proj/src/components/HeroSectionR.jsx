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
      description: 'Diamo forma alle tue idee in 3D',
      description: 'Dal modello digitale all oggetto reale: creazioni uniche, rpototipi, gadget e design personalizzati.',
    },
    {
      id: 2,
      image: '/abbigliamentopersonalizzato.jpeg',
      alt: 'Abbigliamento personalizzato',
      title: 'Abbigliamento Personalizzato',
      description: 'Indossa la tua creativita',
      description: 'T-shirt, body, cappellini e accessori personalizzati: ogni capo diventa un messaggio, ogni stile la tua firma.',
    },
    {
      id: 3,
      image: '/webdevelopement.jpeg',
      alt: 'Web development/design',
      title: 'Web & App Design',
      description: 'Costruiamo la tua identita digitale',
      description: 'Siti Web moderni, App intuitive e soluzioni grafiche per far crescere il tuo brand online.',
    },
    {
      id: 4,
      image: '/prankservice.jpeg',
      alt: 'Prank service',
      title: 'Idee Regalo',
      description: 'Un regalo che parla di te',
      description: 'Creazioni originali e personalizzate, perfette per sorprendere e lasciare il segno in ogni occazione.',
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
    const interval = setInterval(nextSlide, 6000);
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


  // Create particles
  const createParticles = () => {
    const particles = [];
    const particleCount = 15;
    const colors = ['#2563EB', '#60A5FA', '#F97316', '#FACC15'];

    for (let i = 0; i < particleCount; i++) {
      particles.push(
        <div
          key={i}
          className="particle"
          style={{
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 8 + 's',
            animationDuration: (8 + Math.random() * 4) + 's',
            background: colors[Math.floor(Math.random() * colors.length)]
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
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={getSlideClass(index)}
            style={{ backgroundImage: `url(${slide.image})` }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slide.alt} (${index + 1} di ${slides.length})`}
            tabIndex={index === currentSlide ? 0 : -1}
          >

            <img src={slide.image} alt={slide.alt} style={{ display: 'none' }} />
            <div className="slide-overlay"></div>
            {index === currentSlide && (
              <div className="hero-title spectacular-title" aria-live="polite">
                <span>{slide.title}</span>
              </div>
            )}
          </div>
        ))}
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

      <div className="carousel-arrows">
        <button className="carousel-arrow prev-arrow" onClick={prevSlide} aria-label="Slide precedente">
          ‹
        </button>
        <button className="carousel-arrow next-arrow" onClick={nextSlide} aria-label="Slide successiva">
          ›
        </button>
      </div>

      <div className="slide-indicator" aria-live="polite">
        <span>{String(currentSlide + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(2, '0')}
      </div>

      <div className="progress-bar" key={currentSlide} aria-hidden="true"></div>
    </section>
  );
};
export default HeroSectionR;