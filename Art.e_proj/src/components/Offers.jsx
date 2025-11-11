import { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';
import './Offers.css';

// -------- Color helpers (module scope) --------
const hexToRgb = (hex) => {
  if (!hex) return { r: 0, g: 0, b: 0 };
  let h = ('' + hex).replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const num = parseInt(h, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
};

const clamp = (v, min = 0, max = 255) => Math.max(min, Math.min(max, v));

const darkenHex = (hex, factor = 0.7) => {
  const { r, g, b } = hexToRgb(hex);
  const dr = clamp(Math.round(r * factor));
  const dg = clamp(Math.round(g * factor));
  const db = clamp(Math.round(b * factor));
  return `rgb(${dr}, ${dg}, ${db})`;
};

const toRgba = (hexOrRgb, alpha = 1) => {
  if (!hexOrRgb) return `rgba(0,0,0,${alpha})`;
  if (hexOrRgb.startsWith('rgb(')) {
    const parts = hexOrRgb
      .replace('rgb(', '')
      .replace(')', '')
      .split(',')
      .map((p) => parseInt(p.trim(), 10));
    return `rgba(${parts[0] || 0}, ${parts[1] || 0}, ${parts[2] || 0}, ${alpha})`;
  }
  const { r, g, b } = hexToRgb(hexOrRgb);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const SERVICE_ITEMS = [
  {
    titleKey: 'offers.services.design_3d.title',
    descriptionKey: 'offers.services.design_3d.description',
    slug: '3d-design-stampa-3d',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    titleKey: 'offers.services.gift_ideas.title',
    descriptionKey: 'offers.services.gift_ideas.description',
    slug: 'regali-e-prank',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20,12 20,22 4,22 4,12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    titleKey: 'offers.services.apparel_custom.title',
    descriptionKey: 'offers.services.apparel_custom.description',
    slug: 'abbigliamento-e-custom',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    titleKey: 'offers.services.web_app_design.title',
    descriptionKey: 'offers.services.web_app_design.description',
    slug: 'web-e-app-design',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <line x1="2" y1="9" x2="22" y2="9" />
        <circle cx="6.5" cy="6.5" r=".5" />
        <circle cx="9.5" cy="6.5" r=".5" />
      </svg>
    ),
  },
];

export default function Offers() {
  const { t, isLoading } = useTranslation();
  const [currentColors, setCurrentColors] = useState(['#1a9fc9', '#2a9fd9', '#3aafe9', '#4abff9', '#5acfff']); // Inizia con i colori della prima slide (3D Design)
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const transitionTimeoutRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  const services = useMemo(() => SERVICE_ITEMS, []);

  const goToService = (slug) => {
    if (!slug) return;
    
    // Solo "Stampa 3D" ha una pagina dedicata, tutti gli altri usano il ServiceRequestPage
    if (slug === 'stampa-3d') {
      navigate('/stampa-3d');
    } else {
      // Tutti gli altri servizi (inclusi regali-e-prank) usano il form
      navigate(`/servizi/${slug}`);
    }
  };

  const handleCardKeyDown = (event, slug) => {
    if (!slug) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      goToService(slug);
    }
  };

  const getCardProps = (slug) => {
    if (!slug) return {};

    return {
      role: 'button',
      tabIndex: 0,
      onClick: () => goToService(slug),
      onKeyDown: (event) => handleCardKeyDown(event, slug),
    };
  };

  useEffect(() => {
    const handleCarouselChange = (event) => {
      const newColors = event.detail.slide?.colors;

      if (newColors && !isTransitioningRef.current) {
        isTransitioningRef.current = true;

        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current);
        }

        setCurrentColors(newColors);

        transitionTimeoutRef.current = setTimeout(() => {
          isTransitioningRef.current = false;
        }, 3200); // Ridotto per essere più reattivo
      }
    };

    window.addEventListener('carousel-change', handleCarouselChange);
    return () => {
      window.removeEventListener('carousel-change', handleCarouselChange);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)');
    const updateMatch = (event) => setIsMobile(event.matches);

    updateMatch(mediaQuery);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMatch);
    } else {
      mediaQuery.addListener(updateMatch);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateMatch);
      } else {
        mediaQuery.removeListener(updateMatch);
      }
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setActiveIndex(null);
      return undefined;
    }

    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            if (!Number.isNaN(index)) {
              setActiveIndex((prev) => (prev === index ? prev : index));
            }
          }
        });
      },
      { threshold: 0.6 }
    );

    cards.forEach((card) => observer.observe(card));
    // Open the first card by default on mobile
    setActiveIndex(0);

    return () => observer.disconnect();
  }, [isMobile, services.length]);

  // (color helpers defined at module scope)

  const bgColors = useMemo(() => (
    currentColors.map((c, i) => darkenHex(c, [0.6, 0.65, 0.7, 0.68, 0.62][i] || 0.65))
  ), [currentColors]);

  const dynamicBackground = useMemo(() => ({
    background: `
      /* colored layers with transparency on top */
      radial-gradient(ellipse at center left, ${toRgba(bgColors[4], 0.55)} 0%, ${toRgba(bgColors[2], 0.35)} 40%, ${toRgba('#000000', 0)} 70%),
      radial-gradient(ellipse at top left, ${toRgba(bgColors[0], 0.45)} 0%, ${toRgba('#000000', 0)} 60%),
      radial-gradient(ellipse at top right, ${toRgba(bgColors[3], 0.42)} 0%, ${toRgba('#000000', 0)} 55%),
      radial-gradient(ellipse at bottom center, ${toRgba(bgColors[1], 0.38)} 0%, ${toRgba('#000000', 0)} 65%),
      linear-gradient(135deg,
        ${toRgba(bgColors[0], 0.55)} 0%,
        ${toRgba(bgColors[1] || bgColors[0], 0.55)} 28%,
        ${toRgba(bgColors[2] || bgColors[1] || bgColors[0], 0.5)} 52%,
        ${toRgba(bgColors[3] || bgColors[2] || bgColors[0], 0.5)} 72%,
        ${toRgba(bgColors[4] || bgColors[3] || bgColors[0], 0.55)} 100%),
      /* deep base to eliminate whites */
      linear-gradient(180deg, #0a0f1c 0%, #070a14 100%)
    `,
    transition: 'background 2.5s ease-in-out',
    // CSS variables for icon glow to keep it matching the background palette
    '--icon-glow-0': toRgba(bgColors[2] || bgColors[1] || bgColors[0], 0.8),
    '--icon-glow-1': toRgba(bgColors[2] || bgColors[1] || bgColors[0], 0.38),
    '--icon-glow-2': toRgba(bgColors[2] || bgColors[1] || bgColors[0], 0.12),
  }), [bgColors]);

  // Removed per request: do not apply inline background/border on cards

  return (
    <section className="offers" style={dynamicBackground}>
      <div className="offers-container">
        <h2 className="offers-title">
          {t('offers.title')}
        </h2>

        <div className="services-grid">
          {services.map((service, index) => {
            const isActive = isMobile && activeIndex === index;
            const cardClassName = [
              'service-card',
              isActive ? 'service-card--active' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div
                key={service.titleKey}
                className={cardClassName}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                data-index={index}
                {...getCardProps(service.slug)}
              >
                <div className="container">
                  <div className="box" data-description={t(service.descriptionKey)}>
                    <div className="icon_bg"></div>
                  </div>
                  <div className="icon">
                    {service.icon}
                  </div>
                </div>
                <div className="text">
                  <h3 className="service-title">{t(service.titleKey)}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
