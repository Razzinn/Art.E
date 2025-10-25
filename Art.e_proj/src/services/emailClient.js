import emailjs from '@emailjs/browser';

let isInitialized = false;

const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024; // 5 MB

const getConfig = () => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const toEmail = import.meta.env.VITE_EMAILJS_TO_EMAIL;
  const toName = import.meta.env.VITE_EMAILJS_TO_NAME;

  return { serviceId, templateId, publicKey, toEmail, toName };
};

const ensureInitialized = (publicKey) => {
  if (isInitialized) return;
  if (!publicKey) {
    throw new Error('EmailJS public key mancante. Configura VITE_EMAILJS_PUBLIC_KEY.');
  }

  emailjs.init({ publicKey });
  isInitialized = true;
};

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      resolve(result);
    };
    reader.onerror = () => reject(new Error('Impossibile leggere il file allegato.'));
    reader.readAsDataURL(file);
  });

export async function sendServiceFormEmail({ service, formData }) {
  const { serviceId, templateId, publicKey, toEmail, toName } = getConfig();

  // Debug: log configuration status
  console.log('📧 EmailJS Configuration:', {
    serviceId: serviceId ? '✓ Present' : '✗ Missing',
    templateId: templateId ? '✓ Present' : '✗ Missing',
    publicKey: publicKey ? '✓ Present' : '✗ Missing',
    toEmail: toEmail || 'Not set (will use template default)',
    toName: toName || 'Not set'
  });

  if (!serviceId || !templateId) {
    throw new Error('Configura VITE_EMAILJS_SERVICE_ID e VITE_EMAILJS_TEMPLATE_ID per abilitare l\'invio email.');
  }

  if (!publicKey) {
    throw new Error('Configura VITE_EMAILJS_PUBLIC_KEY per autenticare la richiesta.');
  }

  ensureInitialized(publicKey);

  const templateParams = {
    service_id: service?.id || 'non-specificato',
    service_title: service?.title || 'Servizio non specificato',
    service_subtitle: service?.subtitle || '',
    requester_name: formData.name || 'Non fornito',
    requester_email: formData.email || 'non-fornita@example.com',
    requester_phone: formData.phone || 'Non fornito',
    requester_company: formData.company || 'Non specificato',
    project_budget: formData.budget || 'Non indicato',
    project_details: formData.details || 'Nessun dettaglio fornito',
    file_name: formData.file?.name || 'Nessun file allegato',
    reply_to: formData.email || 'noreply@example.com',
    from_name: formData.name || 'Utente Anonimo',
    from_email: formData.email || 'noreply@example.com',
  };

  if (toEmail) {
    templateParams.to_email = toEmail;
  }

  if (toName) {
    templateParams.to_name = toName;
  }

  if (formData.file) {
    if (formData.file.size > MAX_ATTACHMENT_SIZE) {
      throw new Error('Il file allegato supera i 5 MB. Comprimi il file e riprova.');
    }

    templateParams.file_attachment = await fileToBase64(formData.file);
  }

  console.log('📤 Sending email with params:', {
    service_id: service.id,
    requester: formData.name,
    email: formData.email
  });

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);

    console.log('✅ EmailJS Response:', response);

    if (response?.status !== 200) {
      throw new Error(`Invio email non riuscito (status: ${response?.status ?? 'sconosciuto'}).`);
    }

    return response;
  } catch (error) {
    const errorMessage = error?.text || error?.message || 'Errore sconosciuto durante l\'invio email.';
    console.error('❌ EmailJS send failed:', {
      error,
      message: errorMessage,
      serviceId,
      templateId
    });
    throw new Error(`Impossibile inviare la richiesta: ${errorMessage}`);
  }
}
