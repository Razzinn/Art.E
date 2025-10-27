import React from 'react';
import './AbbigliamentoPage.css';

export default function AbbigliamentoPage() {
  return (
    <div className="abbigliamento-hero">
      <div className="abbigliamento-hero-slide">
        <div className="abbigliamento-content">
          <h1 className="abbigliamento-title">Abbigliamento Personalizzato</h1>
          <h2 className="abbigliamento-subtitle">Distinguiti con ciò che indossi.</h2>
          <p className="abbigliamento-description">
            Con CREO puoi trasformare un semplice capo in un mezzo di espressione o promozione unica.
            Personalizziamo T-shirt, felpe, cappellini e abbigliamento da lavoro con stampe di alta qualità e materiali selezionati.
          </p>
          <p className="abbigliamento-description-two">
            Che tu voglia creare divise aziendali professionali, merchandising per eventi, o semplicemente regali personalizzati, curiamo ogni dettaglio: dalla grafica alla stampa finale.
            Grazie a tecniche moderne di stampa, come DTF, serigrafia o termostampa, garantiamo colori brillanti, durata e comfort su ogni prodotto.
          </p>
          <p className="abbigliamento-description-important">
            ➡️ Mostra la tua identità. Indossa le tue idee.
          </p>
        </div>
        {/* video posizionato a destra */}
        <video
          className="abbigliamento-video"
          src="/videosezionisingole/abbigliamentopersonalizzato.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </div>
  );
}
