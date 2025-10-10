import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand section */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-icon">C</span>
            <span className="footer-logo-text">CREO</span>
          </div>
          <p className="footer-description">
            Trasformiamo le tue idee in realtà con stampa 3D, abbigliamento personalizzato, servizi digitali e creatività italiana di qualità superiore.
          </p>
          
          <div className="footer-contact">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>Via Roma 123, 20121 Milano, Italia</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>+39 02 1234 5678</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <span>info@creo-marketplace.it</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕒</span>
              <span>Lun-Ven: 9:00-18:00</span>
            </div>
          </div>

          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Facebook">
              <div className="social-icon facebook"></div>
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <div className="social-icon instagram"></div>
            </a>
            <a href="#" className="social-link" aria-label="TikTok">
              <div className="social-icon tiktok"></div>
            </a>
            <a href="#" className="social-link" aria-label="YouTube">
              <div className="social-icon youtube"></div>
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <div className="social-icon linkedin"></div>
            </a>
          </div>
        </div>

        {/* Products column */}
        <div className="footer-column">
          <h3 className="column-title">Prodotti</h3>
          <ul className="footer-links">
            <li><a href="#">Stampa 3D</a></li>
            <li><a href="#">Prototipi Rapidi</a></li>
            <li><a href="#">Miniature Personalizzate</a></li>
            <li><a href="#">Gadget Aziendali</a></li>
            <li><a href="#">Oggetti Decorativi</a></li>
            <li><a href="#">Spare Parts</a></li>
            <li><a href="#">Prodotti Industriali</a></li>
            <li><a href="#">Tutti i Prodotti 3D</a></li>
          </ul>
        </div>

        {/* Clothing column */}
        <div className="footer-column">
          <h3 className="column-title">Abbigliamento</h3>
          <ul className="footer-links">
            <li><a href="#">T-shirt Personalizzate</a></li>
            <li><a href="#">Felpe Custom</a></li>
            <li><a href="#">Cappellini Ricamati</a></li>
            <li><a href="#">Polo Aziendali</a></li>
            <li><a href="#">Magliette Eventi</a></li>
            <li><a href="#">Abbigliamento Sport</a></li>
            <li><a href="#">Merchandising</a></li>
            <li><a href="#">Catalogo Tessile</a></li>
          </ul>
        </div>

        {/* Digital Services column */}
        <div className="footer-column">
          <h3 className="column-title">Servizi Digital</h3>
          <ul className="footer-links">
            <li><a href="#">Creazione Siti Web</a></li>
            <li><a href="#">E-commerce</a></li>
            <li><a href="#">Restyling Logo</a></li>
            <li><a href="#">Brand Identity</a></li>
            <li><a href="#">Social Media Marketing</a></li>
            <li><a href="#">SEO & SEM</a></li>
            <li><a href="#">Graphic Design</a></li>
            <li><a href="#">Consulenza Digital</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-badges">
            <span className="badge ssl">🔒 SSL Secure</span>
            <span className="badge iso">✓ ISO 9001</span>
          </div>
          <div className="footer-legal">
            <span>© GDPR</span>
          </div>
        </div>
      </div>
    </footer>
  )
}