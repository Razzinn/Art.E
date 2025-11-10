export const SERVICE_SECTIONS = [
  {
    id: '3d-design',
    slug: '3d-design-stampa-3d',
    titleKey: 'offers.services.design_3d.title',
    subtitleKey: 'offers.services.design_3d.subtitle',
    descriptionKey: 'offers.services.design_3d.description',
    heroNoteKey: 'offers.services.design_3d.hero_note',
  },
  {
    id: 'pranks',
    slug: 'regali-e-prank',
    titleKey: 'offers.services.gift_ideas.title',
    subtitleKey: 'offers.services.gift_ideas.subtitle', 
    descriptionKey: 'offers.services.gift_ideas.description',
    heroNoteKey: 'offers.services.gift_ideas.hero_note',
  },
  {
    id: 'apparel',
    slug: 'abbigliamento-e-custom',
    titleKey: 'offers.services.apparel_custom.title',
    subtitleKey: 'offers.services.apparel_custom.subtitle',
    descriptionKey: 'offers.services.apparel_custom.description',
    heroNoteKey: 'offers.services.apparel_custom.hero_note',
  },
  {
    id: 'web-app',
    slug: 'web-e-app-design', 
    titleKey: 'offers.services.web_app_design.title',
    subtitleKey: 'offers.services.web_app_design.subtitle',
    descriptionKey: 'offers.services.web_app_design.description',
    heroNoteKey: 'offers.services.web_app_design.hero_note',
  },
];

export const getServiceBySlug = (slug) =>
  SERVICE_SECTIONS.find((service) => service.slug === slug);
