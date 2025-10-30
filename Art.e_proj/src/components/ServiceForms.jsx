import { useEffect, useRef, useState } from 'react';
import './ServiceForms.css';
import { sendServiceFormEmail } from '../services/nodemailerClient';

const SERVICES = [
  {
    id: 'regali-e-prank',
    title: 'Idee Regalo',
    subtitle: 'Sorprese personalizzate per ogni occasione',
    description: 'Descrivi il tipo di regalo o scherzo, il destinatario e il tono desiderato. Possiamo partire da un tuo concept o crearne uno da zero.',
  },
  {
    id: 'abbigliamento-e-custom',
    title: 'Abbigliamento e Custom',
    subtitle: 'Capi e accessori su misura',
    description: 'Indica tipologia, quantità, colori, taglie e qualsiasi riferimento grafico per sviluppare il tuo progetto personalizzato.',
  },
  {
    id: '3d-design-stampa-3d',
    title: '3D Design & Stampa 3D',
    subtitle: 'Dall\'idea alla realizzazione del prodotto finito',
    description: 'Dal modello digitale all\'oggetto reale: creazioni uniche, prototipi, gadget e design personalizzati per ogni esigenza.',
  },
  {
    id: 'web-e-app-design',
    title: 'Web & App Design',
    subtitle: 'Esperienze digitali efficaci',
    description: 'Siti Web moderni, App intuitive e soluzioni grafiche per far crescere il tuo brand online e raggiungere i tuoi obiettivi.',
  },
];

const createInitialState = () => ({
  name: '',
  email: '',
  phone: '',
  company: '',
  projectDescription: '',
  files: [],
});

function ServiceForm({ service }) {
  const [formData, setFormData] = useState(createInitialState);
  const [status, setStatus] = useState('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);
  const isMountedRef = useRef(true);
  const fileInputRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml',
      'application/pdf', 'application/zip', 'image/vnd.adobe.illustrator',
      'application/vnd.adobe.illustrator'
    ];

    if (file.size > maxSize) {
      throw new Error(`Il file "${file.name}" supera i 10MB consentiti.`);
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error(`Il file "${file.name}" non è di un tipo supportato.`);
    }

    return true;
  };

  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    const currentFiles = formData.files || [];
    
    if (currentFiles.length + fileArray.length > 5) {
      setFeedbackMessage('Puoi allegare massimo 5 file.');
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
        setFeedbackMessage('');
      }, 3000);
      return;
    }

    try {
      fileArray.forEach(validateFile);
      
      const newFiles = fileArray.map(file => ({
        file,
        id: Math.random().toString(36).substr(2, 9),
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      }));

      setFormData(prev => ({
        ...prev,
        files: [...currentFiles, ...newFiles]
      }));
    } catch (error) {
      setFeedbackMessage(error.message);
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
        setFeedbackMessage('');
      }, 3000);
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
    event.target.value = '';
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragActive(false);
    
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragActive(false);
  };

  const removeFile = (fileId) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter(f => f.id !== fileId)
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    setStatus('submitting');
    setFeedbackMessage('');

    try {
      await sendServiceFormEmail({ service, formData });
      
      if (!isMountedRef.current) return;

      setStatus('success');
      setFeedbackMessage('Richiesta ricevuta! Ti ricontatteremo entro 24 ore lavorative.');
      
      // Cleanup file previews
      formData.files?.forEach(fileObj => {
        if (fileObj.preview) {
          URL.revokeObjectURL(fileObj.preview);
        }
      });
      
      setFormData(createInitialState());
    } catch (error) {
      if (!isMountedRef.current) return;

      setStatus('error');
      setFeedbackMessage(
        error instanceof Error
          ? error.message
          : 'Si è verificato un problema durante l\'invio. Riprova più tardi.'
      );
    }
  };

  const handleReset = () => {
    // Cleanup file previews
    formData.files?.forEach(fileObj => {
      if (fileObj.preview) {
        URL.revokeObjectURL(fileObj.preview);
      }
    });
    
    setFormData(createInitialState());
    setStatus('idle');
    setFeedbackMessage('');
  };

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      // Cleanup file previews when component unmounts
      formData.files?.forEach(fileObj => {
        if (fileObj.preview) {
          URL.revokeObjectURL(fileObj.preview);
        }
      });
    };
  }, [formData.files]);

  return (
    <section className="service-form" aria-labelledby={`${service.id}-title`}>
      <div className="service-form__header">
        <h3 id={`${service.id}-title`}>{service.title}</h3>
        <p className="service-form__subtitle">{service.subtitle}</p>
        <p className="service-form__description">{service.description}</p>
      </div>

      <form className="service-form__body" onSubmit={handleSubmit} onReset={handleReset}>
        <div className="service-form__grid">
          <label className="service-form__field">
            <span>Nome e Cognome *</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Mario Rossi"
            />
          </label>

          <label className="service-form__field">
            <span>Email *</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="nome@azienda.it"
            />
          </label>

          <label className="service-form__field">
            <span>Numero di Telefono</span>
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+39 347 1234567"
            />
          </label>

          <label className="service-form__field">
            <span>Azienda / Brand</span>
            <input
              type="text"
              name="company"
              autoComplete="organization"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nome dell'azienda o brand"
            />
          </label>

          <div className="service-form__field service-form__field--file">
            <span>Carica File (max 5 file, 10MB ciascuno)</span>
            <div 
              className={`file-upload-area ${isDragActive ? 'drag-active' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.zip,.png,.jpg,.jpeg,.svg,.ai"
                onChange={handleFileChange}
                className="file-upload-input"
              />
              <div className="file-upload-content">
                <div className="file-upload-icon">📎</div>
                <p>Trascina i file qui o <button type="button" onClick={() => fileInputRef.current?.click()}>seleziona file</button></p>
                <small>Formati supportati: PDF, ZIP, PNG, JPG, JPEG, SVG, AI</small>
              </div>
            </div>
            
            {formData.files && formData.files.length > 0 && (
              <div className="file-previews">
                {formData.files.map((fileObj) => (
                  <div key={fileObj.id} className="file-preview">
                    {fileObj.preview ? (
                      <img 
                        src={fileObj.preview} 
                        alt={fileObj.file.name}
                        className="file-preview-image"
                      />
                    ) : (
                      <div className="file-preview-icon">📄</div>
                    )}
                    <div className="file-preview-info">
                      <span className="file-preview-name">{fileObj.file.name}</span>
                      <span className="file-preview-size">
                        {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(fileObj.id)}
                      className="file-preview-remove"
                      aria-label={`Rimuovi ${fileObj.file.name}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <label className="service-form__field service-form__field--full">
          <span>Descrizione del Progetto *</span>
          <textarea
            name="projectDescription"
            required
            value={formData.projectDescription}
            onChange={handleChange}
            rows={5}
            placeholder="Descrivi in dettaglio il tuo progetto: obiettivi, tempistiche, stile desiderato, target di riferimento e qualsiasi altra informazione utile..."
          />
        </label>

        <div className="service-form__actions">
          <button type="reset" className="service-form__button service-form__button--secondary">
            Resetta Modulo
          </button>
          <button
            type="submit"
            className="service-form__button"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Invio in corso…' : 'Invia Richiesta'}
          </button>
        </div>

        {status !== 'idle' && status !== 'submitting' && (
          <div
            className={`service-form__feedback service-form__feedback--${status}`}
            role={status === 'error' ? 'alert' : 'status'}
          >
            {feedbackMessage}
          </div>
        )}
      </form>
    </section>
  );
}

export default function ServiceForms() {
  return (
    <section className="service-forms" aria-labelledby="service-forms-title">
      <div className="service-forms__container">
        <header className="service-forms__intro">
          <h2 id="service-forms-title">Richiedi un Progetto Personalizzato</h2>
          <p>
            Compila il form relativo al servizio di tuo interesse. Puoi allegare file di riferimento, bozze o
            materiali che ci aiutino a comprendere meglio la tua idea.
          </p>
        </header>

        <div className="service-forms__wrapper">
          {SERVICES.map((service) => (
            <ServiceForm key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
