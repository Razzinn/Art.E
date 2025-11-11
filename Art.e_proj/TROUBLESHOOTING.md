# 🚨 DIAGNOSI RAPIDA - EmailJS Non Invia

## PASSO 1: Verifica che il server sia riavviato

Il dev server deve essere riavviato dopo aver modificato `.env.local`:

```powershell
# Ferma il server se è in esecuzione (Ctrl+C)
# Poi riavvia
npm run dev
```

⚠️ **CRITICO:** Se non riavvii il server dopo aver modificato `.env.local`, le variabili non vengono caricate!

---

## PASSO 2: Apri il Browser e la Console

1. Apri il browser su `http://localhost:3000` (o la porta che vedi nel terminal)
2. Premi **F12** per aprire Developer Tools
3. Clicca sulla tab **Console**
4. Cancella i log esistenti (icona 🚫 o tasto destro → Clear console)

---

## PASSO 3: Compila e Invia il Form

Vai a una delle sezioni del Service Form e compila con dati di test:

```
Nome: Mario Rossi
Email: test@example.com  
Telefono: +39 347 1234567
Azienda: Test Company
Budget: 500-1500
Dettagli: Questo è un test per verificare l'invio email
```

Clicca "Invia richiesta"

---

## PASSO 4: Leggi i Log nella Console

### ✅ CASO 1: Vedi questo = EMAIL INVIATA CORRETTAMENTE
```
📧 EmailJS Configuration:
  serviceId: "✓ Present"
  templateId: "✓ Present"
  publicKey: "✓ Present"
  
📤 Sending email with params: {service_id: "logo", requester: "Mario Rossi", email: "test@example.com"}

✅ EmailJS Response: {status: 200, text: "OK"}
```

**SOLUZIONE:** L'email È STATA INVIATA! Controlla:
- Inbox di `creo.advice@gmail.com`
- **Cartella SPAM/Promozioni** ← molto probabile!
- Attendi 1-2 minuti (a volte c'è ritardo)

---

### ❌ CASO 2: Vedi "✗ Missing" = ENV NON CARICATO
```
📧 EmailJS Configuration:
  serviceId: "✗ Missing"
  templateId: "✗ Missing"
  publicKey: "✗ Missing"
```

**PROBLEMA:** Il file `.env.local` non viene letto

**SOLUZIONE:**
1. Verifica che il file si chiami ESATTAMENTE `.env.local` (non `.env.local.txt`)
2. Verifica che sia nella root del progetto (stesso livello di `package.json`)
3. Riavvia il server: `npm run dev`
4. Riprova

---

### ❌ CASO 3: Errore "The public key is required"
```
❌ EmailJS send failed: {
  message: "The public key is required"
}
```

**PROBLEMA:** Public key non valida o formato errato

**SOLUZIONE:**
1. Vai su https://dashboard.emailjs.com/admin/account
2. Nella sezione "API Keys", copia la **Public Key**
3. Incollala in `.env.local`:
   ```
   VITE_EMAILJS_PUBLIC_KEY=la_tua_chiave_qui
   ```
4. Riavvia `npm run dev`

---

### ❌ CASO 4: Errore "Template ID is invalid"
```
❌ EmailJS send failed: {
  message: "Template ID is invalid"
}
```

**PROBLEMA:** Template non esiste o ID errato

**SOLUZIONE:**
1. Vai su https://dashboard.emailjs.com/admin/templates
2. Verifica che esista un template con ID `template_jq9eala`
3. Se non esiste:
   - Crea un nuovo template
   - Copia il nuovo Template ID
   - Aggiorna `.env.local` con il nuovo ID
   - Riavvia server

---

### ❌ CASO 5: Errore 403 Forbidden
```
❌ EmailJS send failed: {
  status: 403,
  message: "Forbidden"
}
```

**PROBLEMA:** Dominio non autorizzato

**SOLUZIONE:**
1. Vai su https://dashboard.emailjs.com/admin/account
2. Scorri fino a "Security"
3. In "Allowed Origins" aggiungi:
   ```
   http://localhost:3000
   http://localhost:5173
   ```
4. Salva e riprova (senza riavviare il server)

---

### ❌ CASO 6: Errore 400 Bad Request
```
❌ EmailJS send failed: {
  status: 400,
  message: "Bad request - check your data"
}
```

**PROBLEMA:** Template non ha un destinatario configurato

**SOLUZIONE:**
1. Vai su https://dashboard.emailjs.com/admin/templates/template_jq9eala
2. Nel campo **"To Email"** inserisci: `creo.advice@gmail.com`
3. Salva il template
4. Riprova (senza riavviare)

**OPPURE** aggiungi al `.env.local`:
```bash
VITE_EMAILJS_TO_EMAIL=creo.advice@gmail.com
```
E riavvia il server.

---

## PASSO 5: Condividi l'Output

Se vedi un errore diverso da quelli sopra:

1. Fai uno **screenshot della console** (F12 → tab Console)
2. Copia il messaggio di errore esatto
3. Condividilo così posso darti la soluzione precisa

---

## ⚡ Quick Fix più Comune

Nella mia esperienza, il 90% dei problemi è:

1. **Server non riavviato** dopo aver modificato `.env.local`
2. **Template senza destinatario** (campo "To Email" vuoto)
3. **Email arriva ma finisce in SPAM**

Prova questa sequenza:

```powershell
# 1. Ferma il server (Ctrl+C)

# 2. Verifica .env.local (deve essere nella root)
cat .env.local

# 3. Riavvia
npm run dev

# 4. Apri browser con console (F12)

# 5. Invia form e leggi console
```

Dimmi cosa vedi nella console! 🔍
