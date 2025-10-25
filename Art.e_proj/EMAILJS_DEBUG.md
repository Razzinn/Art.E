# 🔧 Guida Diagnostica EmailJS

## Problema: L'email non arriva all'account EmailJS

### ✅ Checklist di Verifica

#### 1. Configurazione `.env.local` (COMPLETATA ✓)
- [x] `VITE_EMAILJS_SERVICE_ID=service_wzoiwxc`
- [x] `VITE_EMAILJS_TEMPLATE_ID=template_jq9eala`
- [x] `VITE_EMAILJS_PUBLIC_KEY=xMZ5W38VyDnz9eG-5`

#### 2. Template EmailJS (DA VERIFICARE)
Vai su: https://dashboard.emailjs.com/admin/templates/template_jq9eala

**Campi obbligatori da mappare:**
```
{{service_id}}
{{service_title}}
{{service_subtitle}}
{{requester_name}}
{{requester_email}}
{{requester_phone}}
{{requester_company}}
{{project_budget}}
{{project_details}}
{{file_name}}
{{reply_to}}
{{from_name}}
{{from_email}}
```

**Campo destinatario:**
- Verifica che "To Email" sia configurato (es. `creo.advice@gmail.com`)
- OPPURE usa la variabile `{{to_email}}` nel template

#### 3. Impostazioni di Sicurezza EmailJS
Vai su: https://dashboard.emailjs.com/admin/account

**Allowed Origins:**
- Aggiungi `http://localhost:3000`
- Aggiungi `http://localhost:5173` (Vite default)
- Aggiungi il dominio di produzione quando deploy

#### 4. Service EmailJS
Vai su: https://dashboard.emailjs.com/admin

- Verifica che il servizio `service_wzoiwxc` sia **attivo**
- Controlla che sia collegato a un account email valido
- Verifica quota mensile non esaurita (Free plan = 200 email/mese)

---

## 🧪 Procedura di Test

### Passo 1: Riavvia il Dev Server
```powershell
# Ferma il server corrente (Ctrl+C)
# Poi riavvia
npm run dev
```

### Passo 2: Apri la Console del Browser
1. Apri il browser su `http://localhost:3000` (o porta Vite)
2. Premi F12 per aprire Developer Tools
3. Vai sulla tab **Console**

### Passo 3: Compila e Invia il Form
Compila qualsiasi service form con dati di test:
- Nome: Test User
- Email: test@example.com
- Dettagli: Test message

Clicca "Invia richiesta"

### Passo 4: Leggi i Log nella Console

**Se funziona, vedrai:**
```
📧 EmailJS Configuration:
  serviceId: "✓ Present"
  templateId: "✓ Present"
  publicKey: "✓ Present"
  
📤 Sending email with params: {...}

✅ EmailJS Response: {status: 200, text: "OK"}
```

**Se c'è un errore, vedrai:**
```
❌ EmailJS send failed: {
  error: {...},
  message: "descrizione errore",
  serviceId: "...",
  templateId: "..."
}
```

---

## 🔍 Errori Comuni e Soluzioni

### Errore: "The public key is required"
**Causa:** Public key non valida o mancante
**Soluzione:**
1. Vai su https://dashboard.emailjs.com/admin/account
2. Copia la "Public Key" corretta
3. Aggiorna `.env.local` e riavvia

### Errore: "Template not found"
**Causa:** Template ID errato o template eliminato
**Soluzione:**
1. Verifica che `template_jq9eala` esista nel dashboard
2. Se non esiste, creane uno nuovo e aggiorna `.env.local`

### Errore: "Service not found"
**Causa:** Service ID errato o servizio non configurato
**Soluzione:**
1. Verifica che `service_wzoiwxc` esista e sia attivo
2. Controlla che sia collegato a un provider email (Gmail, Outlook, etc.)

### Errore: "Bad request (400)"
**Causa:** Parametri mancanti nel template o formato errato
**Soluzione:**
1. Verifica che tutti i placeholder nel template corrispondano ai parametri inviati
2. Controlla che il campo "To Email" sia configurato

### Errore: "Forbidden (403)"
**Causa:** Dominio non autorizzato
**Soluzione:**
1. Vai su Settings → Security → Allowed Origins
2. Aggiungi `http://localhost:3000` e `http://localhost:5173`

### Status 200 ma email non arriva
**Possibili cause:**
1. **Email in spam** - Controlla cartella spam/promozioni
2. **Destinatario errato** - Verifica "To Email" nel template
3. **Service non configurato** - Controlla connessione Gmail/SMTP nel service
4. **Quota esaurita** - Verifica piano EmailJS (Free = 200/mese)

---

## 🎯 Quick Fix per Destinatario

Se vuoi forzare un destinatario specifico, aggiungi al `.env.local`:

```bash
VITE_EMAILJS_TO_EMAIL=creo.advice@gmail.com
VITE_EMAILJS_TO_NAME=CREO Team
```

Poi riavvia il server.

---

## 📞 Supporto Aggiuntivo

Se dopo tutti questi passaggi l'email non arriva:

1. Copia i log della console (errori rossi)
2. Fai uno screenshot della configurazione del template EmailJS
3. Verifica lo stato del service su https://dashboard.emailjs.com/admin

L'errore esatto nella console ti dirà precisamente cosa manca.
