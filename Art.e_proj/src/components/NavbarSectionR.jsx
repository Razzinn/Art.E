// NavbarSection.jsx
import React, { useState } from 'react';
import './NavbarSectionR.css';

const NavbarSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount, setCartCount] = useState(3);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Aggiungere in seguito qui la logica di ricerca
  };

  const handleCategoryClick = () => {
    // Logica per aprire il dropdown delle categorie
    console.log('Category dropdown clicked');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <a href="#" className="logo">CRE😊</a>

        {/* Categories */}
        <div className="categories">
          <span className="categories-label">Categorie</span>
          <div className="categories-dropdown">
            <button className="dropdown-btn" onClick={handleCategoryClick}>
              All
              <span className="dropdown-arrow"></span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Cerca su Creo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">Cerca</button>
          </form>
        </div>

        {/* Cart */}
        <a href="#" className="cart-link">
          🛒
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </a>
      </div>
    </nav>
  );
};

export default NavbarSection;