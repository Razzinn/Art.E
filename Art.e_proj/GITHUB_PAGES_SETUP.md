# 🚀 Deploy su GitHub Pages con Dominio Personalizzato creo.rs

## ✅ Configurazione Completata

Il progetto è ora configurato per GitHub Pages con:
- ✅ GitHub Actions workflow per deploy automatico
- ✅ File CNAME con www.creo.rs
- ✅ Vite config ottimizzato
- ✅ Build ottimizzato per produzione

## 📋 Setup GitHub Pages (2 minuti)

### 1. Abilita GitHub Pages

1. Vai su: https://github.com/Razzinn/Art.E/settings/pages
2. **Source**: Seleziona **GitHub Actions**
3. Salva

### 2. Push delle Modifiche

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

Il deploy partirà automaticamente! ⚡

### 3. Verifica Deploy

1. Vai su: https://github.com/Razzinn/Art.E/actions
2. Controlla il workflow "Deploy to GitHub Pages"
3. Attendi completamento (~2-3 minuti)
4. Il sito sarà live su: https://razzinn.github.io/Art.E

## 🌐 Configurazione Dominio Personalizzato (creo.rs)

### Opzione A: www.creo.rs (Consigliato)

**Nel tuo provider DNS**, configura questi record:

```
Type     Name    Value                              TTL
------   -----   --------------------------------   -----
CNAME    www     razzinn.github.io                 3600
A        @       185.199.108.153                   3600
A        @       185.199.109.153                   3600
A        @       185.199.110.153                   3600
A        @       185.199.111.153                   3600
```

### Opzione B: Solo creo.rs (senza www)

Se vuoi usare solo `creo.rs` (senza www):

1. Modifica `public/CNAME` con:
   ```
   creo.rs
   ```

2. Nel provider DNS:
   ```
   Type     Name    Value                              TTL
   ------   -----   --------------------------------   -----
   A        @       185.199.108.153                   3600
   A        @       185.199.109.153                   3600
   A        @       185.199.110.153                   3600
   A        @       185.199.111.153                   3600
   ```

### Su GitHub

Dopo configurazione DNS (attendi 24-48h per propagazione):

1. Vai su: https://github.com/Razzinn/Art.E/settings/pages
2. **Custom domain**: Inserisci `www.creo.rs` (o `creo.rs`)
3. Attendi verifica DNS (può richiedere alcune ore)
4. ✅ Abilita **Enforce HTTPS** (dopo verifica)

## 🔄 Deploy Automatico

Ogni push su `main` trigghera automaticamente:
1. Build del progetto
2. Deploy su GitHub Pages
3. Disponibile su www.creo.rs in ~3 minuti

## 🛠️ Comandi Utili

```bash
# Sviluppo locale
npm run dev

# Build locale per test
npm run build

# Preview build locale
npm run preview

# Deploy manuale (non necessario con GitHub Actions)
npm run deploy
```

## 📊 Monitoraggio

### Verifica Status Deploy
- Actions: https://github.com/Razzinn/Art.E/actions
- Pages Settings: https://github.com/Razzinn/Art.E/settings/pages

### Test Sito
- GitHub Pages URL: https://razzinn.github.io/Art.E
- Dominio personalizzato: https://www.creo.rs (dopo configurazione DNS)

### Verifica DNS
```bash
# Windows PowerShell
nslookup www.creo.rs

# Online tool
# https://dnschecker.org
```

## 🎯 Checklist Post-Deploy

- [ ] Push modifiche su GitHub
- [ ] Verifica workflow completato
- [ ] Sito accessibile su github.io URL
- [ ] DNS configurato per creo.rs
- [ ] Attesa propagazione DNS (24-48h)
- [ ] Dominio personalizzato verificato su GitHub
- [ ] HTTPS abilitato
- [ ] Test funzionalità sito
- [ ] Google Search Console aggiornato

## ⚠️ Note Importanti

### Limitazioni GitHub Pages (Piano Gratuito)
- ✅ Bandwidth: 100 GB/mese
- ✅ Storage: 1 GB
- ✅ Build: 10 al minuto
- ✅ **Completamente GRATUITO** per repository pubblici

### Backend (Server Email)

GitHub Pages serve **solo file statici**. Per il backend Node.js:

**Opzione 1: Railway.app** (Gratuito)
- $5 credito mensile
- Deploy da GitHub
- Setup: https://railway.app

**Opzione 2: Render.com** (Gratuito)
- 750 ore/mese
- Deploy da GitHub
- Setup: https://render.com

**Dopo deploy backend**, aggiorna in `.github/workflows/deploy.yml`:
```yaml
env:
  VITE_API_URL: https://your-backend-url.railway.app
```

## 🐛 Troubleshooting

### Build fallisce
- Controlla logs su: https://github.com/Razzinn/Art.E/actions
- Verifica `package.json` e dipendenze
- Test build locale: `npm run build`

### Dominio non funziona
- Attendi 24-48h propagazione DNS
- Verifica record DNS corretti
- Usa https://dnschecker.org per verifica globale

### 404 su route
- GitHub Pages configurato correttamente per SPA
- Il file `.github/workflows/deploy.yml` gestisce il routing

### HTTPS non disponibile
- Attendi verifica DNS completa
- HTTPS si attiva automaticamente dopo verifica dominio

## 📞 Supporto

- GitHub Pages Docs: https://docs.github.com/pages
- GitHub Actions Docs: https://docs.github.com/actions
- Community: https://github.community

## 🎉 Fatto!

Una volta completati questi passaggi, il tuo sito sarà live su **www.creo.rs** completamente GRATIS! 🚀

---

**URL Finali:**
- 🌐 Dominio: https://www.creo.rs
- 📦 Repository: https://github.com/Razzinn/Art.E
- 🚀 Actions: https://github.com/Razzinn/Art.E/actions
