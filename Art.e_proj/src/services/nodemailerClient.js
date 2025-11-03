// Servizio per l'invio email tramite backend Nodemailer
const API_BASE_URL = 'http://localhost:3002';

export async function sendServiceFormEmail({ service, formData }) {
  try {
    console.log('📧 [NodemailerService] Invio richiesta a backend...');
    console.log('Service:', service);
    console.log('FormData:', formData);

    // Crea FormData per il multipart/form-data
    const form = new FormData();
    
    // Aggiungi i campi del form
    form.append('name', formData.name || '');
    form.append('email', formData.email || '');
    form.append('phone', formData.phone || '');
    form.append('company', formData.company || '');
    form.append('details', formData.details || '');
    form.append('service', JSON.stringify(service));

    // Aggiungi i file
    if (formData.files && formData.files.length > 0) {
      formData.files.forEach((file) => {
        form.append('files', file);
      });
    }

    // Invio al backend
    const response = await fetch(`${API_BASE_URL}/api/send-email`, {
      method: 'POST',
      body: form
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `HTTP error! status: ${response.status}`);
    }

    console.log('✅ [NodemailerService] Email inviata con successo:', result);
    return result;

  } catch (error) {
    console.error('❌ [NodemailerService] Errore:', error);
    throw new Error(`Impossibile inviare la richiesta: ${error.message}`);
  }
}

// Health check del backend
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    const result = await response.json();
    return response.ok && result.status === 'OK';
  } catch (error) {
    console.error('❌ Backend non raggiungibile:', error);
    return false;
  }
}