
import React, { useEffect, useState } from 'react';
import './AbbigliamentoHero.css';


// Ogni PNG ha una posizione e un delay diversi
const heroPngs = [
  { src: '/PngAbbigliamentoHero/CapCreo.png', alt: 'CapCreo' },
  { src: '/PngAbbigliamentoHero/DonnaCreo.png', alt: 'DonnaCreo' },
  { src: '/PngAbbigliamentoHero/FamilyCreo.png', alt: 'FamilyCreo' },
  { src: '/PngAbbigliamentoHero/FelpaCreo.png', alt: 'FelpaCreo' },
  { src: '/PngAbbigliamentoHero/Jeans.png', alt: 'Jeans' },
  { src: '/PngAbbigliamentoHero/GirlCreo.png', alt: 'GirlCreo' }
];

const PNG_DISPLAY_TIME = 2600; // ms visibile (più lento)
const PNG_FADE_TIME = 700; // ms fade out (più lento)


const AbbigliamentoHero = ({ onCtaClick }) => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let fadeTimeout, nextTimeout;
    if (show) {
      fadeTimeout = setTimeout(() => setShow(false), PNG_DISPLAY_TIME);
    } else {
      nextTimeout = setTimeout(() => {
        setVisibleIndex((prev) => (prev + 1) % heroPngs.length);
        setShow(true);
      }, PNG_FADE_TIME);
    }
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(nextTimeout);
    };
  }, [show]);

  return (
    <section className="hero-section">
      <div className="hero-pngs-absolute-container">
        {heroPngs.map((img, i) => {
          // Alterna destra/sinistra e centra verticalmente, lasciando spazio centrale
          const isLeft = i % 2 === 0;
          const style = {
            position: 'absolute',
            top: '50%',
            left: isLeft ? '0' : 'unset',
            right: isLeft ? 'unset' : '0',
            transform: show && i === visibleIndex
              ? `translateY(-50%) scale(1.08) ${isLeft ? 'translateX(-2vw)' : 'translateX(2vw)'}`
              : `translateY(-50%) scale(0.92) ${isLeft ? 'translateX(-8vw)' : 'translateX(8vw)'}`,
            width: '38vw', // più grande
            maxWidth: '600px',
            minWidth: '220px',
            height: 'auto',
            maxHeight: '88vh',
            objectFit: 'contain',
            zIndex: 2,
            pointerEvents: 'none',
            opacity: show && i === visibleIndex ? 1 : 0,
            filter: show && i === visibleIndex ? 'drop-shadow(0 8px 32px rgba(0,0,0,0.18))' : 'none',
            transition: 'opacity 0.7s, transform 0.9s cubic-bezier(.77,0,.18,1), filter 0.7s',
            paddingLeft: isLeft ? '2vw' : 0,
            paddingRight: isLeft ? 0 : '2vw',
            boxSizing: 'border-box',
          };
          return (
            <img
              key={img.alt}
              src={img.src}
              alt={img.alt}
              className="hero-png-abs"
              style={style}
            />
          );
        })}
      </div>
      <div className="hero-content">
        <h1>Indossa la tua identità.</h1>
        <p className="subtitle">Personalizziamo ogni capo con stile, precisione e qualità.</p>
        <button className="cta-button" onClick={onCtaClick}>Crea ora il tuo design</button>
      </div>
    </section>
  );
};

export default AbbigliamentoHero;
