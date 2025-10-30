import { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';
import './Offers.css';

const SERVICE_ITEMS = [
  {
    titleKey: 'offers.services.3d_printing.title',
    descriptionKey: 'offers.services.3d_printing.description',
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
    titleKey: 'offers.services.gifts_pranks.title',
    descriptionKey: 'offers.services.gifts_pranks.description',
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
    titleKey: 'offers.services.apparel.title',
    descriptionKey: 'offers.services.apparel.description',
    slug: 'abbigliamento-e-custom',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    titleKey: 'offers.services.websites_apps.title',
    descriptionKey: 'offers.services.websites_apps.description',
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
  const { t } = useTranslation();
  const [currentColors, setCurrentColors] = useState(['#8B5CF6', '#A855F7', '#C084FC']);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const transitionTimeoutRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  const services = useMemo(() => SERVICE_ITEMS, []);

  const goToService = (slug) => {
    navigate(`/servizi/${slug}`);
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
        }, 4200);
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

  const dynamicBackground = {
    background: `linear-gradient(135deg, ${currentColors[0]} 0%, ${currentColors[1] || currentColors[0]} 50%, ${currentColors[2] || currentColors[0]} 100%)`,
  };

  return (
    <section className="offers" style={dynamicBackground}>
      <div className="offers-container">
        <h2 className="offers-title">
          {t('offers.title')}
        </h2>

        <div className="services-grid">
          {services.map((service, index) => {
            const isLink = Boolean(service.slug);
            const isActive = isMobile && activeIndex === index;
            const cardClassName = [
              'service-card',
              isLink ? 'service-card--link' : '',
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
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{t(service.titleKey)}</h3>
                <p className="service-description">{t(service.descriptionKey)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
