import { useEffect, useState, useRef } from 'react';
import './Offers.css';

export default function Offers() {
  const [currentSlide, setCurrentSlide] = useState({ colors: ['#8B5CF6', '#A855F7', '#C084FC'] });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef(null);

  useEffect(() => {
    const handleCarouselChange = (event) => {
      // Cancella transizioni precedenti se in corso
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      
      setIsTransitioning(true);
      
      // Usa requestAnimationFrame per sincronizzare con il refresh rate
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setCurrentSlide(event.detail.slide);
          
          // Termina la transizione dopo che il background è cambiato
          transitionTimeoutRef.current = setTimeout(() => {
            setIsTransitioning(false);
          }, 150);
        });
      });
    };
    
    window.addEventListener('carousel-change', handleCarouselChange);
    return () => {
      window.removeEventListener('carousel-change', handleCarouselChange);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const dynamicBackground = {
    background: `linear-gradient(135deg, ${currentSlide.colors?.[0] || '#8B5CF6'} 0%, ${currentSlide.colors?.[1] || '#A855F7'} 50%, ${currentSlide.colors?.[2] || '#C084FC'} 100%)`
  };

  return (
    <section className={`offers ${isTransitioning ? 'transitioning' : ''}`} style={dynamicBackground}>
      <div className="offers-container">
        <h2 className="offers-title">
          Prodotti personalizzati di qualità e servizi digitali all'avanguardia
        </h2>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 className="service-title">Stampa 3D</h3>
            <p className="service-description">Oggetti personalizzati stampati 3D con materiali di qualità.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20,12 20,22 4,22 4,12"/>
                <rect x="2" y="7" width="20" height="5"/>
                <line x1="12" y1="22" x2="12" y2="7"/>
                <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
                <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
              </svg>
            </div>
            <h3 className="service-title">Regali e Prank</h3>
            <p className="service-description">Regali di compleanno originali e scherzi divertenti.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6"/>
                <path d="M21 12h-6m-6 0H3"/>
                <path d="M18.36 6.64l-4.24 4.24m-4.24 0L5.64 6.64"/>
                <path d="M18.36 17.36l-4.24-4.24m-4.24 0l-4.24 4.24"/>
              </svg>
            </div>
            <h3 className="service-title">Restyling Logo</h3>
            <p className="service-description">Rinnova la tua identità aziendale con logo moderni.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
              </svg>
            </div>
            <h3 className="service-title">Abbigliamento Custom</h3>
            <p className="service-description">T-Shirt, felpe e accessori personalizzabili.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
                <line x1="2" y1="9" x2="22" y2="9"/>
                <circle cx="6.5" cy="6.5" r=".5"/>
                <circle cx="9.5" cy="6.5" r=".5"/>
              </svg>
            </div>
            <h3 className="service-title">Siti Web</h3>
            <p className="service-description">Siti e app professionali responsive e ottimizzati SEO.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 className="service-title">Servizi Digitali</h3>
            <p className="service-description">Digital marketing, social media management e grafica pubblicitaria.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
