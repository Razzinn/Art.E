// Footer.jsx
import React, { useEffect, useMemo, useState } from 'react';
import './footer.css';

const Footer = ({
  company = {
    name: 'CREO',
    logoLetter: 'C',
    description:
      'Trasformiamo le tue idee in realtà con stampa 3D, abbigliamento personalizzato, servizi digitali e creatività italiana di qualità superiore.',
    address: 'Via Roma 123, 20121 Milano, Italia',
    phone: '+381 60 3005439',
    email: 'info@creo-marketplace.it',
    hours: 'Tutti i giorni: 08:00–20:00',
  },
  sections,
  onSubscribe,
  theme = 'light',
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const defaultSections = useMemo(
    () => (
      [
        {
          title: 'Prodotti',
          links: [
            { label: 'Stampa 3D', href: '#' },
            { label: 'Prototipi Rapidi', href: '#' },
            { label: 'Miniature Personalizzate', href: '#' },
            { label: 'Gadget Aziendali', href: '#' },
            { label: 'Oggetti Decorativi', href: '#' },
            { label: 'Spare Parts', href: '#' },
            { label: 'Prodotti Industriali', href: '#' },
            { label: 'Tutti i Prodotti 3D', href: '#', primary: true },
          ],
        },
        {
          title: 'Abbigliamento',
          links: [
            { label: 'T-shirt Personalizzate', href: '#' },
            { label: 'Felpe Custom', href: '#' },
            { label: 'Cappellini Ricamati', href: '#' },
            { label: 'Polo Aziendali', href: '#' },
            { label: 'Magliette Eventi', href: '#' },
            { label: 'Abbigliamento Sport', href: '#' },
            { label: 'Merchandising', href: '#' },
            { label: 'Catalogo Tessile', href: '#', primary: true },
          ],
        },
        {
          title: 'Servizi Digital',
          links: [
            { label: 'Creazione Siti Web', href: '#' },
            { label: 'E-commerce', href: '#' },
            { label: 'Restyling Logo', href: '#' },
            { label: 'Brand Identity', href: '#' },
            { label: 'Social Media Marketing', href: '#' },
            { label: 'SEO & SEM', href: '#' },
            { label: 'Graphic Design', href: '#' },
            { label: 'Consulenza Digital', href: '#', primary: true },
          ],
        },
      ]
    ),
    []
  );

  const effectiveSections = sections && Array.isArray(sections) ? sections : defaultSections;

  const brandEmoji = '😉';
  const brandParts = useMemo(() => {
    const name = (company?.name || '').toString();
    const endsWithO = /[Oo]$/.test(name);
    return {
      base: endsWithO ? name.slice(0, -1) : name,
      withEmoji: true,
    };
  }, [company?.name]);

  const sanitizedTelHref = useMemo(() => {
    const raw = (company?.phone || '').toString();
    const onlyDigitsPlus = raw.replace(/[^+\d]/g, '');
    return `tel:${onlyDigitsPlus}`;
  }, [company?.phone]);

  const isValidEmail = (value) => /.+@.+\..+/.test(String(value).toLowerCase());

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const trimmed = email.trim();
    if (!trimmed) {
      setSubmitError('Inserisci un\'email.');
      return;
    }
    if (!isValidEmail(trimmed)) {
      setSubmitError('Email non valida.');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('Iscrizione in corso...');

    try {
      if (onSubscribe) {
        await onSubscribe(trimmed);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
      setIsSubscribed(true);
      setStatusMessage('Iscrizione completata. Benvenuto!');
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (err) {
      setSubmitError('Si è verificato un errore. Riprova.');
      setStatusMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const onScroll = () => {
      const shouldShow = window.scrollY > 300;
      setShowBackToTop(shouldShow);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <footer className={`footer ${theme === 'dark' ? 'footer--dark' : ''}`} role="contentinfo" aria-label="Piè di pagina">
        <div className="footer-main">
          <div className="footer-container">
            <div className="footer-grid">
              
              {/* COMPANY INFO */}
              <div className="footer-section footer-company" aria-labelledby="footer-company-title">
                <div className="footer-logo" id="footer-company-title">
                  <div className="footer-logo-icon" aria-hidden="true">{company.logoLetter}</div>
                  <div className="footer-logo-text" aria-label={company.name}>
                    <span>{brandParts.base}</span>
                    <span className="footer-logo-emoji" role="img" aria-label="winking face">{brandEmoji}</span>
                  </div>
                </div>
                <p className="footer-description">
                  {company.description}
                </p>
                
                <div className="contact-info">
                  <div className="contact-item">
                    <span className="contact-icon">📍</span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-secondary"
                      aria-label={`Apri su Maps: ${company.address}`}
                    >
                      {company.address}
                    </a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <a href={sanitizedTelHref} className="link-secondary" aria-label={`Chiama ${company.phone}`}>{company.phone}</a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">✉️</span>
                    <a href={`mailto:${company.email}`} className="link-secondary" aria-label={`Scrivi a ${company.email}`}>{company.email}</a>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">🕒</span>
                    <span>{company.hours}</span>
                  </div>
                </div>

                <div className="social-links" aria-label="Seguici sui social">
                  <a href="#" className="social-link facebook" aria-label="Facebook">📘</a>
                  <a href="#" className="social-link instagram" aria-label="Instagram">📷</a>
                  <a href="#" className="social-link twitter" aria-label="Twitter">🐦</a>
                  <a href="#" className="social-link linkedin" aria-label="LinkedIn">💼</a>
                  <a href="#" className="social-link youtube" aria-label="YouTube">📺</a>
                </div>

                <div className="certifications">
                  <div className="cert-badge">🔒 SSL Secure</div>
                  <div className="cert-badge">✅ ISO 9001</div>
                  <div className="cert-badge">🇪🇺 GDPR</div>
                </div>
              </div>

              {/* SECTIONS (data-driven) */}
              {effectiveSections.map((section, idx) => (
                <div className="footer-section" key={section.title + idx} aria-labelledby={`footer-section-${idx}`} role="navigation">
                  <h3 id={`footer-section-${idx}`} className="footer-title">{section.title}</h3>
                  <ul className="footer-links">
                    {section.links?.map((link) => (
                      <li key={link.label}>
                        <a href={link.href || '#'} className={link.primary ? 'footer-link-primary' : ''}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* NEWSLETTER */}
              <div className="footer-section newsletter-section">
                <div className="newsletter-title">
                  📬 Newsletter Creo
                </div>
                <p className="newsletter-desc">
                  Ricevi offerte esclusive, novità prodotti e consigli creativi 
                  direttamente nella tua casella email.
                </p>
                
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit} noValidate aria-busy={isSubmitting}>
                  <input 
                    type="email" 
                    className="newsletter-input" 
                    placeholder="La tua email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={!!submitError}
                    aria-describedby="newsletter-status newsletter-error"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    disabled={isSubmitting || isSubscribed}
                  />
                  <button 
                    type="submit" 
                    className="newsletter-btn"
                    aria-disabled={isSubmitting || isSubscribed}
                    disabled={isSubmitting || isSubscribed}
                  >
                    {isSubmitting ? 'Iscrizione...' : isSubscribed ? '✅ Iscritto!' : 'Iscriviti'}
                  </button>
                </form>
                <div id="newsletter-status" role="status" aria-live="polite" className="visually-hidden">
                  {statusMessage}
                </div>
                {submitError && (
                  <p id="newsletter-error" role="alert" style={{ color: '#FCA5A5', marginTop: 6, fontSize: '0.9rem' }}>
                    {submitError}
                  </p>
                )}
                
                <p className="newsletter-privacy">
                  Iscrivendoti accetti la nostra <a href="#" className="link-secondary">Privacy Policy</a> e 
                  i <a href="#" className="link-secondary">Termini di Servizio</a>. 
                  Puoi disiscriverti in qualsiasi momento.
                </p>

                <div className="newsletter-benefits">
                  <h4 className="benefits-title">🏆 Vantaggi VIP:</h4>
                  <ul className="benefits-list">
                    <li>✅ Sconti esclusivi fino al 20%</li>
                    <li>🚀 Accesso anticipato alle novità</li>
                    <li>🎁 Regalo di benvenuto</li>
                    <li>📞 Supporto clienti prioritario</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">
          <div className="footer-container">
            <div className="footer-bottom-content">
              <div className="footer-copyright">
                © 2024 Creo Marketplace. Tutti i diritti riservati. | P.IVA: 12345678901
              </div>
              
              <div className="footer-legal">
                <a href="#" className="link-secondary">Privacy Policy</a>
                <a href="#" className="link-secondary">Termini di Servizio</a>
                <a href="#" className="link-secondary">Cookie Policy</a>
                <a href="#" className="link-secondary">Resi & Rimborsi</a>
                <a href="#" className="link-secondary">Spedizioni</a>
                <a href="#" className="link-secondary">FAQ</a>
              </div>
              
              <div className="footer-payment">
                <span className="payment-text">Pagamenti sicuri:</span>
                <div className="payment-icons">
                  <div className="payment-icon">VISA</div>
                  <div className="payment-icon">PayPal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP BUTTON */}
      <button
        className={`back-to-top ${showBackToTop ? 'is-visible' : ''}`}
        onClick={scrollToTop}
        type="button"
        aria-label="Torna all'inizio"
        title="Torna all'inizio"
      >
        ↑
      </button>
    </>
  );
};

export default Footer;