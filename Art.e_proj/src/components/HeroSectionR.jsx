import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSectionR.css';

const HeroSectionR = ({ onOpenSubsection }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = React.useRef(null);


  const slides = [
    {
      id: 1,
      image: '/sfondoslide1creo.jpeg',
      alt: 'Progettazione 3D',
      title: '3D Design & Stampa 3D',
      subtitle: 'Dall’idea alla realizzazione del prodotto finito',
      description:
        "Dal modello digitale all'oggetto reale: creazioni uniche, prototipi, gadget e design personalizzati.",
      section: '3DDesignStampa3D',
    },
    {
      id: 2,
      image: '/abbigliamentopersonalizzato.jpeg',
      alt: 'Abbigliamento personalizzato',
      title: 'Abbigliamento Personalizzato',
      subtitle: 'Indossa la tua idea',
      description:
        'T-shirt, body, cappellini e accessori personalizzati: ogni capo diventa un messaggio, ogni stile la tua firma.',
      section: 'Abbigliamento',
    },
    {
      id: 3,
      image: '/webdevelopement.jpeg',
      alt: 'Web development/design',
      title: 'Web & App Design',
      subtitle: 'Esperienze digitali efficaci',
      description:
        'Siti Web moderni, App intuitive e soluzioni grafiche per far crescere il tuo brand online.',
      section: 'WebAppDesign',
    },
    {
      id: 4,
      image: '/prankservice.jpeg',
      alt: 'Prank service',
      title: 'Idee Regalo',
      subtitle: 'Sorprendi con originalità',
      description:
        'Creazioni originali e personalizzate, perfette per sorprendere e lasciare il segno in ogni occasione.',
      section: 'IdeeRegalo',
    },
  ];

  const goToSlide = useCallback((index) => setCurrentSlide(index), []);
  const nextSlide = useCallback(() => setCurrentSlide((prev) => (prev + 1) % slides.length), [slides.length]);
  const prevSlide = useCallback(() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1)), [slides.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [prevSlide, nextSlide]);

  const createParticles = () => {
    const particles = [];
    const colors = ['#2563EB', '#60A5FA', '#F97316', '#FACC15', '#fff', '#ffe066'];
    const sizes = [4, 6, 8, 10];
    for (let i = 0; i < 28; i++) {
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      particles.push(
        <div
          key={i}
          className="particle"
          style={{
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 8 + 's',
            animationDuration: 7 + Math.random() * 5 + 's',
            background: colors[Math.floor(Math.random() * colors.length)],
            width: size + 'px',
            height: size + 'px',
            opacity: 0.7 + Math.random() * 0.3,
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

  const handleCtaClick = (sectionName) => {
    const activeSlide = document.querySelector('.slide.active');
    const sideImg = activeSlide?.querySelector('.hero-side-img-full');
    const content = activeSlide?.querySelector('.slide-content');
    if (!sideImg) return;
    content?.classList.add('fade-out');
    sideImg.classList.add('zoom-center');
    setTimeout(() => {
      // Se è passato un callback esterno, mantenerlo per retrocompatibilità
      if (onOpenSubsection && sectionName) {
        onOpenSubsection(sectionName);
        return;
      }

      // Altrimenti mappiamo la sezione alla rotta corrispondente
      const routeMap = {
        '3DDesignStampa3D': '/stampa-3d',
        'Abbigliamento': '/abbigliamento',
        'WebAppDesign': '/webapp-design',
        'IdeeRegalo': '/idee-regalo',
      };

      const navigate = _navigateRef.current;
      const target = routeMap[sectionName];
      if (target && navigate) navigate(target);
    }, 1200);
  };

  // useNavigate inside callbacks: manteniamo un ref per evitarne la ricreazione nelle dipendenze
  const _navigateRef = React.useRef(null);
  const navigate = useNavigate();
  React.useEffect(() => { _navigateRef.current = navigate; }, [navigate]);

  return (
    <section ref={heroRef} className="hero-carousel" aria-label="Hero con carosello immagini">
      <div className="carousel-container">
        {slides.map((slide, index) => {
          let extraClass = '';
          if (slide.id === 1) extraClass = ' hero-center-top';
          if (slide.id === 2) extraClass = ' hero-center-mid';
          return (
            <div key={slide.id} className={getSlideClass(index) + extraClass} style={{ backgroundImage: `url(${slide.image})` }}>
              {index === currentSlide && (
                <>
                  {/* 🗿 Slide 1 – Statua 3D */}
                  {slide.id === 1 && (
                    <img
                      src="/statua1slide.png"
                      alt="Statua 3D Design"
                      className="hero-side-img-full right statua3d"
                    />
                  )}

                  {/* 👕 Slide 2 – Omino Abbigliamento */}
                  {slide.id === 2 && (
                    <img
                      src="/ominoabbigliamento.png"
                      alt="Omino Abbigliamento Personalizzato"
                      className="hero-side-img-full left ominoabb"
                    />
                  )}

                  {/* 💻 Slide 3 – PC Developer */}
                  {slide.id === 3 && (
                    <img
                      src="/pcdevnuovo.png"
                      alt="Computer Dev"
                      className="hero-side-img-full right pc"
                    />
                  )}

                  {/* 👶 Slide 4 – Bimbo Idee Regalo */}
                  {slide.id === 4 && (
                    <img
                      src="/bimboideeregzerosfondo.png"
                      alt="Bimbo Idee Regalo"
                      className="hero-side-img-full left bimbo"
                    />
                  )}

                  <div className={`slide-content${slide.id === 2 || slide.id === 4 ? ' align-right' : ' align-left'}`}>
                    <h2 className="slide-title">
                      <span className="hero-decor-line" aria-hidden="true"></span>
                      {slide.title}
                    </h2>
                    {slide.subtitle && <h3 className="slide-subtitle">{slide.subtitle}</h3>}
                    {slide.description && <p className="slide-description">{slide.description}</p>}
                    <button className="hero-cta-btn" onClick={() => handleCtaClick(slide.section)}>
                      Scopri di più
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="floating-particles">{createParticles()}</div>

      <nav className="carousel-nav">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </nav>

      <div className="progress-bar" key={currentSlide}></div>
    </section>
  );
};

export default HeroSectionR;
