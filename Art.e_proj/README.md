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

### Configurazione invio email (Nodemailer)

1. **Configurazione Backend:**
   - Il backend Node.js è nella cartella `backend/`
   - Configura il file `backend/.env` con le credenziali SMTP:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tua-email@gmail.com
EMAIL_APP_PASSWORD=password-app-gmail
EMAIL_TO=destinatario@gmail.com
EMAIL_TO_NAME=Nome Destinatario
```

2. **Avvio dei server:**
```powershell
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend  
npm run dev
```

3. **Password App Gmail:**
   - Attiva la verifica in due passaggi su Gmail
   - Genera una password app dalle impostazioni di sicurezza
   - Usa quella password nel campo `EMAIL_APP_PASSWORD`

## 📁 Struttura Progetto

```
src/
├── components/
│   ├── NavbarSectionR.jsx    # Navbar con dropdown categorie e traduzione
│   ├── NavbarSectionR.css    # Stili navbar
│   ├── HeroSectionR.jsx      # Carosello hero con animazioni
│   ├── HeroSectionR.css      # Stili carosello
│   ├── footer.jsx            # Footer completo con newsletter
│   ├── footer.css            # Stili footer
│   ├── Offers.jsx            # Card offerte con animazioni hover
│   ├── Offers.css            # Stili offerte ottimizzati
│   └── LanguageSwitcher.jsx  # Selettore lingua con bandiere
├── services/
│   └── nodemailerClient.js   # Client per invio email via backend
├── contexts/
│   └── LanguageContext.js    # Context per sistema traduzioni
├── translations/
│   ├── it.json               # Traduzioni italiane
│   ├── en.json               # Traduzioni inglesi
│   ├── sr.json               # Traduzioni serbe
│   ├── de.json               # Traduzioni tedesche
│   └── fr.json               # Traduzioni francesi
├── pages/
│   └── ServiceRequestPage.jsx # Pagina form servizi con upload file
├── data/
│   └── serviceSections.js    # Configurazione servizi
├── App.jsx                   # Componente principale
├── main.jsx                  # Entry point
└── index.css                 # Stili globali

backend/
├── server.js                 # Server Express con Nodemailer
├── package.json              # Dipendenze backend
├── .env                      # Configurazione SMTP
└── uploads/                  # Cartella file temporanei
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