// NavbarSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import './NavbarSectionR.css';

const NavbarSectionR = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount] = useState(3);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = {
    'Prodotti': [
      'Stampa 3D',
      'Prototipi Rapidi',
      'Miniature Personalizzate',
      'Gadget Aziendali',
      'Oggetti Decorativi',
      'Tutti i Prodotti 3D'
    ],
    'Abbigliamento': [
      'Felpe personalizzate',
      'Cappellini personalizzati',
      'Polo personalizzate',
      'Merchandising',
      'Tutti i Prodotti'
    ],
    'Servizi Digital': [
      'Creazione Siti Web',
      'Creazione App Intuitive',
      'E-commerce',
      'Restyling Logo',
      'Brand Identity',
      'Social Media Marketing',
      'Graphic Design',
      'Consulenza Digital'
    ]
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    setIsSuggestOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Rimosso l'autofocus per evitare il bordo fisso sul primo elemento

  const handleCategoryClick = (mainCategory, subCategory) => {
    console.log('Selected category:', mainCategory, '-', subCategory);
    setSelectedCategory(subCategory);
    setIsDropdownOpen(false);
    // Qui puoi aggiungere la logica per gestire la selezione della categoria
  };

  // Suggerimenti di ricerca basati sulle categorie
  useEffect(() => {
    const term = (searchTerm || '').trim().toLowerCase();
    if (!term) {
      setSearchSuggestions([]);
      setIsSuggestOpen(false);
      return;
    }

    const results = [];
    Object.entries(categories).forEach(([mainCategory, subCategories]) => {
      subCategories.forEach((subCategory) => {
        const sub = String(subCategory);
        if (sub.toLowerCase().includes(term)) {
          results.push({ mainCategory, subCategory: sub });
        }
      });
    });

    setSearchSuggestions(results.slice(0, 8));
    setIsSuggestOpen(results.length > 0);
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion) => {
    setSelectedCategory(suggestion.subCategory);
    setSearchTerm('');
    setIsSuggestOpen(false);
    console.log('Selected from search:', suggestion.mainCategory, '-', suggestion.subCategory);
  };

  // Chiude il dropdown quando si clicca fuori o si preme ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="navbar" role="navigation" aria-label="Navigazione principale">
      <div className="navbar-container">
        {/* Logo */}
        <a href="/" className="logo" aria-label="CREO - Torna alla homepage">
          <span aria-hidden="true">CREO😊</span>
          <span className="sr-only">CREO Marketplace</span>
        </a>

        {/* Categories */}
        <div className="categories" ref={dropdownRef}>
          <span className="categories-label" id="categories-label">Categorie</span>
          <div className="categories-dropdown">
            <button 
              className={`dropdown-btn ${isDropdownOpen ? 'active' : ''}`} 
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              aria-labelledby="categories-label"
              aria-controls="categories-menu"
            >
              {selectedCategory || 'Tutte le Categorie'}
              <span className={`dropdown-arrow ${isDropdownOpen ? 'rotated' : ''}`} aria-hidden="true"></span>
            </button>
            
            {isDropdownOpen && (
              <div 
                className="dropdown-menu" 
                id="categories-menu"
                role="menu"
                aria-labelledby="categories-label"
              >
                {Object.entries(categories).map(([mainCategory, subCategories]) => (
                  <div key={mainCategory} className="dropdown-section">
                    <h3 className="dropdown-section-title">{mainCategory}</h3>
                    <div className="dropdown-section-items" role="group" aria-label={mainCategory}>
                      {subCategories.map((subCategory) => (
                        <button
                          key={subCategory}
                          className="dropdown-item"
                          onClick={() => handleCategoryClick(mainCategory, subCategory)}
                          role="menuitem"
                          tabIndex={0}
                        >
                          {subCategory}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <form className="search-form" onSubmit={handleSearchSubmit} role="search">
            <label htmlFor="search-input" className="sr-only">Cerca prodotti</label>
            <input 
              id="search-input"
              type="search" 
              className="search-input" 
              placeholder="Cerca su Creo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Cerca prodotti nel marketplace"
              autoComplete="off"
              onFocus={() => { if (searchSuggestions.length > 0) setIsSuggestOpen(true); }}
            />
            <button type="submit" className="search-btn" aria-label="Esegui ricerca">
              <span aria-hidden="true">🔍</span>
              <span className="sr-only">Cerca</span>
            </button>
          </form>
          {isSuggestOpen && searchSuggestions.length > 0 && (
            <div className="search-suggestions" role="listbox" aria-label="Suggerimenti di ricerca">
              {searchSuggestions.map((s) => (
                <button
                  key={`${s.mainCategory}-${s.subCategory}`}
                  type="button"
                  className="search-suggestion-item"
                  role="option"
                  onClick={() => handleSuggestionClick(s)}
                >
                  <span className="suggest-main">{s.mainCategory}</span>
                  <span className="suggest-sep">·</span>
                  <span className="suggest-sub">{s.subCategory}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Carrello rimosso */}
      </div>
    </nav>
  );
};

export default NavbarSectionR;