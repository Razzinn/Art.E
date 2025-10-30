import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import NavbarSectionR from './components/NavbarSectionR';
import HeroSectionR from './components/HeroSectionR';
import Offers from './components/Offers';
import Design3D from './componentisecondarisezioni/3DDesignStampa3D.jsx';
import Footer from './components/footer';
import ServiceRequestPage from './pages/ServiceRequestPageNew';
import HeroSectionR from './components/HeroSectionR';
import Offers from './components/Offers';
import ServiceRequestPage from './pages/ServiceRequestPage';
import NotFoundPage from './pages/NotFoundPage';
import Design3DPage from './componentisecondarisezioni/Design3DPage';
import AbbigliamentoPage from './componentisecondarisezioni/AbbigliamentoPage';
import WebAppDesignPage from './componentisecondarisezioni/WebAppDesignPage';
import IdeeRegalo from './componentisecondarisezioni/IdeeRegaloPage';
import './App.css';

function App() {
  const [showSubsection, setShowSubsection] = useState(null);

  const handleOpenSubsection = (subsectionId) => {
    setShowSubsection(subsectionId);
  };

  return (
    <LanguageProvider>
      <BrowserRouter>
        <NavbarSectionR />
        <Routes>
          <Route path="/" element={
            <>
              {!showSubsection && <HeroSectionR onOpenSubsection={handleOpenSubsection} />}
              {showSubsection === '3DDesignStampa3D' && <Design3D />}
              <Offers />
            </>
          } />
          <Route path="/servizi/:serviceSlug" element={<ServiceRequestPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
    <BrowserRouter>
      <NavbarSectionR />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSectionR />
            <Offers />
          </>
        } />
        <Route path="/servizi/:serviceSlug" element={<ServiceRequestPage />} />
        <Route path="/stampa-3d" element={<Design3DPage />} />
  <Route path="/abbigliamento" element={<AbbigliamentoPage />} />
  <Route path="/webapp-design" element={<WebAppDesignPage />} />
  <Route path="/idee-regalo" element={<IdeeRegalo />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;