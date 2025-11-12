/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import { seoConfig, generateBreadcrumbSchema } from '../data/seoConfig';
import './IdeeRegaloPage.css';

export default function IdeeRegaloPage() {
  const { t, isLoading } = useTranslation();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Idee Regalo', url: '/idee-regalo' }
  ];

  // Ottimizzazione: Varianti memoizzate per prestazioni migliori
  const animationVariants = useMemo(() => ({
    container: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
    },
    video: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.8, delay: 0.2 }
    },
    content: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.8, delay: 0.3 }
    },
    text: {
      initial: { opacity: 0, y: 15 },
      animate: { opacity: 1, y: 0 }
    }
  }), []);

  // Throttled mouse move handler for better performance
  const throttledMouseMove = useCallback((e) => {
    const hero = document.querySelector(".ideeregalo-hero");
    const slide = document.querySelector(".ideeregalo-hero-slide");
    
    if (hero && slide) {
      const x = (e.clientX / window.innerWidth - 0.5) * 10; // Reduced movement intensity
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      
      requestAnimationFrame(() => {
        slide.style.transform = `scale(1.02) translate(${x}px, ${y}px)`;
        hero.style.backgroundPosition = `${50 + x / 6}% ${50 + y / 6}%`;
      });
    }
  }, []);

  useEffect(() => {
    let throttleTimer = null;
    const handleMouseMove = (e) => {
      if (throttleTimer === null) {
        throttleTimer = setTimeout(() => {
          throttledMouseMove(e);
          throttleTimer = null;
        }, 16); // ~60fps
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [throttledMouseMove]);

  return (
    <>
      <SEO 
        title={seoConfig.ideeRegalo.title}
        description={seoConfig.ideeRegalo.description}
        keywords={seoConfig.ideeRegalo.keywords}
        image={seoConfig.ideeRegalo.image}
        canonicalUrl="https://creo-marketplace.it/idee-regalo"
        structuredData={{
          ...seoConfig.ideeRegalo.structuredData,
          breadcrumb: generateBreadcrumbSchema(breadcrumbs)
        }}
      />
      <div className="ideeregalo-hero">
        {/* --- SFONDO HERO --- */}
        <div className="ideeregalo-hero-slide"></div>

        {/* --- CONTENUTO HERO (VIDEO + TESTO) --- */}
        <motion.div
          className="ideeregalo-content-wrapper"
          {...animationVariants.container}
        >
          {/* --- VIDEO --- */}
          <motion.div
            className="ideeregalo-video"
            {...animationVariants.video}
          >
            <video
              className="ideeregalo-video-player"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src="/videosezionisingole/ideeregalo.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* --- TESTO --- */}
          <motion.div
            className="ideeregalo-content"
            variants={animationVariants.container}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h1
              className="ideeregalo-title"
              variants={animationVariants.text}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t('pages.ideeregalo.title')}
            </motion.h1>

            <motion.h2
              className="ideeregalo-subtitle"
              variants={animationVariants.text}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('pages.ideeregalo.subtitle')}
            </motion.h2>

            <motion.p
              className="ideeregalo-description"
              variants={animationVariants.text}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.3 }}
              dangerouslySetInnerHTML={{ __html: t('pages.ideeregalo.description1') }}
            />

            <motion.p
              className="ideeregalo-description-two"
              variants={animationVariants.text}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.4 }}
              dangerouslySetInnerHTML={{ __html: t('pages.ideeregalo.description2') }}
            />

            <motion.div
              className="ideeregalo-cta"
              variants={animationVariants.text}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Link 
                to="/servizi/regali-e-prank"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  display: 'block',
                  width: '100%'
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: t('pages.ideeregalo.cta') }} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
