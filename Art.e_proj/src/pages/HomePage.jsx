import { useState } from 'react';
import HeroSectionR from '../components/HeroSectionR';
import Offers from '../components/Offers';
import Design3D from '../componentisecondarisezioni/3DDesignStampa3D.jsx';

export default function HomePage() {
  const [showSubsection, setShowSubsection] = useState(null);

  const handleOpenSubsection = (subsectionId) => {
    setShowSubsection(subsectionId);
  };

  return (
    <>
      {!showSubsection && <HeroSectionR onOpenSubsection={handleOpenSubsection} />}
      {showSubsection === '3DDesignStampa3D' && <Design3D />}
      <Offers />
    </>
  );
}
