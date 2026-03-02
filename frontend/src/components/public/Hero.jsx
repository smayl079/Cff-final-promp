import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, Search } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">{t('hero.title')}</h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          
          <div className="hero-buttons">
            <Link to="/booking" className="btn btn-primary">
              <Calendar size={20} />
              {t('hero.bookNow')}
            </Link>
            <Link to="/services" className="btn btn-secondary">
              <Search size={20} />
              {t('hero.browseServices')}
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">2000+</div>
              <div className="stat-label">{t('hero.vehiclesServiced')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">{t('hero.customerSatisfaction')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">{t('hero.support')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
