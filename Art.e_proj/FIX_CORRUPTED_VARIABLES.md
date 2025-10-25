# 🚨 FIX: "Template: One or more dynamic variables are corrupted"

## 🔍 PROBLEMA IDENTIFICATO

EmailJS ha ricevuto variabili che **non corrispondono esattamente** al template configurato nel dashboard.

---

## ✅ VARIABILI INVIATE DAL CODICE

Il file `emailClient.js` ora invia queste variabili:

```javascript
{
  service_id: 'logo',                           // ID del servizio
  service_title: 'Restyling Logo',              // Titolo del servizio
  service_subtitle: 'Rinnova la tua identità',  // Sottotitolo
  requester_name: 'Mario Rossi',                // Nome cliente
  requester_email: 'mario@example.com',         // Email cliente
  requester_phone: '+39 347 1234567',           // Telefono (o "Non fornito")
  requester_company: 'Acme Corp',               // Azienda (o "Non specificato")
  project_budget: '1500-5000',                  // Budget (o "Non indicato")
  project_details: 'Descrizione progetto...',   // Dettagli progetto
  file_name: 'logo.png',                        // Nome file (o "Nessun file allegato")
  reply_to: 'mario@example.com',                // Email per rispondere
  from_name: 'Mario Rossi',                     // Nome mittente
  from_email: 'mario@example.com',              // Email mittente
  to_email: 'ig.razvan12@gmail.com',           // (opzionale) Email destinatario
  to_name: 'Test CREO'                         // (opzionale) Nome destinatario
}
```

---

## 🔧 CONFIGURAZIONE TEMPLATE EMAILJS

### PASSO 1: Vai al Dashboard EmailJS

URL: https://dashboard.emailjs.com/admin/templates/template_jq9eala

### PASSO 2: Verifica Configurazione Base

**From Name:** `{{from_name}}`  
**From Email:** `{{from_email}}`  
**To Email:** `{{to_email}}`  
**Reply To:** `{{reply_to}}`  
**Subject:** `🎯 Nuova Richiesta: {{service_title}} - {{requester_name}}`

### PASSO 3: Verifica Template HTML

Il template HTML **DEVE USARE ESATTAMENTE** questi placeholder (con doppie graffe):

#### ✅ Variabili Obbligatorie (DEVONO essere presenti)

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

#### ⚠️ Variabili Opzionali (se presenti nel template)

```
{{to_email}}
{{to_name}}
```

---

## 🐛 ERRORI COMUNI CHE CAUSANO "CORRUPTED VARIABLES"

### ❌ ERRORE 1: Typo nelle Variabili

**Template errato:**
```html
{{requester_emai}}  ← Manca la 'l'
{{service-title}}   ← Usa trattino invece di underscore
{{ServiceTitle}}    ← Maiuscole errate
```

**Template corretto:**
```html
{{requester_email}}
{{service_title}}
{{service_title}}
```

### ❌ ERRORE 2: Variabili Mancanti nel Template

Se il template usa `{{received_date}}` ma il codice **non invia** questa variabile, EmailJS va in errore.

**Soluzione:** Rimuovi `{{received_date}}` dal template oppure aggiungila al codice.

### ❌ ERRORE 3: Graffe Errate

**Template errato:**
```html
{service_title}       ← Una sola graffa
{{ service_title }}   ← Spazi tra graffe e nome
```

**Template corretto:**
```html
{{service_title}}     ← Due graffe, nessuno spazio
```

### ❌ ERRORE 4: Variabili in Sezioni Condizionali

**Template problematico:**
```html
{{#if received_date}}
  Ricevuto il: {{received_date}}
{{/if}}
```

Se `received_date` non viene inviata, EmailJS potrebbe dare errore.

**Soluzione:** Usa sempre valori default nel codice oppure rimuovi le condizionali.

---

## ✅ TEMPLATE HTML CORRETTO E TESTATO

Usa questo template nel dashboard EmailJS (copia tutto):

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px 8px 0 0;
            margin: -30px -30px 20px -30px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .header p {
            margin: 5px 0 0 0;
            opacity: 0.9;
            font-size: 14px;
        }
        .section {
            margin: 20px 0;
            padding: 15px;
            background-color: #f8f9fa;
            border-left: 4px solid #667eea;
            border-radius: 4px;
        }
        .section-title {
            font-size: 16px;
            font-weight: 600;
            color: #667eea;
            margin: 0 0 10px 0;
        }
        .field {
            margin: 10px 0;
        }
        .field-label {
            font-weight: 600;
            color: #555;
            display: inline-block;
            min-width: 120px;
        }
        .field-value {
            color: #333;
        }
        .details-box {
            background-color: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            padding: 15px;
            margin-top: 10px;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
            text-align: center;
            color: #777;
            font-size: 12px;
        }
        .badge {
            display: inline-block;
            padding: 4px 8px;
            background-color: #667eea;
            color: white;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 Nuova Richiesta di Servizio</h1>
            <p>{{service_title}} • {{service_subtitle}}</p>
        </div>

        <div class="section">
            <div class="section-title">👤 Informazioni Cliente</div>
            <div class="field">
                <span class="field-label">Nome:</span>
                <span class="field-value">{{requester_name}}</span>
            </div>
            <div class="field">
                <span class="field-label">Email:</span>
                <span class="field-value"><a href="mailto:{{requester_email}}">{{requester_email}}</a></span>
            </div>
            <div class="field">
                <span class="field-label">Telefono:</span>
                <span class="field-value">{{requester_phone}}</span>
            </div>
            <div class="field">
                <span class="field-label">Azienda:</span>
                <span class="field-value">{{requester_company}}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">💼 Dettagli Progetto</div>
            <div class="field">
                <span class="field-label">Categoria:</span>
                <span class="badge">{{service_id}}</span>
            </div>
            <div class="field">
                <span class="field-label">Budget Indicativo:</span>
                <span class="field-value">{{project_budget}}</span>
            </div>
            <div class="field">
                <span class="field-label">File Allegato:</span>
                <span class="field-value">{{file_name}}</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">📝 Descrizione Dettagliata</div>
            <div class="details-box">{{project_details}}</div>
        </div>

        <div class="footer">
            <p><strong>CREO Marketplace</strong> - Sistema Automatico di Richieste</p>
            <p>
                <a href="mailto:{{requester_email}}?subject=Re: {{service_title}}" style="color: #667eea; text-decoration: none;">
                    ↩️ Rispondi al Cliente
                </a>
            </p>
        </div>
    </div>
</body>
</html>
```

---

## 📝 TEMPLATE TEXT (Fallback)

Copia anche questo nel campo "Text" del template:

```
🎯 NUOVA RICHIESTA DI SERVIZIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SERVIZIO RICHIESTO
• Categoria: {{service_title}}
• Descrizione: {{service_subtitle}}
• ID Servizio: {{service_id}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 INFORMAZIONI CLIENTE

Nome e Cognome: {{requester_name}}
Email: {{requester_email}}
Telefono: {{requester_phone}}
Azienda/Brand: {{requester_company}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💼 DETTAGLI PROGETTO

Budget Indicativo: {{project_budget}}
File Allegato: {{file_name}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 DESCRIZIONE DETTAGLIATA

{{project_details}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Per rispondere, usa: {{reply_to}}

---
CREO Marketplace - Sistema Automatico di Richieste
```

---

## 🧪 TEST DI VERIFICA

### PASSO 1: Salva il Template

1. Vai su https://dashboard.emailjs.com/admin/templates/template_jq9eala
2. **Sostituisci completamente** il template HTML con quello sopra
3. **Sostituisci completamente** il template TEXT con quello sopra
4. **Clicca "Save"**

### PASSO 2: Test dal Sito

1. Riavvia il server: `npm run dev`
2. Apri http://localhost:3000/
3. Vai a una pagina servizio (es. `/servizi/restyling-logo`)
4. Compila il form:
   - Nome: Test CREO
   - Email: test@example.com
   - Dettagli: Test variabili corrette
5. Clicca "Invia richiesta"

### PASSO 3: Controlla Console

Dovresti vedere:
```
📧 EmailJS Configuration: {serviceId: '✓ Present', ...}
📤 Sending email with params: {...}
✅ EmailJS Response: {status: 200, text: 'OK'}
```

### PASSO 4: Controlla Email

Se vedi `status: 200`, l'email è stata inviata correttamente!

Controlla:
- Inbox di `ig.razvan12@gmail.com`
- **Cartella Spam** ⚠️

---

## 🎯 CHECKLIST FINALE

Prima di testare, verifica:

- [ ] Template HTML copiato esattamente come sopra
- [ ] Template TEXT copiato esattamente come sopra
- [ ] Tutte le variabili usano `{{nome_variabile}}` (due graffe, underscore)
- [ ] Campo "To Email" configurato come `{{to_email}}`
- [ ] Campo "Reply To" configurato come `{{reply_to}}`
- [ ] Template salvato nel dashboard
- [ ] Server riavviato dopo modifiche

---

## ⚠️ SE L'ERRORE PERSISTE

1. **Prova con template minimalista:**

```html
<h1>Test</h1>
<p>Nome: {{requester_name}}</p>
<p>Email: {{requester_email}}</p>
```

2. **Se funziona:** Il problema è in una variabile specifica nel template completo
3. **Se NON funziona:** Il problema è nella configurazione EmailJS base

---

## ✅ RISOLUZIONE

Il codice è stato aggiornato per gestire **valori undefined** e fornire **fallback** per tutte le variabili.

**Ora devi solo:**
1. Sostituire il template nel dashboard EmailJS
2. Salvare
3. Testare dal sito

L'errore "corrupted variables" dovrebbe essere risolto! ✅
