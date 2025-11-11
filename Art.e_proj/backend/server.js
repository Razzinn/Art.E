const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware di sicurezza
app.use(helmet());

// CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurazione Multer per upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 5 // massimo 5 file
  },
  fileFilter: (req, file, cb) => {
    // Tipi di file consentiti
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|zip|rar|ai|svg/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Tipo di file non supportato'));
    }
  }
});

// Configurazione Nodemailer
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true per 465, false per altri
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Template email HTML
const createEmailTemplate = (formData, service) => {
  const filesInfo = formData.files && formData.files.length > 0 
    ? formData.files.map(file => `📄 ${file.originalname} (${(file.size / 1024).toFixed(1)} KB)`).join('<br>')
    : 'Nessun file allegato';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #38bdf8, #a855f7); color: white; padding: 20px; border-radius: 8px; }
        .content { padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { color: #333; margin-left: 10px; }
        .files { background: #f8f9fa; padding: 15px; border-radius: 6px; margin-top: 10px; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>🎨 Nuova Richiesta Servizio - Art.E</h2>
        <p>Servizio richiesto: <strong>${service.title || 'Non specificato'}</strong></p>
      </div>
      
      <div class="content">
        <div class="field">
          <span class="label">👤 Nome:</span>
          <span class="value">${formData.name || 'Non fornito'}</span>
        </div>
        
        <div class="field">
          <span class="label">📧 Email:</span>
          <span class="value">${formData.email || 'Non fornita'}</span>
        </div>
        
        <div class="field">
          <span class="label">📞 Telefono:</span>
          <span class="value">${formData.phone || 'Non fornito'}</span>
        </div>
        
        <div class="field">
          <span class="label">🏢 Azienda:</span>
          <span class="value">${formData.company || 'Non specificata'}</span>
        </div>
        
        <div class="field">
          <span class="label">📝 Dettagli Progetto:</span>
          <div class="value" style="margin-top: 10px; white-space: pre-wrap;">${formData.details || 'Nessun dettaglio fornito'}</div>
        </div>
        
        <div class="files">
          <span class="label">📎 File Allegati (${formData.files ? formData.files.length : 0}):</span>
          <div style="margin-top: 10px;">${filesInfo}</div>
        </div>
      </div>
      
      <div class="footer">
        <p>Richiesta inviata tramite Art.E - ${new Date().toLocaleDateString('it-IT')}</p>
      </div>
    </body>
    </html>
  `;
};

// Endpoint per l'invio email
app.post('/api/send-email', upload.array('files', 5), async (req, res) => {
  try {
    console.log('📧 Ricevuta richiesta di invio email');
    console.log('Body:', req.body);
    console.log('Files:', req.files?.map(f => ({ name: f.originalname, size: f.size })));

    const { name, email, phone, company, details, service } = req.body;
    
    // Validazione campi obbligatori
    if (!name || !email || !details) {
      return res.status(400).json({
        error: 'Campi obbligatori mancanti',
        required: ['name', 'email', 'details']
      });
    }

    // Parsing del servizio se è una stringa JSON
    let serviceData;
    try {
      serviceData = typeof service === 'string' ? JSON.parse(service) : service;
    } catch {
      serviceData = { title: 'Servizio non specificato' };
    }

    const formData = {
      name,
      email,
      phone,
      company,
      details,
      files: req.files || []
    };

    // Crea il transporter
    const transporter = createTransporter();

    // Verifica la connessione
    await transporter.verify();
    console.log('✅ Connessione SMTP verificata');

    // Prepara gli allegati
    const attachments = req.files ? req.files.map(file => ({
      filename: file.originalname,
      path: file.path
    })) : [];

    // Opzioni email
    const mailOptions = {
      from: {
        name: `${name} (Art.E)`,
        address: process.env.EMAIL_USER
      },
      to: {
        name: process.env.EMAIL_TO_NAME,
        address: process.env.EMAIL_TO
      },
      replyTo: email,
      subject: `🎨 Nuova richiesta: ${serviceData.title} - ${name}`,
      html: createEmailTemplate(formData, serviceData),
      attachments
    };

    // Invia l'email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email inviata:', info.messageId);

    // Pulisci i file temporanei
    if (req.files) {
      req.files.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Errore nella pulizia file:', err);
        });
      });
    }

    res.json({
      success: true,
      messageId: info.messageId,
      message: 'Email inviata con successo'
    });

  } catch (error) {
    console.error('❌ Errore invio email:', error);

    // Pulisci i file in caso di errore
    if (req.files) {
      req.files.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Errore nella pulizia file:', err);
        });
      });
    }

    res.status(500).json({
      error: 'Errore nell\'invio dell\'email',
      message: error.message
    });
  }
});

// Test SMTP connection
app.get('/api/test-smtp', async (req, res) => {
  try {
    console.log('🔍 Test connessione SMTP...');
    console.log('📧 HOST:', process.env.EMAIL_HOST);
    console.log('📧 PORT:', process.env.EMAIL_PORT);
    console.log('📧 USER:', process.env.EMAIL_USER);
    console.log('📧 PASSWORD:', process.env.EMAIL_APP_PASSWORD ? '***impostata***' : '❌ NON IMPOSTATA');
    
    const transporter = createTransporter();
    
    // Test della connessione
    await transporter.verify();
    console.log('✅ Connessione SMTP riuscita!');
    
    res.json({ 
      success: true, 
      message: 'Connessione SMTP verificata',
      config: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER,
        hasPassword: !!process.env.EMAIL_APP_PASSWORD
      }
    });
  } catch (error) {
    console.error('❌ Errore test SMTP:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      code: error.code,
      command: error.command
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Gestione errori Multer
app.use((error, req, res, _next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File troppo grande (max 10MB)' });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Troppi file (max 5)' });
    }
  }
  
  if (error.message === 'Tipo di file non supportato') {
    return res.status(400).json({ error: error.message });
  }

  console.error('Errore server:', error);
  res.status(500).json({ error: 'Errore interno del server' });
});

// Avvio server
app.listen(PORT, () => {
  console.log(`🚀 Server Art.E in esecuzione su porta ${PORT}`);
  console.log(`📧 Email destinatario: ${process.env.EMAIL_TO}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL}`);
});

module.exports = app;
