import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarSectionR from './components/NavbarSectionR';
import Footer from './components/footer';
import HeroSectionR from './components/HeroSectionR';
import Offers from './components/Offers';
import ServiceRequestPage from './pages/ServiceRequestPage';
import NotFoundPage from './pages/NotFoundPage';
import Design3DPage from './componentisecondarisezioni/Design3DPage';
import './App.css';

function App() {
  return (
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;