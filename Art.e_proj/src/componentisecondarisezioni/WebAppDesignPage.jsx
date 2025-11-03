/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import "./WebAppDesignPage.css";

export default function WebAppDesignPage() {
  return (
    <div className="webapp-hero">
      {/* --- SFONDO HERO --- */}
      <div className="webapp-hero-slide"></div>

      {/* --- CONTENUTO HERO (VIDEO + TESTO) --- */}
      <motion.div
        className="webapp-content-wrapper"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      >
        {/* --- VIDEO --- */}
        <motion.div
          className="webapp-video"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <video
            className="webapp-video-player"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videosezionisingole/webapp.mp4" type="video/mp4" />
          </video>
        </motion.div>

        {/* --- TESTO --- */}
        <motion.div
          className="webapp-content"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <motion.h1
            className="webapp-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Web & App Design
          </motion.h1>

          <motion.h2
            className="webapp-subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Costruiamo esperienze digitali che lasciano il segno.
          </motion.h2>

          <motion.p
            className="webapp-description"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            In un mondo sempre più connesso, la tua presenza online è la chiave
            per farti conoscere, vendere e crescere. In <strong>CREO</strong>{" "}
            realizziamo siti web moderni, responsive e ottimizzati SEO, pensati
            per attirare e convertire i tuoi visitatori.
          </motion.p>

          <motion.p
            className="webapp-description-two"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Dalla vetrina aziendale all'e-commerce, fino ad arrivare allo
            sviluppo di app personalizzate, il nostro obiettivo è tradurre la
            tua idea in una piattaforma funzionale, sicura e dal design curato
            nei minimi dettagli.
          </motion.p>

          <motion.p
            className="webapp-description-three"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            Offriamo soluzioni su misura per aziende, freelance e start-up,
            garantendo assistenza, aggiornamenti e scalabilità nel tempo.
          </motion.p>

          <motion.p
            className="webapp-description-important"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            ➡️ Non limitarti a essere online.{" "}
            <span>Fatti notare, con stile.</span>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
