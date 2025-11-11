import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Component - Gestisce dinamicamente meta tags, title e structured data
 * per ogni pagina dell'applicazione
 */
const SEO = ({ 
  title, 
  description, 
  keywords,
  image = '/og-image.jpg',
  type = 'website',
  canonicalUrl,
  structuredData,
  noindex = false
}) => {
  const location = useLocation();
  const baseUrl = 'https://creo-marketplace.it';
  const fullUrl = canonicalUrl || `${baseUrl}${location.pathname}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  useEffect(() => {
    // Aggiorna il title
    if (title) {
      document.title = `${title} | CREO Marketplace`;
    }

    // Aggiorna meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }

    // Aggiorna meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && keywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    // Aggiorna canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Aggiorna robots meta tag
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Open Graph tags
    updateMetaTag('property', 'og:title', title || 'CREO Marketplace');
    updateMetaTag('property', 'og:description', description || '');
    updateMetaTag('property', 'og:image', fullImageUrl);
    updateMetaTag('property', 'og:url', fullUrl);
    updateMetaTag('property', 'og:type', type);

    // Twitter Card tags
    updateMetaTag('name', 'twitter:title', title || 'CREO Marketplace');
    updateMetaTag('name', 'twitter:description', description || '');
    updateMetaTag('name', 'twitter:image', fullImageUrl);
    updateMetaTag('name', 'twitter:url', fullUrl);

    // Structured Data
    if (structuredData) {
      let script = document.querySelector('#dynamic-structured-data');
      if (!script) {
        script = document.createElement('script');
        script.id = 'dynamic-structured-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function
    return () => {
      // Rimuovi structured data dinamici quando il componente viene smontato
      const script = document.querySelector('#dynamic-structured-data');
      if (script) {
        script.remove();
      }
    };
  }, [title, description, keywords, fullUrl, fullImageUrl, type, structuredData, noindex]);

  return null; // Questo componente non renderizza nulla visivamente
};

// Funzione helper per aggiornare o creare meta tags
const updateMetaTag = (attribute, key, content) => {
  if (!content) return;
  
  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

export default SEO;
