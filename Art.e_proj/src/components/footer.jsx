// Footer.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';
import './footer.css';

const Footer = ({
  company = {
    name: 'CREO',
    logoLetter: 'C',
    description: '',
    address: '',
    phone: '+381 60 3005439',
    email: 'creo3dshop@gmail.com',
    hours: '',
  },
  sections,
  onSubscribe,
  theme = 'light',
}) => {
  const { t, isLoading } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const defaultSections = useMemo(
    () => {
      // Se le traduzioni non sono ancora caricate, restituisci array vuoto
      if (isLoading) {
        return [];
      }
      
      return [
        {
          title: t('footer.sections.products'),
          links: [
            { label: t('footer.links.printing_3d'), href: '/servizi/3d-design-stampa-3d' },
            { label: t('footer.links.rapid_prototypes'), href: '/servizi/3d-design-stampa-3d' },
            { label: t('footer.links.custom_miniatures'), href: '/servizi/3d-design-stampa-3d' },
            { label: t('footer.links.corporate_gadgets'), href: '/servizi/3d-design-stampa-3d' },
            { label: t('footer.links.decorative_objects'), href: '/servizi/3d-design-stampa-3d' },
            { label: t('footer.links.all_3d_products'), href: '/stampa-3d', primary: true },
          ],
        },
        {
          title: t('footer.sections.clothing'),
          links: [
            { label: t('footer.links.custom_hoodies'), href: '/servizi/abbigliamento-e-custom' },
            { label: t('footer.links.custom_caps'), href: '/servizi/abbigliamento-e-custom' },
            { label: t('footer.links.custom_polos'), href: '/servizi/abbigliamento-e-custom' },
            { label: t('footer.links.merchandising'), href: '/servizi/abbigliamento-e-custom' },
            { label: t('footer.links.all_clothing'), href: '/abbigliamento', primary: true },
          ],
        },
        {
          title: t('footer.sections.digital_services'),
          links: [
            { label: t('footer.links.website_creation'), href: '/servizi/web-e-app-design' },
            { label: t('footer.links.app_development'), href: '/servizi/web-e-app-design' },
            { label: t('footer.links.ecommerce'), href: '/servizi/web-e-app-design' },
            { label: t('footer.links.logo_restyling'), href: '/servizi/web-e-app-design' },
            { label: t('footer.links.brand_identity'), href: '/servizi/web-e-app-design' },
            { label: t('footer.links.social_media_marketing'), href: '/servizi/web-e-app-design' },
            { label: t('footer.links.graphic_design'), href: '/servizi/web-e-app-design' },
            { label: t('footer.links.digital_consulting'), href: '/webapp-design', primary: true },
          ],
        },
        {
          title: t('footer.sections.gift_ideas'),
          links: [
            { label: t('footer.links.custom_keychains'), href: '/servizi/regali-e-prank' },
            { label: t('footer.links.personalized_mugs'), href: '/servizi/regali-e-prank' },
            { label: t('footer.links.photo_frames'), href: '/servizi/regali-e-prank' },
            { label: t('footer.links.surprise_boxes'), href: '/servizi/regali-e-prank' },
          ],
        },
      ];
    },
    [t, isLoading] // Aggiungo isLoading come dipendenza
  );

  const effectiveSections = sections && Array.isArray(sections) ? sections : defaultSections;

  const brandEmoji = '😉';
  const brandParts = useMemo(() => {
    const name = (company?.name || '').toString();
    return {
      base: name,
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
      setSubmitError(t('footer.newsletter.enter_email'));
      return;
    }
    if (!isValidEmail(trimmed)) {
      setSubmitError(t('footer.newsletter.invalid_email'));
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(t('footer.newsletter.subscribing'));

    try {
      if (onSubscribe) {
        await onSubscribe(trimmed);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }
      setIsSubscribed(true);
      setStatusMessage(t('footer.newsletter.success_message'));
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch {
      setSubmitError(t('footer.newsletter.subscription_error'));
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
                    <span className="footer-logo-emoji" role="img" aria-label={t('footer.winking_face')}>{brandEmoji}</span>
                  </div>
                </div>
                <p className="footer-description">
                  {t('footer.company.description')}
                </p>
                
                <div className="contact-info">
                  <div className="contact-item">
                    <span className="contact-icon">📍</span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t('footer.company.address'))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-secondary"
                      aria-label={`Apri su Maps: ${t('footer.company.address')}`}
                    >
                      {t('footer.company.address')}
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
                    <span>{t('footer.company.hours')}</span>
                  </div>
                </div>

                <div className="social-links" aria-label="Seguici sui social">
                  <a href="https://www.facebook.com/creo3dshop" className="social-link facebook" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/creo3dshop" className="social-link instagram" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* NEWSLETTER - Next to company */}
              <div className="footer-section newsletter-section newsletter-desktop" aria-labelledby="newsletter-title">
                <h3 id="newsletter-title" className="newsletter-title">
                  📬 {t('footer.newsletter.title')}
                </h3>
                <p className="newsletter-desc">
                  {t('footer.newsletter.description')}
                </p>
                
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit} noValidate aria-busy={isSubmitting}>
                  <input 
                    type="email" 
                    className="newsletter-input" 
                    placeholder={t('footer.newsletter.email_placeholder')}
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
                    {isSubmitting ? t('footer.newsletter.subscribing') : isSubscribed ? '✅ ' + t('footer.newsletter.success_message') : t('footer.newsletter.subscribe_button')}
                  </button>
                </form>
                
                <div id="newsletter-status" role="status" aria-live="polite" className="visually-hidden">
                  {statusMessage}
                </div>
                {submitError && (
                  <p id="newsletter-error" role="alert" style={{ color: '#FCA5A5', marginTop: 6, fontSize: '0.8rem' }}>
                    {submitError}
                  </p>
                )}
                
                <p className="newsletter-privacy" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
                  {t('footer.newsletter.privacy_consent')} <a href="#" className="link-secondary">{t('footer.legal.privacy_policy')}</a>
                </p>
              </div>

              {/* SECTIONS (data-driven) */}
              {effectiveSections.map((section, idx) => (
                <div className="footer-section" key={section.title + idx} aria-labelledby={`footer-section-${idx}`} role="navigation">
                  <h3 id={`footer-section-${idx}`} className="footer-title">{section.title}</h3>
                  <ul className="footer-links">
                    {section.links?.map((link) => (
                      <li key={link.label}>
                        <Link to={link.href || '#'} className={link.primary ? 'footer-link-primary' : ''}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* NEWSLETTER MOBILE - Below sections on mobile */}
            <div className="newsletter-section newsletter-mobile" aria-labelledby="newsletter-title-mobile">
              <h3 id="newsletter-title-mobile" className="newsletter-title">
                📬 {t('footer.newsletter.title')}
              </h3>
              <p className="newsletter-desc">
                {t('footer.newsletter.description')}
              </p>
              
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit} noValidate aria-busy={isSubmitting}>
                <input 
                  type="email" 
                  className="newsletter-input" 
                  placeholder={t('footer.newsletter.email_placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  disabled={isSubmitting || isSubscribed}
                />
                <button 
                  type="submit" 
                  className="newsletter-btn"
                  disabled={isSubmitting || isSubscribed}
                >
                  {isSubmitting ? t('footer.newsletter.subscribing') : isSubscribed ? '✅ ' + t('footer.newsletter.success_message') : t('footer.newsletter.subscribe_button')}
                </button>
              </form>
              
              <p className="newsletter-privacy" style={{ fontSize: '0.75rem', lineHeight: '1.4' }}>
                {t('footer.newsletter.privacy_consent')} <a href="#" className="link-secondary">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">
          <div className="footer-container">
            <div className="footer-bottom-content">
              <div className="footer-copyright">
                © 2024 Creo Marketplace. {t('footer.legal.all_rights_reserved')}.
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
        aria-label={t('footer.back_to_top')}
        title={t('footer.back_to_top')}
      >
        ↑
      </button>
    </>
  );
};

export default Footer;