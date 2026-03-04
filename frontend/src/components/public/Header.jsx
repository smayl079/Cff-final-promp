import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { Menu, X, Globe, LogIn, LogOut, User, Wrench } from 'lucide-react';
import './Header.css';

const Header = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const { showSuccess } = useNotification();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      showSuccess(t('auth.logoutSuccess'));
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon"><Wrench size={24} color="var(--color-primary)" /></div>
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

            {/* Auth Button */}
            {isAuthenticated ? (
              <div className="auth-section">
                <span className="user-name">{user?.firstName || user?.email}</span>
                <button onClick={handleLogout} className="btn btn-outline">
                  <LogOut size={18} />
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline">
                <LogIn size={18} />
                {t('nav.login')}
              </Link>
            )}

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
            {isAuthenticated ? (
              <>
                <div className="mobile-user-info">
                  <User size={18} />
                  <span>{user?.firstName || user?.email}</span>
                </div>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }} 
                  className="btn btn-outline"
                >
                  <LogOut size={18} />
                  {t('nav.logout')}
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-outline" onClick={() => setIsMenuOpen(false)}>
                <LogIn size={18} />
                {t('nav.login')}
              </Link>
            )}
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
