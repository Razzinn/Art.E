import React from 'react';
import NavbarSectionR from './components/NavbarSectionR';
import Footer from './components/footer';
import HeroSectionR from './components/HeroSectionR';
import './App.css';
import Design3D from './componentisecondarisezioni/3DDesignStampa3D.jsx';


function App() {
  const [showSubsection, setShowSubsection] = React.useState(null);

  const handleOpenSubsection = (sub) => {
    setShowSubsection(sub);
  };

  return (
    <>
      <NavbarSectionR />
      {!showSubsection && <HeroSectionR onOpenSubsection={handleOpenSubsection} />}
      {showSubsection === '3DDesignStampa3D' && <Design3D />}
      <Footer />
    </>
  );
}

export default App;