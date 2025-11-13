# Configurazione Dominio www.creo.rs

## Informazioni Dominio
- **Dominio**: www.creo.rs
- **TLD**: .rs (Serbia)
- **Provider**: Loopia (Svezia)
- **Nameservers**: 
  - ns1.loopia.se (93.188.0.20)
  - ns2.loopia.se (93.188.0.21)
- **Pannello Controllo**: https://customerzone.loopia.se

## Configurazione DNS su Loopia

### Accesso al Pannello

1. Vai su: https://customerzone.loopia.se
2. Login con le tue credenziali
3. Seleziona il dominio: **creo.rs**
4. Vai su: **DNS Settings** o **Zone Editor**

### Record DNS per GitHub Pages

**Nel pannello DNS di Loopia**, aggiungi questi record:

```dns
Type     Host/Name    Value/Target              TTL
------   ----------   -----------------------   -----
A        @            185.199.108.153          3600
A        @            185.199.109.153          3600
A        @            185.199.110.153          3600
A        @            185.199.111.153          3600
CNAME    www          razzinn.github.io.       3600
```

**Istruzioni Loopia:**
- Per i record **A**, lascia il campo "Host" vuoto oppure usa `@`
- Per il record **CNAME**, inserisci `www` nel campo "Host"
- Nel campo "Target/Value" del CNAME, scrivi `razzinn.github.io.` (con il punto finale)
- TTL: 3600 secondi (1 ora) è consigliato

### Record DNS Alternativi

#### Per Vercel Deployment (se cambi provider):

```
Type    Name    Value                       TTL
-----   ------  -------------------------   -----
A       @       75.2.60.5                  3600
CNAME   www     [your-site].netlify.app    3600
```

### Record Aggiuntivi (Opzionali ma Consigliati)

#### Email Configuration:
```
Type    Name    Value                           Priority    TTL
-----   ------  -----------------------------   --------    -----
MX      @       mail.creo.rs                   10          3600
TXT     @       v=spf1 include:_spf.creo.rs ~all            3600
```

#### Subdomain per API:
```
Type    Name    Value                    TTL
-----   ------  ----------------------   -----
CNAME   api     [backend-url]           3600
```

## Setup su Vercel

### 1. Aggiungi Dominio Personalizzato

```bash
# Installare Vercel CLI se non già installato
npm i -g vercel

# Login
vercel login

# Collegare il progetto
vercel link

# Aggiungere il dominio
vercel domains add www.creo.rs
vercel domains add creo.rs
```

### 2. Configurare nel Dashboard Vercel

1. Vai su: https://vercel.com/dashboard
2. Seleziona il progetto "Art.e_proj"
3. Settings → Domains
4. Add Domain: `creo.rs` e `www.creo.rs`
5. Configura il redirect da `creo.rs` → `www.creo.rs` (opzionale)

### 3. Configurare le Variabili d'Ambiente

Nel dashboard Vercel (Settings → Environment Variables):

```
VITE_APP_NAME=CREO
VITE_APP_URL=https://www.creo.rs
VITE_API_URL=https://api.creo.rs
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_TRACKING=false
VITE_DROP_CONSOLE=true
VITE_MINIFY=true
```

## Setup su Netlify

### 1. Aggiungi Dominio Personalizzato

1. Vai su: https://app.netlify.com
2. Seleziona il sito
3. Domain settings → Add custom domain
4. Inserisci `www.creo.rs`
5. Verifica la proprietà del dominio

### 2. Configurare HTTPS

Netlify abilita automaticamente HTTPS con Let's Encrypt.

### 3. Configurare Redirects

Il file `netlify.toml` già contiene la configurazione necessaria.

## Verifica Configurazione

### 1. Verifica DNS

```bash
# Verifica record A
nslookup creo.rs

# Verifica record CNAME
nslookup www.creo.rs

# Verifica propagazione DNS
# Usa: https://dnschecker.org
```

### 2. Verifica SSL/HTTPS

```bash
# Test SSL
curl -I https://www.creo.rs

# Verifica certificato
openssl s_client -connect www.creo.rs:443 -servername www.creo.rs
```

### 3. Verifica Sitemap e Robots

- Sitemap: https://www.creo.rs/sitemap.xml
- Robots: https://www.creo.rs/robots.txt

## Google Search Console

### Setup per www.creo.rs

1. Vai su: https://search.google.com/search-console
2. Aggiungi proprietà: `https://www.creo.rs`
3. Verifica proprietà (metodo DNS o meta tag)
4. Invia sitemap: `https://www.creo.rs/sitemap.xml`

### Metodo Verifica DNS (Consigliato)

Aggiungi record TXT:
```
Type    Name    Value                               TTL
-----   ------  ---------------------------------   -----
TXT     @       google-site-verification=XXXXX     3600
```

## Monitoraggio Performance

### Tools Essenziali

1. **Google PageSpeed Insights**
   - URL: https://pagespeed.web.dev
   - Test: https://www.creo.rs

2. **GTmetrix**
   - URL: https://gtmetrix.com
   - Test performance e ottimizzazioni

3. **WebPageTest**
   - URL: https://www.webpagetest.org
   - Test da diverse location

## Backup Configurazione

### File Modificati per Dominio

- ✅ `.env.production` - URL produzione
- ✅ `vercel.json` - Config deployment
- ✅ `index.html` - Meta tags e structured data
- ✅ `public/sitemap.xml` - Sitemap SEO
- ✅ `public/robots.txt` - Crawler instructions
- ✅ `src/data/seoConfig.js` - SEO configuration

### Comandi Git per Deploy

```bash
# Commit modifiche dominio
git add .
git commit -m "Integrazione dominio www.creo.rs - configurazione completa"
git push origin main

# Tag release
git tag -a v1.0.0-creo.rs -m "Release produzione con dominio creo.rs"
git push origin v1.0.0-creo.rs
```

## Timeline Propagazione

- **DNS Propagazione**: 24-48 ore (tipicamente 2-4 ore)
- **SSL Certificate**: Automatico dopo DNS (5-10 minuti)
- **Google Indexing**: 1-7 giorni

## Contatti Provider DNS

Assicurati di avere accesso a:
- Dashboard provider dominio .rs
- Credenziali DNS management
- Documentazione provider per record DNS

## Checklist Post-Deployment

- [ ] DNS configurato correttamente
- [ ] SSL/HTTPS attivo
- [ ] Redirect HTTP → HTTPS funzionante
- [ ] Sitemap.xml accessibile
- [ ] Robots.txt accessibile
- [ ] Google Search Console configurato
- [ ] Sitemap inviata a Google
- [ ] Test performance completati
- [ ] Verifica email setup (se necessario)
- [ ] Backup configurazione completato

## Note Importanti

⚠️ **IMPORTANTE**: Dopo aver configurato il dominio su Vercel/Netlify, aggiorna:
- Social media links (Facebook, Instagram, LinkedIn, Twitter)
- Email signature con nuovo dominio
- Materiale marketing e business cards
- Google My Business (se applicabile)
- Link in directory online

## Support

Per problemi o domande:
- Vercel Support: https://vercel.com/support
- Netlify Support: https://www.netlify.com/support
- DNS Provider Support: [contatti provider]
