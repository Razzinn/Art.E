export const SERVICE_SECTIONS = [
  {
    id: 'logo',
    slug: 'restyling-logo',
    title: 'Restyling Logo',
    subtitle: 'Rinnova la tua identità visiva',
    description:
      'Raccontaci la storia del tuo brand, gli elementi da mantenere e le nuove direzioni estetiche che vorresti esplorare.',
    heroNote: 'Carica il logo attuale, eventuali bozzetti o moodboard di riferimento.',
  },
  {
    id: 'pranks',
    slug: 'regali-e-prank',
    title: 'Regali e Prank',
    subtitle: 'Sorprese personalizzate per ogni occasione',
    description:
      'Descrivi il tipo di regalo o scherzo, il destinatario e il tono desiderato. Possiamo partire da un tuo concept o crearne uno da zero.',
    heroNote: 'Puoi allegare foto del destinatario o esempi dallo stile che preferisci.',
  },
  {
    id: 'apparel',
    slug: 'abbigliamento-e-custom',
    title: 'Abbigliamento e Custom',
    subtitle: 'Capi e accessori su misura',
    description:
      'Indica tipologia, quantità, colori, taglie e qualsiasi riferimento grafico per sviluppare il tuo progetto personalizzato.',
    heroNote: 'Accettiamo mockup, loghi e tabelle taglie in PDF, PNG, SVG o AI.',
  },
  {
    id: 'digital',
    slug: 'servizi-digitali',
    title: 'Servizi Digitali',
    subtitle: 'Web, app e marketing digitale',
    description:
      'Spiegaci gli obiettivi digitali, il pubblico di riferimento e le funzionalità chiave che desideri implementare.',
    heroNote: 'Carica documenti di brief, sitemap, wireframe o esempi di riferimento.',
  },
];

export const getServiceBySlug = (slug) =>
  SERVICE_SECTIONS.find((service) => service.slug === slug);
