import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';
import './About.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="about section">
      <div className="container">
        <div className="about-content">
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800" 
              alt="Professional mechanics at work"
            />
          </div>

          <div className="about-text">
            <p className="pre-title">{t('about.preTitle')}</p>
            <h2>{t('about.title')}</h2>
            <p>{t('about.description')}</p>
            
            <p>
              We pride ourselves on delivering exceptional service with honesty and integrity.
              Our team of certified mechanics uses the latest diagnostic equipment to ensure
              your vehicle receives the best care possible.
            </p>

            <ul className="features-list">
              <li>
                <CheckCircle size={24} className="check-icon" />
                <span>{t('about.certified')}</span>
              </li>
              <li>
                <CheckCircle size={24} className="check-icon" />
                <span>{t('about.equipment')}</span>
              </li>
              <li>
                <CheckCircle size={24} className="check-icon" />
                <span>{t('about.warranty')}</span>
              </li>
              <li>
                <CheckCircle size={24} className="check-icon" />
                <span>{t('about.pricing')}</span>
              </li>
            </ul>

            <div className="about-buttons">
              <button className="btn btn-primary">{t('about.meetTeam')}</button>
              <button className="btn btn-outline">{t('about.readReviews')} →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
