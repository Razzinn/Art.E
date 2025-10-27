import React from 'react';
import './WebAppDesignPage.css';

const WebAppDesignPage = () => {
  return (
    <>
      <div className="webapp-hero">
        <div 
          className="webapp-hero-slide"
        >
          <div className="webapp-content">
            <h1 className="webapp-title">Web & App Design</h1>
            <h2 className="webapp-subtitle">Soluzioni digitali su misura</h2>
            <p className="webapp-description">
              Sviluppiamo siti web professionali e applicazioni moderne,
              con un focus su design responsivo, ottimizzazione SEO e
              user experience di alto livello.
            </p>
          </div>
        </div>
      </div>

      <section className="services-grid">
        <div className="service-card">
          <h3>🌐 Siti Web</h3>
          <p>Siti responsive, veloci e ottimizzati per i motori di ricerca</p>
          <ul>
            <li>Design moderno e professionale</li>
            <li>Ottimizzazione SEO</li>
            <li>Mobile-first approach</li>
            <li>Performance elevate</li>
          </ul>
        </div>

        <div className="service-card">
          <h3>📱 Web App</h3>
          <p>Applicazioni web interattive e funzionali</p>
          <ul>
            <li>Interfacce intuitive</li>
            <li>Backend robusto</li>
            <li>Database ottimizzati</li>
            <li>Sicurezza avanzata</li>
          </ul>
        </div>

        <div className="service-card">
          <h3>🎨 UI/UX Design</h3>
          <p>Design centrato sull'utente per esperienze coinvolgenti</p>
          <ul>
            <li>User research</li>
            <li>Wireframing e prototyping</li>
            <li>Test di usabilità</li>
            <li>Design system</li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default WebAppDesignPage;
