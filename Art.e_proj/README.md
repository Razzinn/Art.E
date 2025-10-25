# CREO Marketplace 🚀

Un marketplace moderno per stampa 3D, abbigliamento personalizzato e servizi digitali, costruito con React e Vite.

## ✨ Caratteristiche

- 🎨 **UI/UX Moderna**: Design responsive con animazioni fluide
- ♿ **Accessibilità**: WCAG 2.1 compliant con supporto screen reader
- 🔍 **SEO Ottimizzato**: Meta tags completi e structured data
- 📱 **Mobile-First**: Design responsive per tutti i dispositivi
- ⚡ **Performance**: Lazy loading, code splitting e ottimizzazioni Vite
- 🎯 **Carosello Hero**: Navigazione touch-friendly con keyboard support

## 🛠️ Tecnologie

- **Frontend**: React 19, Vite 7
- **Styling**: CSS3 con variabili custom e animazioni
- **Accessibilità**: ARIA, semantic HTML, focus management
- **Performance**: Bundle optimization, lazy loading, preconnect

## 🚀 Quick Start

```bash
# Installa dipendenze
npm install

# Avvia development server
npm run dev

# Build per produzione
npm run build

# Preview build
npm run preview

# Linting
npm run lint
npm run lint:fix
```

### Configurazione invio email (EmailJS)

1. Crea un account su [EmailJS](https://www.emailjs.com/) e prendi nota di:
	- **Service ID** (es. `service_creo`)
	- **Template ID** per il template che userai
	- **Public Key** (es. `ABCD1234xyz`)
2. Duplica il file `.env.example` in `.env.local` e inserisci i valori EmailJS:

```powershell
copy .env.example .env.local
```

3. Compila in `.env.local` solo gli ID obbligatori (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`).
	- I campi `VITE_EMAILJS_TO_EMAIL` e `VITE_EMAILJS_TO_NAME` sono facoltativi: usali se vuoi sovrascrivere il destinatario definito nel template EmailJS.
4. Riavvia il server di sviluppo (`npm run dev`).

> ℹ️ Nel template EmailJS assicurati di mappare le variabili: `service_id`, `service_title`, `service_subtitle`, `requester_name`, `requester_email`, `requester_phone`, `requester_company`, `project_budget`, `project_details`, `file_name`, `file_attachment`, `reply_to`, `from_name`, `from_email`. I placeholder `to_email` e `to_name` sono necessari solo se imposti anche le relative variabili facoltative nel file `.env.local`.

## 📁 Struttura Progetto

```
src/
├── components/
│   ├── NavbarSectionR.jsx    # Navbar con dropdown categorie
│   ├── NavbarSectionR.css    # Stili navbar
│   ├── HeroSectionR.jsx      # Carosello hero con animazioni
│   ├── HeroSectionR.css      # Stili carosello
│   ├── footer.jsx            # Footer completo con newsletter
│   ├── footer.css            # Stili footer
│   ├── ServiceForms.jsx      # Form di richiesta progetto per servizio
│   ├── ServiceForms.css      # Stili form servizio
│   └── Offers.jsx            # Card offerte con animazioni hover
├── services/
│   └── emailClient.js        # Integrazione EmailJS per invio form
├── App.jsx                   # Componente principale
├── main.jsx                  # Entry point
└── index.css                 # Stili globali
```

## 🎨 Design System

### Colori
- **Electric Blue**: `#2563EB` (primario)
- **Light Blue**: `#60A5FA` (secondario)
- **Energetic Orange**: `#F97316` (CTA)
- **Lime Yellow**: `#FACC15` (accenti)

### Componenti
- **Navbar**: Dropdown animato con categorie
- **Hero**: Carosello con particelle fluttuanti
- **Footer**: Newsletter, social links, certificazioni

## ♿ Accessibilità

- ✅ ARIA labels e roles
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus management
- ✅ High contrast mode
- ✅ Reduced motion support

## 🔍 SEO

- ✅ Meta tags completi
- ✅ Open Graph / Twitter Cards
- ✅ Structured data (JSON-LD)
- ✅ Canonical URLs
- ✅ Sitemap ready

## 📱 Responsive Design

- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px-1024px (adapted layout)
- **Mobile**: <768px (mobile-first)

## ⚡ Performance

- **Bundle Splitting**: Vendor e components separati
- **Lazy Loading**: Immagini e componenti
- **Preconnect**: Fonts e risorse esterne
- **Optimized Assets**: Immagini e CSS minificati

## 🧪 Testing

```bash
# Linting
npm run lint

# Type checking (se TypeScript)
npm run type-check

# Build analysis
npm run analyze
```

## 📄 Licenza

Questo progetto è proprietario di CREO Marketplace.

## 🤝 Contributi

Per contribuire al progetto, seguire le best practices:
1. Codice accessibile e semanticamente corretto
2. Performance ottimizzate
3. Design responsive
4. SEO-friendly

---

**CREO Marketplace** - Trasformiamo le tue idee in realtà 🎯