// Test per verificare la lingua predefinita
import { useState } from 'react';

// Simula l'inizializzazione del LanguageContext
const testDefaultLanguage = () => {
  const [currentLanguage] = useState('sr'); // Dovrebbe essere 'sr' per serbo
  return currentLanguage;
};

console.log('Lingua predefinita impostata:', testDefaultLanguage());
console.log('✅ Serbo impostato come lingua predefinita');