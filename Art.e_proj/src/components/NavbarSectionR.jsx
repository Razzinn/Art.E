// NavbarSection.jsx
import React, { useState, useRef, useEffect } from 'react';
import './NavbarSectionR.css';

const NavbarSectionR = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount] = useState(3);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = {
    'Prodotti': [
      'Stampa 3D',
      'Prototipi Rapidi',
      'Miniature Personalizzate',
      'Gadget Aziendali',
      'Oggetti Decorativi',
      'Spare Parts',
      'Prodotti Industriali',
      'Tutti i Prodotti 3D'
    ],
    'Abbigliamento': [
      'T-shirt Personalizzate',
      'Felpe Custom',
      'Cappellini Ricamati',
      'Polo Aziendali',
      'Magliette Eventi',
      'Abbigliamento Sport',
      'Merchandising',
      'Catalogo Tessile'
    ],
    'Servizi Digital': [
      'Creazione Siti Web',
      'E-commerce',
      'Restyling Logo',
      'Brand Identity',
      'Social Media Marketing',
      'SEO & SEM',
      'Graphic Design',
      'Consulenza Digital'
    ]
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Aggiungere in seguito qui la logica di ricerca
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Focus management per dropdown
  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      const firstMenuItem = dropdownRef.current.querySelector('.dropdown-item');
      if (firstMenuItem) {
        firstMenuItem.focus();
      }
    }
  }, [isDropdownOpen]);

  const handleCategoryClick = (mainCategory, subCategory) => {
    console.log('Selected category:', mainCategory, '-', subCategory);
    setIsDropdownOpen(false);
    // Qui puoi aggiungere la logica per gestire la selezione della categoria
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
              Tutte le Categorie
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
            />
            <button type="submit" className="search-btn" aria-label="Esegui ricerca">
              <span aria-hidden="true">🔍</span>
              <span className="sr-only">Cerca</span>
            </button>
          </form>
        </div>

        {/* Cart */}
        <a href="/cart" className="cart-link" aria-label={`Carrello con ${cartCount} articoli`}>
          <span aria-hidden="true">🛒</span>
          <span className="sr-only">Carrello</span>
          {cartCount > 0 && (
            <span className="cart-count" aria-label={`${cartCount} articoli nel carrello`}>
              {cartCount}
            </span>
          )}
        </a>
      </div>
    </nav>
  );
};

export default NavbarSectionR;