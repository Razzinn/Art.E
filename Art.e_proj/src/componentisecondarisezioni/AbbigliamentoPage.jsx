/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import { seoConfig, generateBreadcrumbSchema } from '../data/seoConfig';
import "./AbbigliamentoPage.css";

export default function AbbigliamentoPage() {
  const { t, isLoading } = useTranslation();
  
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Abbigliamento Personalizzato', url: '/abbigliamento' }
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

  return (
    <>
      <SEO 
        title={seoConfig.abbigliamento.title}
        description={seoConfig.abbigliamento.description}
        keywords={seoConfig.abbigliamento.keywords}
        image={seoConfig.abbigliamento.image}
        canonicalUrl="https://creo-marketplace.it/abbigliamento"
        structuredData={{
          ...seoConfig.abbigliamento.structuredData,
          breadcrumb: generateBreadcrumbSchema(breadcrumbs)
        }}
      />
      <div className="abbigliamento-hero">
      {/* --- SFONDO HERO --- */}
      <div className="abbigliamento-hero-slide"></div>

      {/* --- CONTENUTO HERO (VIDEO + TESTO) --- */}
      <motion.div
        className="abbigliamento-content-wrapper"
        {...animationVariants.container}
      >
        {/* --- VIDEO OTTIMIZZATO --- */}
        <motion.div
          className="abbigliamento-video"
          {...animationVariants.video}
        >
          <video
            className="abbigliamento-video-player"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata" // Ottimizzazione: Carica solo metadata
          >
            <source
              src="/videosezionisingole/abbigliamentopersonalizzato.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>

        {/* --- TESTO OTTIMIZZATO --- */}
        <motion.div
          className="abbigliamento-content"
          {...animationVariants.content}
        >
          <motion.h1
            className="abbigliamento-title"
            variants={animationVariants.text}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('pages.abbigliamento.title')}
          </motion.h1>

          <motion.h2
            className="abbigliamento-subtitle"
            variants={animationVariants.text}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('pages.abbigliamento.subtitle')}
          </motion.h2>

          <motion.p
            className="abbigliamento-description"
            variants={animationVariants.text}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.3 }}
            dangerouslySetInnerHTML={{ __html: t('pages.abbigliamento.description1') }}
          />

          <motion.p
            className="abbigliamento-description-two"
            variants={animationVariants.text}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6, delay: 0.4 }}
            dangerouslySetInnerHTML={{ __html: t('pages.abbigliamento.description2') }}
          />

          <motion.div
            className="abbigliamento-description-important"
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
              to="/servizi/abbigliamento-e-custom"
              style={{
                color: 'inherit',
                textDecoration: 'none',
                display: 'block',
                width: '100%'
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: t('pages.abbigliamento.cta') }} />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
}
