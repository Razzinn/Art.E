# 🚀 CREO - Guida Rapida Deployment su www.creo.rs

## ✅ Modifiche Completate

### File Aggiornati
- ✅ `.env.production` - URLs produzione
- ✅ `index.html` - Meta tags, Open Graph, Structured Data
- ✅ `public/sitemap.xml` - SEO sitemap
- ✅ `public/robots.txt` - Crawler rules
- ✅ `public/site.webmanifest` - PWA manifest
- ✅ `src/data/seoConfig.js` - SEO configuration
- ✅ `package.json` - Project metadata

### File Creati
- ✅ `DOMAIN_SETUP.md` - Guida completa deployment
- ✅ `.env.example` - Template variabili ambiente

### Git
- ✅ Commit: "Integrazione dominio www.creo.rs"
- ✅ Tag: v1.0.0
- ✅ Push su origin/main

## 🎯 Prossimi Passi - DEPLOYMENT

### 1. Configurazione DNS (PRIORITÀ ALTA)

Accedi al pannello del tuo provider DNS e configura:

**Per Vercel (Consigliato):**
```
Type    Name    Value                    TTL
-----   ------  ----------------------   -----
A       @       76.76.21.21             3600
CNAME   www     cname.vercel-dns.com    3600
```

**Per Netlify:**
```
Type    Name    Value                       TTL
-----   ------  -------------------------   -----
A       @       75.2.60.5                  3600
CNAME   www     [your-site].netlify.app    3600
```

### 2. Deploy su Vercel (Metodo Consigliato)

#### Opzione A - Da Dashboard Vercel

1. Vai su https://vercel.com/dashboard
2. Import Project → GitHub
3. Seleziona repository "Razzinn/Art.E"
4. Framework Preset: **Vite**
5. Root Directory: **Art.e_proj**
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Environment Variables:
   ```
   VITE_APP_NAME=CREO
   VITE_APP_URL=https://www.creo.rs
   VITE_API_URL=https://api.creo.rs
   VITE_ENABLE_ANALYTICS=true
   VITE_DROP_CONSOLE=true
   VITE_MINIFY=true
   ```
9. Deploy!

#### Opzione B - Da CLI

```bash
# Installa Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd "C:\Users\igraz\OneDrive\Desktop\Art.E\Art.e_proj"
vercel --prod
```

### 3. Configurare Dominio Personalizzato su Vercel

**Nel Dashboard Vercel:**

1. Settings → Domains
2. Add Domain: `creo.rs`
3. Add Domain: `www.creo.rs`
4. Verifica DNS (può richiedere 24-48h)
5. SSL automatico (attivato dopo verifica DNS)

**IMPORTANTE**: Configura redirect da `creo.rs` → `www.creo.rs` per SEO consistency

### 4. Deploy su Netlify (Alternativa)

1. Vai su https://app.netlify.com
2. New site from Git → GitHub
3. Repository: "Razzinn/Art.E"
4. Branch: main
5. Base directory: `Art.e_proj`
6. Build command: `npm run build`
7. Publish directory: `Art.e_proj/dist`
8. Environment Variables: (stesse di Vercel)
9. Deploy!

**Aggiungi Dominio:**
- Domain settings → Add custom domain
- Inserisci: `www.creo.rs`
- Verifica proprietà

## 📊 Post-Deployment - SEO Setup

### 1. Google Search Console

1. Vai su https://search.google.com/search-console
2. Aggiungi proprietà: `https://www.creo.rs`
3. Verifica proprietà:
   - Metodo DNS (Aggiungi TXT record)
   - O metodo HTML tag (già presente in `index.html`)
4. Invia sitemap: `https://www.creo.rs/sitemap.xml`

### 2. Google Analytics (Opzionale)

Se vuoi attivare analytics:
1. Crea proprietà su https://analytics.google.com
2. Ottieni Measurement ID (G-XXXXXXXXXX)
3. Aggiungi variabile ambiente su Vercel/Netlify:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### 3. Verifica Funzionamento

Testa i seguenti URL:

- ✅ Homepage: https://www.creo.rs
- ✅ Sitemap: https://www.creo.rs/sitemap.xml
- ✅ Robots: https://www.creo.rs/robots.txt
- ✅ 3D Stampa: https://www.creo.rs/stampa-3d
- ✅ Abbigliamento: https://www.creo.rs/abbigliamento
- ✅ Web Design: https://www.creo.rs/webapp-design
- ✅ Idee Regalo: https://www.creo.rs/idee-regalo

### 4. Test Performance

- **PageSpeed Insights**: https://pagespeed.web.dev/?url=https://www.creo.rs
- **GTmetrix**: https://gtmetrix.com
- **WebPageTest**: https://www.webpagetest.org

Target Performance:
- ✅ First Contentful Paint (FCP): < 1.8s
- ✅ Largest Contentful Paint (LCP): < 2.5s
- ✅ Cumulative Layout Shift (CLS): < 0.1
- ✅ Time to Interactive (TTI): < 3.8s

## 🔧 Backend Setup (Node.js Server)

Il backend (invio email) richiede deployment separato.

### Opzione A - Railway.app (Consigliato per Node.js)

1. Vai su https://railway.app
2. New Project → Deploy from GitHub
3. Seleziona repository "Razzinn/Art.E"
4. Root Directory: `Art.e_proj/backend`
5. Start Command: `node server.js`
6. Environment Variables:
   ```
   NODE_ENV=production
   PORT=3000
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=[tuo-email]
   EMAIL_PASSWORD=[tua-password-app]
   FRONTEND_URL=https://www.creo.rs
   ```
7. Deploy e ottieni URL: `https://[your-app].railway.app`

### Opzione B - Render.com

1. Vai su https://render.com
2. New → Web Service
3. Connect GitHub: "Razzinn/Art.E"
4. Root Directory: `Art.e_proj/backend`
5. Build Command: `npm install`
6. Start Command: `node server.js`
7. Environment Variables: (stesse di Railway)

### Aggiorna API URL

Dopo deploy backend, aggiorna su Vercel/Netlify:
```
VITE_API_URL=https://[your-backend-url]
```

E redeploy frontend.

## 📱 Social Media Updates

Dopo deployment, aggiorna:

- [ ] Facebook Page: https://www.facebook.com/creo.rs
- [ ] Instagram: https://www.instagram.com/creo.rs
- [ ] LinkedIn: https://www.linkedin.com/company/creo-rs
- [ ] Twitter: https://twitter.com/creo_rs

Aggiorna bio con: **🌐 www.creo.rs**

## 📧 Email Configuration (Opzionale)

Per email professionale (info@creo.rs):

### Gmail Workspace (Consigliato)
- Prezzo: ~$6/mese per utente
- Setup: https://workspace.google.com

### Alternative: Zoho Mail
- Piano Free: 1 utente
- Setup: https://www.zoho.com/mail

### Configurazione MX Records
```
Type    Name    Value                           Priority    TTL
-----   ------  -----------------------------   --------    -----
MX      @       [provider-mail-server]         10          3600
```

## 🎨 Brand Assets da Creare

- [ ] Logo (formato .png e .svg)
- [ ] Favicon (favicon.ico)
- [ ] OG Image (og-image.jpg - 1200x630px)
- [ ] Icons PWA (72x72 fino a 512x512)
- [ ] Business Card con www.creo.rs
- [ ] Email Signature

## 📋 Checklist Finale

### Pre-Launch
- [x] Codice aggiornato con dominio creo.rs
- [x] SEO ottimizzato (sitemap, robots, meta tags)
- [x] Git push completato
- [ ] DNS configurato
- [ ] Deploy frontend completato
- [ ] Deploy backend completato
- [ ] SSL/HTTPS attivo

### Post-Launch
- [ ] Verifica tutti i link funzionanti
- [ ] Test form contatto (invio email)
- [ ] Google Search Console configurato
- [ ] Sitemap inviata a Google
- [ ] Test performance (PageSpeed > 90)
- [ ] Test mobile responsiveness
- [ ] Social media aggiornati
- [ ] Email professionale configurata

### Marketing
- [ ] Google My Business (se applicabile)
- [ ] Profili social completi
- [ ] Business directory locali (Serbia)
- [ ] Kampanja.rs listing
- [ ] Kupindo.rs listing (marketplace serbo)

## 🆘 Troubleshooting

### DNS non si propaga
- Attendi 24-48 ore
- Verifica con: https://dnschecker.org
- Controlla record con: `nslookup www.creo.rs`

### SSL non attivo
- Verifica DNS sia propagato
- Forza rinnovo certificato su Vercel/Netlify
- Attendi 10-15 minuti dopo configurazione DNS

### Build fallisce
- Verifica variabili ambiente
- Check logs su Vercel/Netlify dashboard
- Test build locale: `npm run build`

### Form email non funziona
- Verifica backend sia deployato
- Check variabili ambiente backend
- Test endpoint API direttamente

## 📞 Supporto

**Vercel**: https://vercel.com/support
**Netlify**: https://www.netlify.com/support
**Railway**: https://railway.app/help

## 🎉 Congratulazioni!

Una volta completati tutti i passi, il tuo sito sarà live su **www.creo.rs**! 🚀

---

**Versione**: 1.0.0
**Data**: 12 Novembre 2025
**Repository**: https://github.com/Razzinn/Art.E
