# 📧 Template EmailJS - CREO Marketplace

## Istruzioni per la Configurazione

### 1. Vai al Dashboard EmailJS
Apri: https://dashboard.emailjs.com/admin/templates/template_jq9eala

### 2. Configurazione Base

**Template Name:** `CREO - Richiesta Servizio`

**From Name:** `{{from_name}}`

**From Email:** `{{from_email}}` oppure il tuo email service (es. gmail configurato)

**To Email:** `creo.advice@gmail.com` (o l'email dove vuoi ricevere le richieste)

**Reply To:** `{{reply_to}}`

**Subject:** `🎯 Nuova Richiesta: {{service_title}} - {{requester_name}}`

---

## 3. HTML Template (copia tutto il contenuto qui sotto)

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
        .icon {
            display: inline-block;
            margin-right: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1><span class="icon">🎯</span> Nuova Richiesta di Servizio</h1>
            <p>{{service_title}} • {{service_subtitle}}</p>
        </div>

        <div class="section">
            <div class="section-title"><span class="icon">👤</span> Informazioni Cliente</div>
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
            <div class="section-title"><span class="icon">💼</span> Dettagli Progetto</div>
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
            <div class="section-title"><span class="icon">📝</span> Descrizione Dettagliata</div>
            <div class="details-box">{{project_details}}</div>
        </div>

        <div class="footer">
            <p><strong>CREO Marketplace</strong> - Sistema Automatico di Richieste</p>
            <p>Ricevuto il: {{#if received_date}}{{received_date}}{{else}}[Data Invio]{{/if}}</p>
            <p style="margin-top: 10px;">
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

## 4. Text Template (Fallback - copia qui sotto)

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

## 5. Variabili Utilizzate (Tutte mappate correttamente)

✅ **from_name** - Nome mittente (dal form)
✅ **from_email** - Email mittente (dal form)
✅ **reply_to** - Email per rispondere (dal form)
✅ **service_id** - ID servizio (logo, pranks, apparel, digital)
✅ **service_title** - Titolo servizio (Restyling Logo, etc.)
✅ **service_subtitle** - Sottotitolo servizio
✅ **requester_name** - Nome cliente
✅ **requester_email** - Email cliente
✅ **requester_phone** - Telefono cliente
✅ **requester_company** - Azienda/Brand
✅ **project_budget** - Budget indicativo
✅ **project_details** - Dettagli progetto completi
✅ **file_name** - Nome file allegato

---

## 6. Note Importanti

### File Attachment (Base64)
⚠️ La variabile `{{file_attachment}}` contiene il file in formato Base64.

**EmailJS Free Plan:** Non supporta allegati diretti via Base64.

**Soluzioni:**
1. **Upgrade a EmailJS Pro** ($15/mese) per supporto allegati
2. **Usa solo il nome file** (già incluso: `{{file_name}}`)
3. **Chiedi al cliente di reinviare** il file via email

### Testing
1. Salva il template su EmailJS
2. Invia un form di test
3. Controlla inbox e cartella spam
4. Verifica che tutte le variabili siano popolate

### Customizzazione
- Modifica i colori nel CSS (cerca `#667eea` e `#764ba2`)
- Cambia le emoji nelle sezioni
- Aggiungi il tuo logo sostituendo il titolo header

---

## 7. Verifica Finale

Dopo aver salvato il template, testa con:
```
Nome: Mario Rossi
Email: test@example.com
Telefono: +39 347 1234567
Azienda: Test Company
Budget: 1500-5000
Dettagli: Progetto di test per verificare il template
```

Dovresti ricevere un'email formattata e professionale con tutti i dati!
