import React, { createContext, useContext, useState, useEffect } from 'react';

// Lingue disponibili con le relative icone bandiera
export const LANGUAGES = {
  en: { 
    code: 'en', 
    name: 'English', 
    flag: '🇬🇧',
    nativeName: 'English'
  },
  sr: { 
    code: 'sr', 
    name: 'Serbian', 
    flag: '🇷🇸',
    nativeName: 'Српски'
  },
  it: { 
    code: 'it', 
    name: 'Italian', 
    flag: '🇮🇹',
    nativeName: 'Italiano'
  },
  de: { 
    code: 'de', 
    name: 'German', 
    flag: '🇩🇪',
    nativeName: 'Deutsch'
  },
  fr: { 
    code: 'fr', 
    name: 'French', 
    flag: '🇫🇷',
    nativeName: 'Français'
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Lingua di default: serbo
  const [currentLanguage, setCurrentLanguage] = useState('sr');
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Carica le traduzioni per la lingua corrente
  const loadTranslations = async (langCode) => {
    try {
      setIsLoading(true);
      console.log(`🔄 Loading translations for: ${langCode}`);
      
      // Importa dinamicamente il file di traduzione
      const translationModule = await import(`../translations/${langCode}.json`);
      const translations = translationModule?.default || translationModule;
      
      console.log(`✅ Translations loaded for ${langCode}:`, translations);
      setTranslations(translations);
    } catch (error) {
      console.error(`❌ Error loading translations for ${langCode}:`, error);
      console.warn(`Fallback to English...`);
      
      // Fallback all'inglese se la lingua non è disponibile
      if (langCode !== 'en') {
        const fallbackModule = await import(`../translations/en.json`);
        const fallbackTranslations = fallbackModule?.default || fallbackModule;
        console.log('📝 Fallback translations loaded:', fallbackTranslations);
        setTranslations(fallbackTranslations);
      }
    } finally {
      setIsLoading(false);
      console.log(`🏁 Loading completed for ${langCode}`);
    }
  };

  // Carica le traduzioni quando la lingua cambia
  useEffect(() => {
    loadTranslations(currentLanguage);
  }, [currentLanguage]);

  // Carica la lingua salvata dal localStorage al mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && LANGUAGES[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Salva la lingua nel localStorage quando cambia
  useEffect(() => {
    localStorage.setItem('selectedLanguage', currentLanguage);
  }, [currentLanguage]);

  // Funzione per cambiare lingua
  const changeLanguage = (langCode) => {
    if (LANGUAGES[langCode]) {
      setCurrentLanguage(langCode);
    }
  };

  // Funzione per ottenere una traduzione
  const t = (key, fallback = key) => {
    // Controllo di sicurezza per valori undefined/null
    if (!key || typeof key !== 'string') {
      return fallback || '';
    }
    
    // Se stiamo ancora caricando o non abbiamo traduzioni, restituisci fallback
    if (isLoading || !translations || Object.keys(translations).length === 0) {
      return fallback;
    }
    
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback;
      }
    }
    
    // IMPORTANTE: Assicuriamoci che il valore finale sia una stringa
    if (typeof value === 'string') {
      return value;
    } else if (typeof value === 'object') {
      console.warn(`⚠️ Translation key "${key}" points to an object, not a string:`, value);
      return fallback;
    } else {
      return String(value) || fallback;
    }
  };

  // Funzione per ottenere traduzioni con parametri
  const tWithParams = (key, params = {}, fallback = key) => {
    let translation = t(key, fallback);
    
    // Sostituisce i parametri nella traduzione
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{{${param}}}`, params[param]);
    });
    
    return translation;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    tWithParams,
    languages: LANGUAGES,
    isLoading,
    currentLanguageInfo: LANGUAGES[currentLanguage]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizzato per usare il context
export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation deve essere usato all\'interno di LanguageProvider');
  }
  return context;
};

export default LanguageContext;