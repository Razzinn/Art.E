import React from 'react';
import './IdeeRegaloPage.css';

export default function IdeeRegaloPage() {
  return (
    <div className="ideeregalo-hero">
      <div className="ideeregalo-hero-slide">
        {/* video posizionato a sinistra */}
        <video
          className="ideeregalo-video"
          src="/videosezionisingole/ideeregalo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="ideeregalo-content">
          <h1 className="ideeregalo-title">Idee Regalo</h1>
          <h2 className="ideeregalo-subtitle">Regala qualcosa che non esiste da nessun’altra parte.</h2>
          <p className="ideeregalo-description">
            Le nostre idee regalo sono create per sorprendere.
            Da oggetti decorativi a creazioni personalizzate stampate in 3D,
            ogni articolo nasce per trasmettere emozione, originalità e attenzione al dettaglio.
            Perfette per compleanni, anniversari, festività o eventi aziendali, le nostre proposte uniscono creatività e tecnologia.
          </p>
          <p className="ideeregalo-description-two">
            Puoi scegliere tra design già pronti o richiedere la creazione su misura,
            trasformando un’idea in un regalo unico e irripetibile.
          </p>
          <p className="ideeregalo-description-important">
            ➡️ Non regalare qualcosa di comune. Crea un ricordo che resta.
          </p>
        </div>
      </div>
    </div>
  );
}
