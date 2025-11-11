/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import { seoConfig, generateBreadcrumbSchema } from '../data/seoConfig';
import "./WebAppDesignPage.css";

export default function WebAppDesignPage() {
  const { t, isLoading } = useTranslation();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Web Design', url: '/webapp-design' }
  ];

  // Memoized animation variants for better performance
  const animationVariants = useMemo(() => ({
    container: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 }
    },
    video: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 }
    },
    text: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 }
    }
  }), []);

  return (
    <>
      <SEO 
        title={seoConfig.webDesign.title}
        description={seoConfig.webDesign.description}
        keywords={seoConfig.webDesign.keywords}
        image={seoConfig.webDesign.image}
        canonicalUrl="https://creo-marketplace.it/webapp-design"
        structuredData={{
          ...seoConfig.webDesign.structuredData,
          breadcrumb: generateBreadcrumbSchema(breadcrumbs)
        }}
      />
      <div className="webapp-hero">
      {/* --- SFONDO HERO --- */}
      <div className="webapp-hero-slide"></div>

      {/* --- CONTENUTO HERO (VIDEO + TESTO) --- */}
      <motion.div
        className="webapp-content-wrapper"
        variants={animationVariants.container}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* --- VIDEO CON FRAME ELEGANTE --- */}
        <motion.div
          className="webapp-video"
          variants={animationVariants.video}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Frame Tech Luxury */}
          <div className="tech-frame-luxury">
            {/* Angoli con circuiti */}
            <div className="frame-corner-circuit corner-tl"></div>
            <div className="frame-corner-circuit corner-tr"></div>
            <div className="frame-corner-circuit corner-bl"></div>
            <div className="frame-corner-circuit corner-br"></div>
            {/* LED decorativi */}
            <div className="frame-led-deco led-tl"></div>
            <div className="frame-led-deco led-tr"></div>
            <div className="frame-led-deco led-bl"></div>
            <div className="frame-led-deco led-br"></div>
            {/* Aura tech */}
            <div className="tech-aura"></div>
          </div>
          <video
            className="webapp-video-player"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          >
            <source src="/videosezionisingole/webapp.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* --- TESTO --- */}
        <motion.div
          className="webapp-content"
          variants={animationVariants.container}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.h1
            className="webapp-title"
            variants={animationVariants.text}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="title-line">
              {t('pages.webappdesign.title')}
            </span>
            <div className="title-underline"></div>
          </motion.h1>

          <motion.h2
            className="webapp-subtitle"
            variants={animationVariants.text}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('pages.webappdesign.subtitle')}
          </motion.h2>

          <motion.p
            className="webapp-description"
            variants={animationVariants.text}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.3 }}
            dangerouslySetInnerHTML={{ __html: t('pages.webappdesign.description1') }}
          />

          <motion.p
            className="webapp-description-two"
            variants={animationVariants.text}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.4 }}
            dangerouslySetInnerHTML={{ __html: t('pages.webappdesign.description2') }}
          />

          <motion.p
            className="webapp-description-three"
            variants={animationVariants.text}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.5 }}
            dangerouslySetInnerHTML={{ __html: t('pages.webappdesign.description3') }}
          />

          <motion.div
            className="cta-wrapper"
            variants={animationVariants.text}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="cta-decorative-frame">
              <div className="cta-corner cta-corner-tl"></div>
              <div className="cta-corner cta-corner-tr"></div>
              <div className="cta-corner cta-corner-bl"></div>
              <div className="cta-corner cta-corner-br"></div>
              <div className="cta-pulse-line cta-pulse-top"></div>
              <div className="cta-pulse-line cta-pulse-right"></div>
              <div className="cta-pulse-line cta-pulse-bottom"></div>
              <div className="cta-pulse-line cta-pulse-left"></div>
            </div>
            
            <motion.div
              className="webapp-description-important"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <Link 
                to="/servizi/web-e-app-design"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                  display: 'block',
                  width: '100%'
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: t('pages.webappdesign.cta') }} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
}
