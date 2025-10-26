
import React from 'react';
import './AbbigliamentoPage.css';
import AbbigliamentoHero from './AbbigliamentoHero';

const AbbigliamentoPage = () => {
  // Dati per il carosello dei prodotti
  // 6 prodotti con immagini PNG
  const products = [
    { id: 1, title: 'T-shirt', image: '/abbigliamento/tshirt.png' },
    { id: 2, title: 'Felpa', image: '/abbigliamento/felpa.png' },
    { id: 3, title: 'Cappellino', image: '/abbigliamento/cappellino.png' },
    { id: 4, title: 'Divisa aziendale', image: '/abbigliamento/divisa.png' },
    { id: 5, title: 'Gadget', image: '/abbigliamento/gadget.png' },
    { id: 6, title: 'Shopper', image: '/abbigliamento/shopper.png' }
  ];

  return (
    <div className="abbigliamento-page">
      {/* 1️⃣ Hero Section */}
      <AbbigliamentoHero onCtaClick={() => { /* azione CTA */ }} />

      {/* 2️⃣ Sezione Prodotti */}
      <section className="products-section">
        <div className="container">
          <h2>I Nostri Prodotti</h2>
          <div className="products-carousel">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3️⃣ Come Funziona */}
      <section className="process-section">
        <div className="container">
          <h2>Come Funziona</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">👕</div>
              <h3>Scegli il capo</h3>
            </div>
            <div className="step-card">
              <div className="step-icon">🎨</div>
              <h3>Carica il tuo design o logo</h3>
            </div>
            <div className="step-card">
              <div className="step-icon">✅</div>
              <h3>Approva l'anteprima</h3>
            </div>
            <div className="step-card">
              <div className="step-icon">📦</div>
              <h3>Ricevi il tuo ordine</h3>
            </div>
          </div>
        </div>
      </section>

      {/* 4️⃣ Vantaggi CREO */}
      <section className="benefits-section">
        <div className="container">
          <h2>Vantaggi CREO</h2>
          <div className="benefits-grid">
            <div className="benefit-item">✅ Stampe durature</div>
            <div className="benefit-item">✅ Colori vividi</div>
            <div className="benefit-item">✅ Nessun ordine minimo</div>
            <div className="benefit-item">✅ Supporto grafico incluso</div>
          </div>
        </div>
      </section>

      {/* 5️⃣ CTA finale */}
      <section className="cta-section">
        <div className="container">
          <h2>Vuoi un preventivo su misura?</h2>
          <button className="cta-button">Contattaci subito</button>
        </div>
      </section>
    </div>
  );
};

export default AbbigliamentoPage;
