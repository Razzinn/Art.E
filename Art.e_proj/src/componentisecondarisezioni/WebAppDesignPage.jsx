import React from 'react';
import './WebAppDesignPage.css';

const WebAppDesignPage = () => {
  return (
    <>
      <main className="webapp-design-page">
        <h1>Web & App Design</h1>
        <p>Servizi di progettazione web e sviluppo di applicazioni.</p>
      </main>

      <div className="webapp-hero">
        <div className="webapp-hero-slide">
          <div className="webapp-content">
            <h1 className="webapp-title">Web & App Design</h1>
            <h2 className="webapp-subtitle">Costruiamo esperienze digitali che lasciano il segno.</h2>
            <p className="webapp-description">
              In un mondo sempre più connesso, la tua presenza online è la chiave per farti conoscere,
              vendere e crescere. In CREO realizziamo siti web moderni, responsive e ottimizzati SEO,
              pensati per attirare e convertire i tuoi visitatori.
            </p>
            <p className="webapp-description-two">
              Dalla vetrina aziendale all’e-commerce, fino ad arrivare allo sviluppo di app personalizzate,
              il nostro obiettivo è tradurre la tua idea in una piattaforma funzionale, sicura e dal design curato nei minimi dettagli.
            </p>
            <p className="webapp-description-three">
              Offriamo soluzioni su misura per aziende,
              freelance e start-up, garantendo assistenza, aggiornamenti e scalabilità nel tempo.
            </p>
            <p className="webapp-description-important">
              ➡️ Non limitarti a essere online. Fatti notare, con stile.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebAppDesignPage;
