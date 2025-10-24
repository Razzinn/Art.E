import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarSectionR from './components/NavbarSectionR';
import Footer from './components/footer';
// import HomePage from './pages/HomePage';
import ServiceRequestPage from './pages/ServiceRequestPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';
import HeroSectionR from './components/HeroSectionR';
import Offers from './components/Offers';

function App() {
  return (
    <BrowserRouter>
      <NavbarSectionR />
      <HeroSectionR />
      <Offers />
      <Routes>
        {/*<Route path="/" element={<HomePage />} /> */}
        <Route path="/servizi/:serviceSlug" element={<ServiceRequestPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;