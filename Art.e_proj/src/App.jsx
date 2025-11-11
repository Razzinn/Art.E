import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import NavbarSectionR from './components/NavbarSectionR';
import HeroSectionR from './components/HeroSectionR';
import Offers from './components/Offers';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';
import ServiceRequestPage from './pages/ServiceRequestPageNew';
import NotFoundPage from './pages/NotFoundPage';
import Design3DPage from './componentisecondarisezioni/Design3DPage';
import AbbigliamentoPage from './componentisecondarisezioni/AbbigliamentoPage';
import WebAppDesignPage from './componentisecondarisezioni/WebAppDesignPage';
import IdeeRegalo from './componentisecondarisezioni/IdeeRegaloPage';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
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
    </LanguageProvider>
  );
}

export default App;