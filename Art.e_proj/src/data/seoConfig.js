/**
 * SEO Configuration - Contiene tutte le configurazioni SEO per le diverse pagine
 */

export const seoConfig = {
  home: {
    title: 'CREO - 3D Štampa, Personalizovana Odeća i Digitalne Usluge | Pirot, Srbija',
    description: 'Pretvaramo vaše ideje u stvarnost sa profesionalnom 3D štampom, personalizovanom odećom vrhunskog kvaliteta, modernim web dizajnom i prilagođenim digitalnim uslugama. Brza dostava širom Srbije.',
    keywords: '3D štampa Srbija, 3D štampa Pirot, personalizovana odeća Srbija, majice po želji, profesionalni web dizajn, 3D prototipovi, poslovna odeća, 3D dizajn online, digitalne usluge Srbija, web aplikacije Pirot, personalizovani pokloni Srbija, grafički dizajn Pirot, e-commerce Srbija',
    image: '/og-image.jpg'
  },
  
  stampa3d: {
    title: '3D Štampa Profesionalno Online - Prototipovi i Modeli | Pirot',
    description: 'Profesionalne usluge 3D štampe u Srbiji. Izrađujemo prototipove, funkcionalne modele, personalizovane objekte FDM i SLA tehnologijom. Besplatan online predračun.',
    keywords: '3D štampa online Srbija, profesionalna 3D štampa, 3D prototipovi, 3D modeli, FDM štampa, SLA štampa, usluge 3D štampe Pirot, predračun 3D štampa, 3D printer usluge Srbija, prototipiranje Srbija',
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
        "priceCurrency": "RSD",
        "lowPrice": "1500",
        "highPrice": "50000",
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
    title: 'Personalizovana Odeća Online - Majice i Prilagođeni Dodaci | Srbija',
    description: 'Kreirajte personalizovanu odeću vrhunskog kvaliteta: majice, dukseve, polo majice i poslovna odjeća. Digitalna štampa, vez i serigrafija. Porudžbine od 1 komada. Brza dostava.',
    keywords: 'personalizovana odeća Srbija, majice po želji, prilagođeni duksevi, poslovna odeća sa logom, štampa majica Pirot, vez na odeći, polo majice sa logom, firmina odeća Srbija, promocioni materijali, reklamna odeća',
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
        "priceCurrency": "RSD",
        "lowPrice": "1200",
        "highPrice": "8000",
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
    title: 'Web Dizajn i Razvoj Web Aplikacija - Profesionalni Sajtovi | Srbija',
    description: 'Projektujemo i razvijamo moderne web sajtove, e-commerce i prilagođene web aplikacije. Responzivan dizajn, SEO optimizacija, visoke performanse. Besplatan predračun.',
    keywords: 'profesionalni web dizajn Srbija, izrada web sajtova, kreiranje e-commerce Srbija, prilagođene web aplikacije, responzivni sajtovi, razvoj web aplikacija Pirot, predračun web sajt, izrada online prodavnica, SEO optimizacija Srbija, digitalni marketing',
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
        "name": "Srbija"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "RSD",
        "price": "80000",
        "priceValidUntil": "2025-12-31"
      }
    }
  },
  
  ideeRegalo: {
    title: 'Personalizovani Pokloni - Jedinstveni i Originalni Pokloni | Srbija',
    description: 'Otkrijte naše ideje za personalizovane poklone: jedinstveni objekti štampani u 3D, prilagođeni dodaci i originalne kreacije. Savršen poklon za svaku priliku.',
    keywords: 'personalizovani pokloni Srbija, jedinstveni pokloni, prilagođeni dodaci, originalni pokloni, 3D štampani pokloni, personalizovani predmeti za poklon, pokloni po želji Pirot, kreativni pokloni, poslovna pažnja',
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
        "priceCurrency": "RSD",
        "lowPrice": "1000",
        "highPrice": "15000",
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
