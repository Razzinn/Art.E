# 🧪 GUIDA COMPLETA AL TEST DELL'INVIO EMAIL

## ⚠️ PROBLEMA RISOLTO

**Era presente un BUG critico:** la pagina `ServiceRequestPage.jsx` NON inviava email reali, simulava solo l'invio con un timeout fake.

✅ **RISOLTO:** Integrato `emailClient.js` in entrambe le pagine:
- ✅ `ServiceForms.jsx` (form multipli nella home)
- ✅ `ServiceRequestPage.jsx` (pagina dedicata per ogni servizio)

---

## 📦 VERIFICA PRELIMINARE

### 1. Dipendenze Installate
```powershell
cd Art.e_proj
npm list @emailjs/browser
```
**Output atteso:** `└── @emailjs/browser@4.4.1`

### 2. File `.env.local` Configurato
Percorso: `Art.e_proj/.env.local`

```bash
VITE_EMAILJS_SERVICE_ID=service_wzoiwxc
VITE_EMAILJS_TEMPLATE_ID=template_jq9eala
VITE_EMAILJS_PUBLIC_KEY=xMZ5W38VyDnz9eG-5
VITE_EMAILJS_TO_EMAIL=ig.razvan12@gmail.com
VITE_EMAILJS_TO_NAME=Test CREO
```

✅ **Tutti i valori sono presenti e corretti**

### 3. Template EmailJS Configurato

**URL Dashboard:** https://dashboard.emailjs.com/admin/templates/template_jq9eala

**Impostazioni richieste:**
- **To Email:** `{{to_email}}` (per permettere override da .env.local)
- **Subject:** `🎯 Nuova Richiesta: {{service_title}} - {{requester_name}}`
- **HTML Template:** Copiato da `EMAILJS_TEMPLATE.md`

---

## 🚀 PROCEDURA DI TEST

### PASSO 1: Riavvia il Server

**IMPORTANTE:** Le variabili `.env.local` vengono caricate solo all'avvio del server!

```powershell
cd Art.e_proj
npm run dev
```

**Output atteso:**
```
VITE v7.1.6  ready in XXX ms
➜  Local:   http://localhost:XXXX/
```

Annota la porta (es. 3003).

---

### PASSO 2: Apri il Browser

1. Apri **Google Chrome** o **Microsoft Edge**
2. Vai su: `http://localhost:XXXX` (usa la porta del passo precedente)
3. Premi **F12** per aprire DevTools
4. Vai alla tab **Console**

---

### PASSO 3: Verifica Log di Inizializzazione

Appena la pagina si carica, dovresti vedere in console:

```
🔷 [ServiceForm] Componente montato per servizio: logo
🔷 [ServiceForm] Componente montato per servizio: pranks
🔷 [ServiceForm] Componente montato per servizio: apparel
🔷 [ServiceForm] Componente montato per servizio: digital
```

**❌ Se NON vedi questi log:**
- C'è un errore JavaScript → Leggi l'errore in rosso nella console
- Copia l'errore completo e condividilo

**✅ Se vedi i log:** Procedi al Passo 4

---

### PASSO 4: Test Form nella Home

1. **Scorri** fino alla sezione "Richiedi un progetto personalizzato"
2. **Compila il primo form** (Restyling Logo):
   - **Nome e cognome:** Test Razvan
   - **Email:** test@example.com
   - **Dettagli del progetto:** Test invio email da home
3. **Clicca "Invia richiesta"**

---

### PASSO 5: Leggi i Log nella Console

Dovresti vedere questa sequenza:

```
🔵 [ServiceForm] handleSubmit chiamato per servizio: logo
🔵 [ServiceForm] Dati form: {name: 'Test Razvan', email: 'test@example.com', ...}
🔵 [ServiceForm] Chiamata sendServiceFormEmail in corso...
📧 EmailJS Configuration: {
  serviceId: '✓ Present',
  templateId: '✓ Present',
  publicKey: '✓ Present',
  toEmail: 'ig.razvan12@gmail.com',
  toName: 'Test CREO'
}
📤 Sending email with params: {
  service_id: 'logo',
  requester: 'Test Razvan',
  email: 'test@example.com'
}
✅ EmailJS Response: {status: 200, text: 'OK'}
🟢 [ServiceForm] Email inviata con successo!
```

---

### PASSO 6: Test Form nella Pagina Dedicata

1. **Clicca** su un servizio dalla navbar o dalla home (es. "Restyling Logo")
2. Dovresti essere su URL tipo: `/servizi/restyling-logo`
3. **Compila il form**:
   - **Nome e cognome:** Test Razvan 2
   - **Email:** test2@example.com
   - **Dettagli del progetto:** Test invio email da pagina dedicata
4. **Clicca "Invia richiesta"**

---

### PASSO 7: Leggi i Log (Pagina Dedicata)

Dovresti vedere:

```
🔵 [ServiceRequestPage] handleSubmit chiamato per servizio: restyling-logo
🔵 [ServiceRequestPage] Dati form: {name: 'Test Razvan 2', ...}
🔵 [ServiceRequestPage] Chiamata sendServiceFormEmail in corso...
📧 EmailJS Configuration: ...
📤 Sending email with params: ...
✅ EmailJS Response: {status: 200, text: 'OK'}
🟢 [ServiceRequestPage] Email inviata con successo!
```

---

## 📊 INTERPRETAZIONE DEI RISULTATI

### ✅ CASO 1: "✅ EmailJS Response: {status: 200}"

**Significato:** Email inviata con successo all'API EmailJS

**Cosa fare:**
1. Controlla inbox di `ig.razvan12@gmail.com`
2. **Controlla SPAM/Promozioni/Social**
3. Aspetta 2-3 minuti (a volte c'è ritardo)

**Se l'email non arriva dopo 5 minuti:**
- Gmail potrebbe bloccare email da EmailJS
- Prova con un altro indirizzo Gmail personale
- Verifica su EmailJS dashboard: https://dashboard.emailjs.com/admin/stats

---

### ❌ CASO 2: "✗ Missing" in Configuration

**Esempio:**
```
📧 EmailJS Configuration: {
  serviceId: '✗ Missing',  ← ERRORE
  ...
}
```

**Causa:** Le variabili `.env.local` NON sono state caricate

**Soluzione:**
1. Verifica che `.env.local` esista in `Art.e_proj/`
2. Verifica che le variabili inizino con `VITE_`
3. **RIAVVIA il server** (`Ctrl+C` poi `npm run dev`)
4. Ricarica il browser (`Ctrl+R`)

---

### ❌ CASO 3: "The public key is required"

**Causa:** Public key non valida o formato errato

**Soluzione:**
1. Vai su: https://dashboard.emailjs.com/admin/account
2. Copia la **Public Key** (sotto "Account")
3. Incolla esattamente in `.env.local`:
   ```
   VITE_EMAILJS_PUBLIC_KEY=xMZ5W38VyDnz9eG-5
   ```
4. Riavvia server

---

### ❌ CASO 4: "403 Forbidden"

**Causa:** Il dominio `localhost` non è autorizzato

**Soluzione:**
1. Vai su: https://dashboard.emailjs.com/admin/account
2. Sezione **"Allowed Origins"**
3. Aggiungi: `http://localhost:*` o `http://localhost:3003`
4. Salva e riprova

---

### ❌ CASO 5: "400 Bad Request" o "Template not found"

**Causa:** Template ID errato o template non configurato

**Soluzione:**
1. Vai su: https://dashboard.emailjs.com/admin
2. Verifica che esista il template `template_jq9eala`
3. Apri il template e verifica che contenga tutti i placeholder:
   - `{{service_title}}`
   - `{{requester_name}}`
   - `{{requester_email}}`
   - etc. (vedi `EMAILJS_TEMPLATE.md`)

---

### ❌ CASO 6: "Network Error" o "Failed to fetch"

**Causa:** Problemi di connessione o firewall

**Soluzione:**
1. Verifica connessione internet
2. Disabilita temporaneamente antivirus/firewall
3. Prova con browser in modalità incognito
4. Controlla la console per errori CORS

---

## 🎯 CHECKLIST FINALE

Prima di dichiarare il sistema funzionante, verifica:

- [ ] Log iniziali (🔷 Componente montato) appaiono in console
- [ ] Form nella home invia email (✅ status: 200)
- [ ] Form nella pagina dedicata invia email (✅ status: 200)
- [ ] Email arriva effettivamente in inbox di `ig.razvan12@gmail.com`
- [ ] Tutti i dati del form sono presenti nell'email
- [ ] Template HTML si visualizza correttamente
- [ ] Feedback "Richiesta ricevuta!" appare dopo invio

---

## 🆘 TROUBLESHOOTING RAPIDO

### Problema: "Non vedo nessun log in console"

**Causa:** JavaScript non caricato o errore critico

**Soluzione:**
1. Controlla tab "Console" per errori in rosso
2. Verifica tab "Network" → cerca errori 404/500
3. Prova `Ctrl+F5` (hard refresh)
4. Controlla che il file `emailClient.js` esista

---

### Problema: "Email inviata ma non arriva"

**Causa:** Gmail blocca email da EmailJS

**Soluzione:**
1. Controlla cartella **Spam**
2. Controlla cartella **Promozioni**
3. Vai su EmailJS Stats: https://dashboard.emailjs.com/admin/stats
4. Verifica che le email siano state realmente inviate
5. Prova con un altro indirizzo Gmail

---

### Problema: "Form si blocca su 'Invio in corso…'"

**Causa:** Errore durante invio ma catch non funziona

**Soluzione:**
1. Apri console e cerca errori 🔴
2. L'errore è probabilmente un problema di rete o API
3. Copia l'errore completo dalla console

---

## 📞 SUPPORTO

Se dopo aver seguito tutti i passaggi l'email **ancora non funziona**:

1. **Copia TUTTI i log dalla console** (dal primo 🔷 all'ultimo ❌)
2. **Fai screenshot** della sezione "EmailJS Configuration:"
3. **Verifica** che su EmailJS dashboard le statistiche mostrino invii
4. **Condividi** tutti questi dati per un'analisi approfondita

---

## ✅ CONFERMA FINALE

Una volta che vedi questo in console:

```
✅ EmailJS Response: {status: 200, text: 'OK'}
🟢 [ServiceForm] Email inviata con successo!
```

E l'email arriva in `ig.razvan12@gmail.com`, il sistema è **completamente funzionante**! 🎉

Il problema era che `ServiceRequestPage.jsx` non inviava mai email reali.
Ora entrambe le pagine usano correttamente `emailClient.js`.
