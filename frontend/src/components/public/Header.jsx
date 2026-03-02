import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import './Header.css';

const Header = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">🔧</div>
            <span className="logo-text">AutoCare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <Link to="/" className="nav-link">{t('nav.home')}</Link>
            <Link to="/services" className="nav-link">{t('nav.services')}</Link>
            <Link to="/about" className="nav-link">{t('nav.about')}</Link>
            <Link to="/contact" className="nav-link">{t('nav.contact')}</Link>
          </nav>

          {/* Right Section */}
          <div className="header-right">
            {/* Language Switcher */}
            <div className="language-switcher">
              <button 
                className="lang-btn"
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                <Globe size={20} />
                <span>{currentLanguage.toUpperCase()}</span>
              </button>
              {isLangOpen && (
                <div className="lang-dropdown">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`lang-option ${currentLanguage === lang.code ? 'active' : ''}`}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Book Service Button */}
            <Link to="/booking" className="btn btn-primary">
              {t('nav.bookService')}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="nav-mobile">
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              {t('nav.home')}
            </Link>
            <Link to="/services" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              {t('nav.services')}
            </Link>
            <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              {t('nav.about')}
            </Link>
            <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              {t('nav.contact')}
            </Link>
            <Link to="/booking" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>
              {t('nav.bookService')}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
