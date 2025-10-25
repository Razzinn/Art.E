import React from 'react';
import './AbbigliamentoPage.css';

const AbbigliamentoPage = () => {
  return (
    <section className="abbigliamento-page">
      <div className="container">
        <h1>👕 Abbigliamento Custom</h1>
        <p className="subtitle">Personalizza il tuo stile con T-shirt, felpe e accessori unici!</p>

        <div className="content-grid">
          <div className="info-card">
            <h2>🎨 Cosa Offriamo</h2>
            <ul>
              <li>T-shirt personalizzate</li>
              <li>Felpe con stampe custom</li>
              <li>Cappellini e accessori</li>
              <li>Design su misura</li>
              <li>Stampe di alta qualità</li>
            </ul>
          </div>

          <div className="info-card">
            <h2>⚡ Processo Veloce</h2>
            <ol>
              <li>Scegli il capo</li>
              <li>Invia il tuo design</li>
              <li>Conferma e paga</li>
              <li>Ricevi a casa</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AbbigliamentoPage;
