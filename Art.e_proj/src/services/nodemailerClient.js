// Servizio ottimizzato per l'invio email tramite backend Nodemailer
const API_BASE_URL = 'http://localhost:3002';
const REQUEST_TIMEOUT = 30000; // 30 secondi timeout
const MAX_RETRIES = 2;

/**
 * Fetch con timeout per evitare attese infinite
 */
const fetchWithTimeout = (url, options = {}, timeout = REQUEST_TIMEOUT) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
};

/**
 * Invio email ottimizzato con retry logic e progress callback
 */
export async function sendServiceFormEmail({ service, formData, onProgress }) {
  let lastError = null;
  
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        onProgress?.({ status: 'retrying', attempt });
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
      }
      
      onProgress?.({ status: 'preparing', progress: 10 });
      
      // Crea FormData per il multipart/form-data
      const form = new FormData();
      
      // Aggiungi i campi del form (ottimizzato)
      const fields = {
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone || '',
        company: formData.company || '',
        details: formData.details || '',
        service: JSON.stringify(service)
      };
      
      Object.entries(fields).forEach(([key, value]) => form.append(key, value));
      
      onProgress?.({ status: 'uploading', progress: 30 });
      
      // Aggiungi i file
      if (formData.files?.length > 0) {
        formData.files.forEach(file => form.append('files', file));
      }
      
      onProgress?.({ status: 'sending', progress: 50 });
      
      // Invio al backend con timeout
      const response = await fetchWithTimeout(
        `${API_BASE_URL}/api/send-email`,
        {
          method: 'POST',
          body: form,
          // Aggiungi header per il keep-alive
          keepalive: true
        },
        REQUEST_TIMEOUT
      );
      
      onProgress?.({ status: 'processing', progress: 80 });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }
      
      onProgress?.({ status: 'success', progress: 100 });
      return result;
      
    } catch (error) {
      lastError = error;
      if (attempt === MAX_RETRIES) {
        onProgress?.({ status: 'error', error: error.message });
        throw new Error(`Impossibile inviare la richiesta dopo ${MAX_RETRIES + 1} tentativi: ${error.message}`);
      }
    }
  }
  
  throw lastError;
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