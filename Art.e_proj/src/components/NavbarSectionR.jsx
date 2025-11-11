// NavbarSection.jsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import './NavbarSectionR.css';

// Main categories for dropdown - matching Hero sections
const MAIN_CATEGORIES = [
  {
    label: 'Design & 3D Prints',
    route: '/stampa-3d'
  },
  {
    label: 'Abbigliamento Personalizzato',
    route: '/abbigliamento'
  },
  {
    label: 'Web & App Design',
    route: '/webapp-design'
  },
  {
    label: 'Idee Regalo',
    route: '/idee-regalo'
  }
];

const NavbarSectionR = () => {
  const { t, isLoading } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Main categories for dropdown - using translations
  const MAIN_CATEGORIES = useMemo(() => [
    {
      label: t('navigation.categories.design_3d'),
      route: '/stampa-3d'
    },
    {
      label: t('navigation.categories.apparel'),
      route: '/abbigliamento'
    },
    {
      label: t('navigation.categories.web_app'),
      route: '/webapp-design'
    },
    {
      label: t('navigation.categories.gift_ideas'),
      route: '/idee-regalo'
    }
  ], [t]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSuggestOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const term = (searchTerm || '').trim().toLowerCase();
    if (!term) {
      setSearchSuggestions([]);
      setIsSuggestOpen(false);
      return;
    }

    const results = MAIN_CATEGORIES.filter(item => 
      item.label.toLowerCase().includes(term)
    ).slice(0, 8);

    setSearchSuggestions(results);
    setIsSuggestOpen(results.length > 0);
  }, [searchTerm, MAIN_CATEGORIES]);

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
    <nav className="navbar" role="navigation" aria-label={t('navigation.main_navigation')}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo" aria-label={t('navigation.logo_aria_label')}>
          <span aria-hidden="true" className="logo-inner">
            <span className="logo-text">CREO</span>
            <span className="ink-particles" aria-hidden="true"></span>
            <span className="logo-emoji">😉</span>
          </span>
          <span className="sr-only">{t('navigation.logo_text')}</span>
        </Link>

        {/* Categories */}
        <div className="categories" ref={dropdownRef}>
          <span className="categories-label" id="categories-label">{t('navigation.categories_label')}</span>
          <div className="categories-dropdown">
            <button 
              className={`dropdown-btn ${isDropdownOpen ? 'active' : ''}`} 
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              aria-labelledby="categories-label"
              aria-controls="categories-menu"
            >
              {selectedCategory || t('navigation.all_categories')}
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
                  {MAIN_CATEGORIES.map((item) => (
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
            <label htmlFor="search-input" className="sr-only">{t('navigation.search_label')}</label>
            <input 
              id="search-input"
              type="search" 
              className="search-input" 
              placeholder={t('navigation.search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label={t('navigation.search_aria_label')}
              autoComplete="off"
              onFocus={() => { if (searchSuggestions.length > 0) setIsSuggestOpen(true); }}
            />
            <button type="submit" className="search-btn" aria-label={t('navigation.search_button_aria_label')}>
              <span aria-hidden="true">🔍</span>
              <span className="sr-only">{t('navigation.search_button_text')}</span>
            </button>
          </form>
          {isSuggestOpen && searchSuggestions.length > 0 && (
            <div className="search-suggestions" role="listbox" aria-label={t('navigation.search_suggestions_aria_label')}>
              {searchSuggestions.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  className="search-suggestion-item"
                  role="option"
                  onClick={() => handleSuggestionClick(s)}
                >
                  <span className="suggest-main">{s.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Carrello rimosso */}
      </div>
    </nav>
  );
};

export default NavbarSectionR;