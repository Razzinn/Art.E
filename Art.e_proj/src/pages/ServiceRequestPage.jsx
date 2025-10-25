import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getServiceBySlug } from '../data/serviceSections';
import { sendServiceFormEmail } from '../services/emailClient';
import '../components/ServiceForms.css';

const BUDGET_RANGES = [
  { value: '', label: 'Seleziona una fascia' },
  { value: '<500', label: 'Fino a 500 €' },
  { value: '500-1500', label: '500 € - 1.500 €' },
  { value: '1500-5000', label: '1.500 € - 5.000 €' },
  { value: '>5000', label: 'Oltre 5.000 €' },
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

export default function ServiceRequestPage() {
  const { serviceSlug } = useParams();
  const service = getServiceBySlug(serviceSlug);
  const [formData, setFormData] = useState(createInitialState);
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [serviceSlug]);

  useEffect(() => {
    setFormData(createInitialState());
    setFileName('');
    setStatus('idle');
  }, [serviceSlug]);

  if (!service) {
    return (
      <section className="service-forms service-forms--not-found">
        <div className="service-forms__container">
          <header className="service-forms__intro">
            <h2>Servizio non trovato</h2>
            <p>
              La sezione richiesta non è disponibile. Torna alla home o scegli un altro servizio tra quelli
              disponibili.
            </p>
            <Link to="/" className="service-form__button service-form__button--secondary">
              Torna alla home
            </Link>
          </header>
        </div>
      </section>
    );
  }

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
    console.log('🔵 [ServiceRequestPage] handleSubmit chiamato per servizio:', service.id);
    console.log('🔵 [ServiceRequestPage] Dati form:', formData);
    
    setStatus('submitting');

    try {
      console.log('🔵 [ServiceRequestPage] Chiamata sendServiceFormEmail in corso...');
      await sendServiceFormEmail({ service, formData });
      console.log('🟢 [ServiceRequestPage] Email inviata con successo!');
      
      setStatus('success');
      setFormData(createInitialState());
      setFileName('');
    } catch (error) {
      console.error('🔴 [ServiceRequestPage] Errore durante invio:', error);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setFormData(createInitialState());
    setFileName('');
    setStatus('idle');
  };

  return (
    <section className="service-forms" aria-labelledby="service-request-title">
      <div className="service-forms__container">
        <nav className="service-forms__breadcrumbs" aria-label="Percorso di navigazione">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{service.title}</span>
        </nav>

        <header className="service-forms__intro">
          <h2 id="service-request-title">{service.title}</h2>
          <p>{service.subtitle}</p>
          {service.heroNote && (
            <p className="service-forms__note">Suggerimento: {service.heroNote}</p>
          )}
        </header>

        <form className="service-form" onSubmit={handleSubmit} onReset={handleReset}>
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
                {BUDGET_RANGES.map((option) => (
                  <option key={option.value || 'empty'} value={option.value}>
                    {option.label}
                  </option>
                ))}
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
              rows={6}
              placeholder="Descrivi obiettivi, tempistiche, riferimenti e qualsiasi informazione utile."
            />
          </label>

          <div className="service-form__actions">
            <button type="reset" className="service-form__button service-form__button--secondary">
              Svuota campi
            </button>
            <button type="submit" className="service-form__button" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Invio in corso…' : 'Invia richiesta'}
            </button>
          </div>

          {status === 'success' && (
            <div className="service-form__feedback service-form__feedback--success" role="status">
              Richiesta ricevuta! Ti ricontatteremo entro 24 ore lavorative.
            </div>
          )}
          
          {status === 'error' && (
            <div className="service-form__feedback service-form__feedback--error" role="alert">
              Si è verificato un problema durante l'invio. Riprova più tardi o contattaci direttamente.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
