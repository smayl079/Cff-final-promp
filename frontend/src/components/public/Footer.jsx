import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, languages } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <div className="footer-logo">
              <div className="logo-icon">🔧</div>
              <span>AutoCare</span>
            </div>
            <p className="footer-tagline">{t('footer.companyInfo')}</p>
            <div className="certifications">
              <img src="https://via.placeholder.com/80x40?text=ASE" alt="ASE Certified" />
            </div>
          </div>

          <div className="footer-column">
            <h4>{t('footer.quickLinks')}</h4>
            <ul className="footer-links">
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/services">{t('nav.services')}</Link></li>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
              <li><Link to="/booking">{t('nav.bookService')}</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{t('footer.services')}</h4>
            <ul className="footer-links">
              <li><Link to="/services">Oil Change</Link></li>
              <li><Link to="/services">Brake Repair</Link></li>
              <li><Link to="/services">Engine Diagnostics</Link></li>
              <li><Link to="/services">Transmission Service</Link></li>
              <li><Link to="/services">Tire Service</Link></li>
              <li><Link to="/services">AC Repair</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{t('footer.contactInfo')}</h4>
            <ul className="footer-contact">
              <li>
                <strong>{t('footer.address')}:</strong>
                <span>123 Auto Street, City, State 12345</span>
              </li>
              <li>
                <strong>{t('footer.phone')}:</strong>
                <a href="tel:+1234567890">(555) 123-4567</a>
              </li>
              <li>
                <strong>{t('footer.email')}:</strong>
                <a href="mailto:info@autocare.com">info@autocare.com</a>
              </li>
              <li>
                <strong>{t('footer.hours')}:</strong>
                <span>{t('footer.hoursText')}</span>
              </li>
            </ul>

            <div className="social-media">
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t('footer.copyright')}</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">{t('footer.privacy')}</Link>
            <span>|</span>
            <Link to="/terms">{t('footer.terms')}</Link>
            <span>|</span>
            <div className="footer-languages">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={currentLanguage === lang.code ? 'active' : ''}
                  onClick={() => changeLanguage(lang.code)}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
