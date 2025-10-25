import React from 'react';
import './WebAppDesignPage.css';

const WebAppDesignPage = () => {
  return (
    <section className="webapp-design-page">
      <div className="container">
        <h1>💻 Siti Web & App Design</h1>
        <p className="subtitle">
          Sviluppiamo siti web professionali e applicazioni moderne responsive e ottimizzate SEO
        </p>

        <div className="services-grid">
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
        </div>
      </div>
    </section>
  );
};

export default WebAppDesignPage;
