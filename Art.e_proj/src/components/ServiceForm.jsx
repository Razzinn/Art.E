import React, { useState } from 'react';
import { sendServiceFormEmail } from '../services/nodemailerClient';
import { useTranslation } from '../contexts/LanguageContext';
import './ServiceForm.css';

const ServiceForm = ({ serviceType, serviceTitle }) => {
  const { t, tWithParams } = useTranslation();
  
  // Get service data from translations
  const getServiceTranslations = () => {
    const serviceKey = serviceType?.replace('-', '_') || '3d_design';
    return {
      title: t(`offers.services.${serviceKey}.title`, serviceTitle),
      subtitle: t(`offers.services.${serviceKey}.subtitle`, ''),
      promotional: t(`offers.services.${serviceKey}.promotional`, ''),
      heroNote: t(`offers.services.${serviceKey}.hero_note`, '')
    };
  };

  const serviceData = getServiceTranslations();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    files: [],
    projectDescription: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [dragActive, setDragActive] = useState(false);
  const [sendingProgress, setSendingProgress] = useState({ status: '', progress: 0, attempt: 0 });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => {
      // Validazione: max 10MB per file
      if (file.size > 10 * 1024 * 1024) {
        alert(t('service_form.max_files_error'));
        return false;
      }
      return true;
    });

    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles].slice(0, 5) // Max 5 files
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setSendingProgress({ status: 'initializing', progress: 0, attempt: 0 });

    try {
      await sendServiceFormEmail({
        service: {
          type: serviceType,
          title: serviceTitle
        },
        formData: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          details: formData.projectDescription,
          files: formData.files
        },
        onProgress: (progressData) => {
          setSendingProgress(progressData);
        }
      });

      setStatus('success');
      setSendingProgress({ status: 'completed', progress: 100, attempt: 0 });
      
      // Reset form dopo 3 secondi
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          files: [],
          projectDescription: ''
        });
        setStatus('idle');
        setSendingProgress({ status: '', progress: 0, attempt: 0 });
      }, 3000);
    } catch (error) {
      console.error('Errore invio form:', error);
      setStatus('error');
      setSendingProgress({ status: 'failed', progress: 0, attempt: 0 });
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      files: [],
      projectDescription: ''
    });
    setStatus('idle');
  };

  const isFormValid = formData.name && formData.email && formData.projectDescription;

  return (
    <div className="service-form-container">
      <div className="service-form-header">
        <h2>{serviceData.title}</h2>
        <p>{serviceData.subtitle}</p>
        {serviceData.promotional && (
          <div className="service-promotional">
            {serviceData.promotional}
          </div>
        )}
      </div>

      <form className="service-form" onSubmit={handleSubmit}>
        {/* Nome e Cognome */}
        <div className="form-group">
          <label htmlFor="name">{t('service_form.name_label')} *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder={t('service_form.name_placeholder')}
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">{t('service_form.email_label')} *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder={t('service_form.email_placeholder')}
          />
        </div>

        {/* Telefono */}
        <div className="form-group">
          <label htmlFor="phone">{t('service_form.phone_label')}</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder={t('service_form.phone_placeholder')}
          />
        </div>

        {/* Azienda/Brand */}
        <div className="form-group">
          <label htmlFor="company">{t('service_form.company_label')}</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder={t('service_form.company_placeholder')}
          />
        </div>

        {/* Upload File */}
        <div className="form-group form-group-full">
          <label>{t('service_form.file_label')} ({formData.files.length}/5)</label>
          <div 
            className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.zip,.png,.jpg,.jpeg,.svg,.ai,.doc,.docx"
              disabled={formData.files.length >= 5}
              className="file-input"
            />
            <div className="file-upload-content">
              <div className="file-upload-info">
                <p>
                  {formData.files.length > 0 
                    ? tWithParams('service_form.files_selected', { count: formData.files.length })
                    : t('service_form.no_file')
                  }
                </p>
                <small>{t('service_form.file_info_note')}</small>
              </div>
              <div className="file-upload-button">
                {t('service_form.file_button')}
              </div>
            </div>
          </div>

          {/* Anteprima file */}
          {formData.files.length > 0 && (
            <div className="file-preview-grid">
              {formData.files.map((file, index) => (
                <div key={index} className="file-preview-item">
                  {file.type.startsWith('image/') ? (
                    <div className="file-preview-image">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                      />
                    </div>
                  ) : (
                    <div className="file-preview-icon">
                      {file.type.includes('pdf') ? '📄' : 
                       file.type.includes('zip') ? '📦' : '📎'}
                    </div>
                  )}
                  <div className="file-preview-info">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <button
                    type="button"
                    className="file-remove-btn"
                    onClick={() => removeFile(index)}
                    aria-label={`${t('service_form.remove_file')} ${file.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Descrizione Progetto */}
        <div className="form-group form-group-full">
          <label htmlFor="projectDescription">{t('service_form.details_label')} *</label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleInputChange}
            required
            rows="6"
            placeholder={t('service_form.details_placeholder')}
          />
        </div>

        {/* Azioni */}
        <div className="form-actions">
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary"
            disabled={status === 'submitting'}
          >
            {t('service_form.reset_button')}
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isFormValid || status === 'submitting'}
          >
            {status === 'submitting' ? t('service_form.submitting') : t('service_form.submit_button')}
          </button>
        </div>

        {/* Loading Progress Indicator */}
        {status === 'submitting' && (
          <div className="sending-progress-container">
            <div className="progress-bar-wrapper">
              <div 
                className="progress-bar-fill"
                style={{ width: `${sendingProgress.progress}%` }}
              />
            </div>
            <div className="progress-message">
              {sendingProgress.status === 'preparing' && t('service_form.progress_preparing')}
              {sendingProgress.status === 'uploading' && t('service_form.progress_uploading')}
              {sendingProgress.status === 'sending' && t('service_form.progress_sending')}
              {sendingProgress.status === 'processing' && t('service_form.progress_processing')}
              {sendingProgress.status === 'retrying' && tWithParams('service_form.progress_retrying', { attempt: sendingProgress.attempt + 1 })}
              {!sendingProgress.status && t('service_form.progress_wait')}
            </div>
            <div className="progress-spinner">
              <div className="spinner"></div>
            </div>
          </div>
        )}

        {/* Feedback Messages */}
        {status === 'success' && (
          <div className="form-message success">
            {t('service_form.success_message')}
          </div>
        )}

        {status === 'error' && (
          <div className="form-message error">
            {t('service_form.error_message')}
          </div>
        )}
      </form>
    </div>
  );
};

export default ServiceForm;