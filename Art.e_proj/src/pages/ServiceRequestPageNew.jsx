import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getServiceBySlug } from '../data/serviceSections';
import { useTranslation } from '../contexts/LanguageContext';
import ServiceForm from '../components/ServiceForm';

const ServiceRequestPage = () => {
  const { serviceSlug } = useParams();
  const { t } = useTranslation();
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return (
      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '80px 20px', 
        textAlign: 'center', 
        maxWidth: '600px', 
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h2 style={{ 
          background: 'linear-gradient(135deg, #f87171, #ef4444)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '20px',
          fontSize: '2.5rem',
          fontWeight: '700'
        }}>
          {t('service_form.not_found_title')}
        </h2>
        <p style={{ 
          marginBottom: '30px', 
          color: '#94a3b8',
          fontSize: '1.1rem'
        }}>
          {t('service_form.not_found_description')}
        </p>
        <Link 
          to="/" 
          style={{
            display: 'inline-block',
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #2563EB, #60a5fa)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 32px rgba(37, 99, 235, 0.3)'
          }}
        >
          {t('service_form.back_to_home')}
        </Link>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      paddingTop: '80px' 
    }}>
      {/* Breadcrumbs */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px 20px' }}>
        <nav style={{ fontSize: '14px', color: '#94a3b8' }}>
          <Link to="/" style={{ 
            color: '#60a5fa', 
            textDecoration: 'none',
            transition: 'color 0.3s ease'
          }}>
            {t('common.home')}
          </Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: '#e2e8f0' }}>{t(service.titleKey)}</span>
        </nav>
      </div>

      <ServiceForm 
        serviceType={service.slug} 
        serviceTitle={t(service.titleKey)} 
      />
    </div>
  );
};

export default ServiceRequestPage;