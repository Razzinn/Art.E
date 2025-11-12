import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import ErrorBoundary from './components/ErrorBoundary';
import NavbarSectionR from './components/NavbarSectionR';
import HeroSectionR from './components/HeroSectionR';
import Offers from './components/Offers';
import Footer from './components/footer';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

// Lazy load pages for better performance
const ServiceRequestPage = lazy(() => import('./pages/ServiceRequestPageNew'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const Design3DPage = lazy(() => import('./componentisecondarisezioni/Design3DPage'));
const AbbigliamentoPage = lazy(() => import('./componentisecondarisezioni/AbbigliamentoPage'));
const WebAppDesignPage = lazy(() => import('./componentisecondarisezioni/WebAppDesignPage'));
const IdeeRegalo = lazy(() => import('./componentisecondarisezioni/IdeeRegaloPage'));

// Loading fallback component
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    fontSize: '1.2rem',
    color: '#2563EB'
  }}>
    <div>Caricamento...</div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <NavbarSectionR />
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
          <Footer />
        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;