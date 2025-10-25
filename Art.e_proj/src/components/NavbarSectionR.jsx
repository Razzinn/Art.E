// NavbarSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavbarSectionR.css';

const MENU_ITEMS = [
  { label: '3D Design & Stampa 3D', route: '/stampa-3d' },
  { label: 'Abbigliamento Personalizzato', route: '/abbigliamento' },
  { label: 'Web & App Design', route: '/webapp-design' },
  { label: 'Idee Regalo', route: '/idee-regalo' },
];

// Mappa delle rotte principali
const CATEGORY_ROUTES = {
  'Prodotti': '/stampa-3d',
  'Abbigliamento': '/abbigliamento',
  'Servizi Digital': '/webapp-design',
  'Idee Regalo': '/idee-regalo',
};

const NavbarSectionR = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSuggestOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Suggerimenti di ricerca basati sulle categorie
  useEffect(() => {
    const term = (searchTerm || '').trim().toLowerCase();
    if (!term) {
      setSearchSuggestions([]);
      setIsSuggestOpen(false);
      return;
    }

    const results = MENU_ITEMS.filter(item => 
      item.label.toLowerCase().includes(term)
    ).slice(0, 8);

    setSearchSuggestions(results);
    setIsSuggestOpen(results.length > 0);
  }, [searchTerm]);

  const handleSuggestionClick = (suggestion) => {
    setSelectedCategory(suggestion.label);
    setSearchTerm('');
    setIsSuggestOpen(false);
    navigate(suggestion.route);
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
        <Link to="/" className="logo" aria-label="CREO - Torna alla homepage">
          <span aria-hidden="true" className="logo-inner">
            <span className="logo-text">CREO</span>
            <span className="ink-particles" aria-hidden="true"></span>
            <span className="logo-emoji">😉</span>
          </span>
          <span className="sr-only">CREO Marketplace</span>
        </Link>

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
                className="dropdown-menu single-column" 
                id="categories-menu"
                role="menu"
                aria-labelledby="categories-label"
              >
                <div className="menu-items">
                  {MENU_ITEMS.map((item) => (
                    <button
                      key={item.label}
                      className="menu-item"
                      onClick={() => {
                        setSelectedCategory(item.label);
                        setIsDropdownOpen(false);
                        navigate(item.route);
                      }}
                      role="menuitem"
                      tabIndex={0}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
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