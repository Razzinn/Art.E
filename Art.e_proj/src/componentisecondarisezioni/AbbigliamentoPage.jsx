import React from "react";
import './AbbigliamentoPage.css';

export default function AbbigliamentoPage() {
  return (
    <div className="abbigliamento-hero">
      <div 
        className="abbigliamento-hero-slide"
      >
        <div className="abbigliamento-content">
          <h1 className="abbigliamento-title">Abbigliamento Personalizzato</h1>
          <h2 className="abbigliamento-subtitle">Esprimi il tuo stile unico</h2>
          <p className="abbigliamento-description">
            Scopri la nostra collezione di abbigliamento personalizzato, 
            dove ogni capo racconta la tua storia attraverso design esclusivi 
            e materiali di alta qualità.
          </p>
        </div>
      </div>
    </div>
  );
}
