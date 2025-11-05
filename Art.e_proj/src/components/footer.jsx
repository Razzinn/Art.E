// Footer.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';
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
  const { t } = useTranslation();
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
      ]
    ),
    [t]
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
                {t('footer.newsletter.privacy_consent')} <a href="#" className="link-secondary">{t('footer.legal.privacy_policy')}</a>
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">
          <div className="footer-container">
            <div className="footer-bottom-content">
              <div className="footer-copyright">
                © 2024 Creo Marketplace. {t('footer.legal.all_rights_reserved')}. | P.IVA: 12345678901
              </div>
              
              <div className="footer-legal">
                <a href="#" className="link-secondary">{t('footer.legal.privacy_policy')}</a>
                <a href="#" className="link-secondary">{t('footer.legal.terms_of_service')}</a>
                <a href="#" className="link-secondary">{t('footer.legal.cookie_policy')}</a>
                <a href="#" className="link-secondary">{t('footer.legal.returns_refunds')}</a>
                <a href="#" className="link-secondary">{t('footer.legal.shipping')}</a>
                <a href="#" className="link-secondary">{t('footer.legal.faq')}</a>
              </div>
              
              <div className="footer-payment">
                <span className="payment-text">{t('footer.payment.secure_payments')}:</span>
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
        aria-label={t('footer.back_to_top')}
        title={t('footer.back_to_top')}
      >
        ↑
      </button>
    </>
  );
};

export default Footer;