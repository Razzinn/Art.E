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
        {/* --- VIDEO --- */}
        <motion.div
          className="webapp-video"
          variants={animationVariants.video}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, delay: 0.2 }}
        >
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
            {t('pages.webappdesign.title')}
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
            className="webapp-description-important"
            variants={animationVariants.text}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.6 }}
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
    </div>
    </>
  );
}
