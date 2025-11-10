import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getServiceBySlug } from '../data/serviceSections';
import { sendServiceFormEmail } from '../services/nodemailerClient';
import { useTranslation } from '../contexts/LanguageContext';
import '../components/ServiceForms.css';

const createInitialState = () => ({
  name: '',
  email: '',
  phone: '',
  company: '',
  details: '',
  files: [],
});

export default function ServiceRequestPage() {
  const { t } = useTranslation();
  const { serviceSlug } = useParams();
  const service = getServiceBySlug(serviceSlug);
  const [formData, setFormData] = useState(createInitialState);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [serviceSlug]);

  useEffect(() => {
    setFormData(createInitialState());
    setStatus('idle');
  }, [serviceSlug]);

  if (!service) {
    return (
      <section className="service-forms service-forms--not-found">
        <div className="service-forms__container">
          <header className="service-forms__intro">
            <h2>{t('service_form.not_found_title')}</h2>
            <p>
              {t('service_form.not_found_description')}
            </p>
            <Link to="/" className="service-form__button service-form__button--secondary">
              {t('service_form.back_to_home')}
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
    const newFiles = Array.from(event.target.files || []);
    const currentFiles = formData.files || [];
    const totalFiles = currentFiles.length + newFiles.length;
    
    if (totalFiles > 5) {
      alert(t('service_form.max_files_error'));
      return;
    }
    
    setFormData((prev) => ({ 
      ...prev, 
      files: [...currentFiles, ...newFiles]
    }));
  };

  const removeFile = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, index) => index !== indexToRemove)
    }));
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
    } catch (error) {
      console.error('🔴 [ServiceRequestPage] Errore durante invio:', error);
      setStatus('error');
    }
  };

  const handleReset = () => {
    setFormData(createInitialState());
    setStatus('idle');
  };

  return (
    <section className="service-forms" aria-labelledby="service-request-title">
      <div className="service-forms__container">
        <nav className="service-forms__breadcrumbs" aria-label="Percorso di navigazione">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{t(service.titleKey)}</span>
        </nav>

        <header className="service-forms__intro">
          <h2 id="service-request-title">{t(service.titleKey)}</h2>
          <p>{t(service.subtitleKey)}</p>
          {service.heroNoteKey && (
            <p className="service-forms__note">Suggerimento: {t(service.heroNoteKey)}</p>
          )}
        </header>

        <form className="service-form" onSubmit={handleSubmit} onReset={handleReset}>
          <div className="service-form__grid">
            <label className="service-form__field">
              <span>{t('service_form.name_label')}</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={t('service_form.name_placeholder')}
              />
            </label>

            <label className="service-form__field">
              <span>{t('service_form.email_label')}</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={t('service_form.email_placeholder')}
              />
            </label>

            <label className="service-form__field">
              <span>{t('service_form.phone_label')}</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t('service_form.phone_placeholder')}
              />
            </label>

            <label className="service-form__field">
              <span>{t('service_form.company_label')}</span>
              <input
                type="text"
                name="company"
                autoComplete="organization"
                value={formData.company}
                onChange={handleChange}
                placeholder={t('service_form.company_placeholder')}
              />
            </label>

            <label className="service-form__field service-form__field--file service-form__field--full">
              <span>{t('service_form.file_label')} {formData.files.length > 0 && `(${formData.files.length}/5)`}</span>
              <div className="file-input-container">
                <input
                  type="file"
                  name="files"
                  multiple
                  accept=".pdf,.zip,.png,.jpg,.jpeg,.svg,.ai"
                  onChange={handleFileChange}
                  disabled={formData.files.length >= 5}
                />
                {formData.files.length > 0 && (
                  <>
                    <div className="file-info-note">
                      <span className="info-icon">💡</span>
                      {t('service_form.file_info_note')}
                    </div>
                    <div className="file-thumbnails">
                      {formData.files.map((file, index) => (
                        <div key={index} className="file-thumbnail">
                          {file.type.startsWith('image/') ? (
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt={file.name}
                              onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                            />
                          ) : (
                            <div className="file-icon">📄</div>
                          )}
                          <span className="file-name">{file.name}</span>
                          <button 
                            type="button" 
                            className="remove-file-btn"
                            onClick={() => removeFile(index)}
                            aria-label={`${t('service_form.remove_file')} ${file.name}`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </label>
          </div>

          <label className="service-form__field service-form__field--full">
            <span>{t('service_form.details_label')}</span>
            <textarea
              name="details"
              required
              value={formData.details}
              onChange={handleChange}
              rows={6}
              placeholder={t('service_form.details_placeholder')}
            />
          </label>

          <div className="service-form__actions">
            <button type="reset" className="service-form__button service-form__button--secondary">
              {t('service_form.reset_button')}
            </button>
            <button type="submit" className="service-form__button" disabled={status === 'submitting'}>
              {status === 'submitting' ? t('service_form.submitting') : t('service_form.submit_button')}
            </button>
          </div>

          {status === 'success' && (
            <div className="service-form__feedback service-form__feedback--success" role="status">
              {t('service_form.success_message')}
            </div>
          )}
          
          {status === 'error' && (
            <div className="service-form__feedback service-form__feedback--error" role="alert">
              {t('service_form.error_message')}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
