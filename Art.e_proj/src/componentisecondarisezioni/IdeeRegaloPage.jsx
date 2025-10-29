/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './IdeeRegaloPage.css';

export default function IdeeRegaloPage() {
  useEffect(() => {
    const hero = document.querySelector(".ideeregalo-hero");
    const slide = document.querySelector(".ideeregalo-hero-slide");

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      slide.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
      hero.style.backgroundPosition = `${50 + x / 3}% ${50 + y / 3}%`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="ideeregalo-hero">
      <div className="ideeregalo-hero-slide">
        <motion.div
          className="ideeregalo-content"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        >
          <motion.h1
            className="ideeregalo-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Idee Regalo
          </motion.h1>

          <motion.h2
            className="ideeregalo-subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Regala qualcosa che non esiste da nessun'altra parte.
          </motion.h2>

          <motion.p
            className="ideeregalo-description"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Le nostre idee regalo sono create per sorprendere.
            Da oggetti decorativi a creazioni personalizzate stampate in 3D,
            ogni articolo nasce per trasmettere emozione, originalità e attenzione al dettaglio.
            Perfette per compleanni, anniversari, festività o eventi aziendali, le nostre proposte uniscono creatività e tecnologia.
          </motion.p>

          <motion.p
            className="ideeregalo-description-two"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Puoi scegliere tra design già pronti o richiedere la creazione su misura,
            trasformando un'idea in un regalo unico e irripetibile.
          </motion.p>

          <motion.p
            className="ideeregalo-description-important"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            ➡️ Non regalare qualcosa di comune. Crea un ricordo che resta.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
