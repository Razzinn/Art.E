# 🌐 Configurazione DNS Loopia per creo.rs

## 📋 Informazioni Dominio

- **Dominio**: creo.rs
- **Provider**: Loopia (Svezia)
- **Nameservers**: 
  - ns1.loopia.se (93.188.0.20)
  - ns2.loopia.se (93.188.0.21)

## 🚀 Setup Rapido (5 minuti)

### Step 1: Accedi a Loopia

1. Vai su: https://customerzone.loopia.se
2. Login con username e password
3. Seleziona il dominio **creo.rs**
4. Vai su **"DNS Settings"** o **"Zone Editor"**

### Step 2: Configura Record DNS per GitHub Pages

Aggiungi/Modifica i seguenti record DNS:

#### Record A (GitHub Pages IP)

Crea **4 record A** con questi valori:

| Host | Type | Value | TTL |
|------|------|-------|-----|
| @ o vuoto | A | 185.199.108.153 | 3600 |
| @ o vuoto | A | 185.199.109.153 | 3600 |
| @ o vuoto | A | 185.199.110.153 | 3600 |
| @ o vuoto | A | 185.199.111.153 | 3600 |

**Come aggiungere su Loopia:**
- Clicca "Add Record" o "Aggiungi Record"
- Type: **A**
- Host/Name: lascia **vuoto** oppure scrivi **@**
- Value/IP Address: inserisci l'IP (es. 185.199.108.153)
- TTL: **3600**
- Ripeti per tutti e 4 gli IP

#### Record CNAME (www → GitHub Pages)

Crea **1 record CNAME**:

| Host | Type | Value | TTL |
|------|------|-------|-----|
| www | CNAME | razzinn.github.io. | 3600 |

**Come aggiungere su Loopia:**
- Clicca "Add Record"
- Type: **CNAME**
- Host/Name: **www**
- Value/Target: **razzinn.github.io.** (con il punto finale!)
- TTL: **3600**

⚠️ **IMPORTANTE**: Aggiungi il punto `.` dopo `github.io` → `razzinn.github.io.`

### Step 3: Salva e Attendi Propagazione

1. Clicca **"Save"** o **"Salva"**
2. Attendi **10-60 minuti** per propagazione DNS
3. Può richiedere fino a **24-48 ore** per propagazione globale

## ✅ Verifica Configurazione

### Test DNS (dopo 10 minuti)

Apri PowerShell e esegui:

```powershell
# Verifica record A
nslookup creo.rs

# Verifica record CNAME
nslookup www.creo.rs

# Verifica completa
nslookup -type=A creo.rs
nslookup -type=CNAME www.creo.rs
```

**Output corretto:**
```
creo.rs
Addresses:  185.199.108.153
            185.199.109.153
            185.199.110.153
            185.199.111.153

www.creo.rs
canonical name = razzinn.github.io
```

### Test Online

Verifica propagazione DNS globale:
- https://dnschecker.org → Inserisci `www.creo.rs`
- https://whatsmydns.net → Inserisci `creo.rs`

## 🔧 Configurazione GitHub Pages

Dopo che il DNS è propagato (10-60 min):

1. Vai su: https://github.com/Razzinn/Art.E/settings/pages
2. **Custom domain**: Inserisci `www.creo.rs`
3. Clicca **"Save"**
4. Attendi verifica DNS (5-15 minuti)
5. ✅ Abilita **"Enforce HTTPS"** quando disponibile

## 📊 Timeline

| Fase | Tempo Stimato |
|------|---------------|
| Configurazione DNS su Loopia | 5 minuti |
| Propagazione DNS iniziale | 10-60 minuti |
| Verifica dominio su GitHub | 5-15 minuti |
| Attivazione HTTPS automatico | 10-30 minuti |
| Propagazione DNS globale | 24-48 ore |

**Totale**: Il sito sarà accessibile su www.creo.rs entro **1-2 ore** dall'inserimento dei DNS!

## 🎯 Cosa Aspettarsi

### Dopo 10-30 minuti:
- ✅ DNS risolve correttamente
- ✅ www.creo.rs punta a GitHub Pages
- ⏳ Certificato SSL in generazione

### Dopo 1-2 ore:
- ✅ Sito live su www.creo.rs
- ✅ HTTPS attivo e funzionante
- ✅ Redirect automatici configurati

### Dopo 24-48 ore:
- ✅ DNS propagato globalmente
- ✅ Accessibile da tutto il mondo
- ✅ Performance ottimali

## ❓ Troubleshooting

### "DNS_PROBE_FINISHED_NXDOMAIN"
- Attendi altri 30 minuti
- Verifica record DNS su Loopia (typo?)
- Svuota cache DNS: `ipconfig /flushdns` (Windows)

### "Connection not secure" / HTTP invece di HTTPS
- Normale nei primi 30 minuti
- Attendi attivazione certificato SSL
- Abilita "Enforce HTTPS" su GitHub Pages

### Record CNAME non funziona
- Verifica punto finale: `razzinn.github.io.` (non `razzinn.github.io`)
- Rimuovi eventuali record CNAME www esistenti
- Salva di nuovo

### GitHub dice "DNS check failed"
- Attendi 60 minuti per propagazione
- Verifica tutti i 4 record A siano inseriti
- Prova a rimuovere e re-aggiungere dominio custom

## 📞 Supporto Loopia

- **Email**: support@loopia.se
- **Telefono**: +46 (0)8-410 568 33
- **Chat**: Disponibile su customerzone.loopia.se
- **Docs**: https://www.loopia.se/support/

## ✨ Risultato Finale

Dopo la configurazione, il tuo sito sarà accessibile su:

- ✅ https://www.creo.rs (dominio principale)
- ✅ https://creo.rs (redirect automatico a www)
- ✅ HTTPS automatico e gratuito
- ✅ 100% hosting gratuito su GitHub Pages

---

**Hai problemi?** Controlla prima che siano passati almeno 30-60 minuti dalla configurazione DNS!
