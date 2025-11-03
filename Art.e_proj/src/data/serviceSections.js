export const SERVICE_SECTIONS = [
  {
    id: '3d-design',
    slug: '3d-design-stampa-3d',
    title: '3D Design & Stampa 3D',
    subtitle: 'Dall\'idea alla realizzazione del prodotto finito',
    description:
      'Dal modello digitale all\'oggetto reale: creazioni uniche, prototipi, gadget e design personalizzati per ogni esigenza.',
    heroNote: 'Puoi allegare schizzi, riferimenti visivi o file 3D esistenti.',
  },
  {
    id: 'pranks',
    slug: 'regali-e-prank',
    title: 'Idee Regalo',
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
    id: 'web-app',
    slug: 'web-e-app-design',
    title: 'Web & App Design',
    subtitle: 'Esperienze digitali efficaci',
    description:
      'Siti Web moderni, App intuitive e soluzioni grafiche per far crescere il tuo brand online e raggiungere i tuoi obiettivi.',
    heroNote: 'Condividi esempi di design che ti piacciono o il tuo brand esistente.',
  },
];

export const getServiceBySlug = (slug) =>
  SERVICE_SECTIONS.find((service) => service.slug === slug);
