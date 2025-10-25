import { useEffect, useRef, useState } from 'react';
import './ServiceForms.css';
import { sendServiceFormEmail } from '../services/emailClient';

const SERVICES = [
  {
    id: 'logo',
    title: 'Restyling Logo',
    subtitle: 'Rinnova la tua identità visiva',
    description:
      'Raccontaci la storia del tuo brand, gli elementi da mantenere e le nuove direzioni estetiche che vorresti esplorare.',
  },
  {
    id: 'pranks',
    title: 'Idee Regalo',
    subtitle: 'Sorprese personalizzate per ogni occasione',
    description:
      'Descrivi il tipo di regalo o scherzo, il destinatario e il tono desiderato. Possiamo partire da un tuo concept o crearne uno da zero.',
  },
  {
    id: 'apparel',
    title: 'Abbigliamento e Custom',
    subtitle: 'Capi e accessori su misura',
    description:
      'Indica tipologia, quantità, colori, taglie e qualsiasi riferimento grafico per sviluppare il tuo progetto personalizzato.',
  },
  {
    id: 'digital',
    title: 'Servizi Digitali',
    subtitle: 'Web, app e marketing digitale',
    description:
      'Spiegaci gli obiettivi digitali, il pubblico di riferimento e le funzionalità chiave che desideri implementare.',
  },
];

const createInitialState = () => ({
  name: '',
  email: '',
  phone: '',
  company: '',
  details: '',
  budget: '',
  file: null,
});

function ServiceForm({ service }) {
  console.log('🔷 [ServiceForm] Componente montato per servizio:', service.id);
  
  const [formData, setFormData] = useState(createInitialState);
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const isMountedRef = useRef(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, file }));
    setFileName(file ? file.name : '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('🔵 [ServiceForm] handleSubmit chiamato per servizio:', service.id);
    console.log('🔵 [ServiceForm] Dati form:', formData);
    
    setStatus('submitting');
    setFeedbackMessage('');

    try {
      console.log('🔵 [ServiceForm] Chiamata sendServiceFormEmail in corso...');
      await sendServiceFormEmail({ service, formData });
      console.log('🟢 [ServiceForm] Email inviata con successo!');
      
      if (!isMountedRef.current) return;

      setStatus('success');
      setFeedbackMessage('Richiesta ricevuta! Ti ricontatteremo entro 24 ore lavorative.');
      setFormData(createInitialState());
      setFileName('');
    } catch (error) {
      console.error('🔴 [ServiceForm] Errore durante invio:', error);
      
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
    setFormData(createInitialState());
    setFileName('');
    setStatus('idle');
    setFeedbackMessage('');
  };

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

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
            <span>Nome e cognome *</span>
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
            <span>Telefono</span>
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
              placeholder="Nome del brand"
            />
          </label>

          <label className="service-form__field">
            <span>Budget indicativo</span>
            <select name="budget" value={formData.budget} onChange={handleChange}>
              <option value="">Seleziona una fascia</option>
              <option value="<500">Fino a 500 €</option>
              <option value="500-1500">500 € - 1.500 €</option>
              <option value="1500-5000">1.500 € - 5.000 €</option>
              <option value=">5000">Oltre 5.000 €</option>
            </select>
          </label>

          <label className="service-form__field service-form__field--file">
            <span>Allega file di riferimento</span>
            <input
              type="file"
              name="file"
              accept=".pdf,.zip,.png,.jpg,.jpeg,.svg,.ai"
              onChange={handleFileChange}
            />
            {fileName && <p className="service-form__file-name">File selezionato: {fileName}</p>}
          </label>
        </div>

        <label className="service-form__field service-form__field--full">
          <span>Dettagli del progetto *</span>
          <textarea
            name="details"
            required
            value={formData.details}
            onChange={handleChange}
            rows={5}
            placeholder="Descrivi obiettivi, tempistiche, riferimenti e qualsiasi informazione utile."
          />
        </label>

        <div className="service-form__actions">
          <button type="reset" className="service-form__button service-form__button--secondary">
            Svuota campi
          </button>
          <button
            type="submit"
            className="service-form__button"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Invio in corso…' : 'Invia richiesta'}
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
          <h2 id="service-forms-title">Richiedi un progetto personalizzato</h2>
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
