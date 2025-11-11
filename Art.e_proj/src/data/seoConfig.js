/**
 * SEO Configuration - Contiene tutte le configurazioni SEO per le diverse pagine
 */

export const seoConfig = {
  home: {
    title: 'CREO - Stampa 3D, Abbigliamento Personalizzato e Servizi Digital',
    description: 'Trasformiamo le tue idee in realtà con stampa 3D professionale, abbigliamento personalizzato di qualità, web design moderno e servizi digitali su misura. Consegna rapida in tutta Italia.',
    keywords: 'stampa 3D Italia, abbigliamento personalizzato, t-shirt custom, web design professionale, prototipi 3D, gadget aziendali, design 3D, servizi digitali, Made in Italy',
    image: '/og-image.jpg'
  },
  
  stampa3d: {
    title: 'Stampa 3D Professionale Online - Prototipi e Modelli',
    description: 'Servizio di stampa 3D professionale in Italia. Realizziamo prototipi, modelli funzionali, oggetti personalizzati con tecnologia FDM e SLA. Preventivo gratuito online.',
    keywords: 'stampa 3D online, stampa 3D professionale, prototipi 3D, modelli 3D, stampa FDM, stampa SLA, servizi stampa 3D Italia, preventivo stampa 3D',
    image: '/images/stampa-3d-og.jpg',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Servizio Stampa 3D Professionale",
      "description": "Stampa 3D professionale per prototipi, modelli e oggetti personalizzati",
      "brand": {
        "@type": "Brand",
        "name": "CREO Marketplace"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "lowPrice": "15",
        "highPrice": "500",
        "offerCount": "50"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "45"
      }
    }
  },
  
  abbigliamento: {
    title: 'Abbigliamento Personalizzato Online - T-Shirt e Gadget Custom',
    description: 'Crea abbigliamento personalizzato di qualità: t-shirt, felpe, polo e gadget aziendali. Stampa digitale, ricamo e serigrafia. Ordini da 1 pezzo. Consegna veloce.',
    keywords: 'abbigliamento personalizzato, t-shirt personalizzate, felpe custom, gadget aziendali personalizzati, stampa magliette, ricamo personalizzato, polo personalizzate',
    image: '/images/abbigliamento-og.jpg',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Abbigliamento Personalizzato",
      "description": "T-shirt, felpe e abbigliamento personalizzato di qualità",
      "brand": {
        "@type": "Brand",
        "name": "CREO Marketplace"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "lowPrice": "12",
        "highPrice": "80",
        "offerCount": "100"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "67"
      }
    }
  },
  
  webDesign: {
    title: 'Web Design e Sviluppo Web App - Siti Web Professionali',
    description: 'Progettiamo e sviluppiamo siti web moderni, e-commerce e web app personalizzate. Design responsive, SEO ottimizzato, performance elevate. Preventivo gratuito.',
    keywords: 'web design professionale, sviluppo siti web, creazione e-commerce, web app personalizzate, siti web responsive, sviluppo web Milano, preventivo sito web',
    image: '/images/web-design-og.jpg',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Web Design e Sviluppo",
      "provider": {
        "@type": "Organization",
        "name": "CREO Marketplace"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Italia"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "EUR",
        "price": "800",
        "priceValidUntil": "2025-12-31"
      }
    }
  },
  
  ideeRegalo: {
    title: 'Idee Regalo Personalizzate - Regali Unici e Originali',
    description: 'Scopri le nostre idee regalo personalizzate: oggetti unici stampati in 3D, gadget custom e creazioni originali. Il regalo perfetto per ogni occasione.',
    keywords: 'idee regalo personalizzate, regali unici, gadget personalizzati, regali originali, stampa 3D regali, oggetti personalizzati regalo',
    image: '/images/idee-regalo-og.jpg',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Idee Regalo Personalizzate",
      "description": "Regali unici e personalizzati per ogni occasione",
      "brand": {
        "@type": "Brand",
        "name": "CREO Marketplace"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "lowPrice": "10",
        "highPrice": "150",
        "offerCount": "75"
      }
    }
  }
};

/**
 * FAQ Schema Generator
 */
export const generateFAQSchema = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

/**
 * Breadcrumb Schema Generator
 */
export const generateBreadcrumbSchema = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url ? `https://creo-marketplace.it${item.url}` : undefined
    }))
  };
};

/**
 * Article Schema Generator (per blog posts futuri)
 */
export const generateArticleSchema = (article) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image,
    "datePublished": article.publishedDate,
    "dateModified": article.modifiedDate,
    "author": {
      "@type": "Person",
      "name": article.author || "CREO Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "CREO Marketplace",
      "logo": {
        "@type": "ImageObject",
        "url": "https://creo-marketplace.it/logo.png"
      }
    }
  };
};

export default seoConfig;
