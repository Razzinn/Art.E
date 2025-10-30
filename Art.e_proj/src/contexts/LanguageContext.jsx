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
  // Lingua di default: inglese
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Carica le traduzioni per la lingua corrente
  const loadTranslations = async (langCode) => {
    try {
      setIsLoading(true);
      // Importa dinamicamente il file di traduzione
      const translationModule = await import(`../translations/${langCode}.json`);
      setTranslations(translationModule.default);
    } catch (error) {
      console.warn(`Traduzioni non trovate per ${langCode}, utilizzo inglese`);
      // Fallback all'inglese se la lingua non è disponibile
      if (langCode !== 'en') {
        const fallbackModule = await import(`../translations/en.json`);
        setTranslations(fallbackModule.default);
      }
    } finally {
      setIsLoading(false);
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
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback;
      }
    }
    
    return typeof value === 'string' ? value : fallback;
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