import React from 'react';
import { useTranslation } from 'react-i18next';
import { Wrench, Droplet, CircleDot, Zap, Gauge, Wind, Battery, Settings, Car } from 'lucide-react';
import './Services.css';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    { icon: <Droplet size={48} />, name: 'Oil Change & Filter', price: '$49' },
    { icon: <CircleDot size={48} />, name: 'Brake Repair', price: '$149' },
    { icon: <Zap size={48} />, name: 'Engine Diagnostics', price: '$89' },
    { icon: <Gauge size={48} />, name: 'Transmission Service', price: '$199' },
    { icon: <Car size={48} />, name: 'Tire Service', price: '$79' },
    { icon: <Wind size={48} />, name: 'AC Repair', price: '$129' },
    { icon: <Battery size={48} />, name: 'Battery Service', price: '$59' },
    { icon: <Settings size={48} />, name: 'General Maintenance', price: '$99' },
    { icon: <Wrench size={48} />, name: 'Electrical System', price: '$119' }
  ];

  return (
    <section className="services section">
      <div className="container">
        <div className="section-header">
          <p className="pre-title">{t('services.preTitle')}</p>
          <h2>{t('services.title')}</h2>
          <p className="section-description">{t('services.description')}</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-name">{service.name}</h3>
              <p className="service-description">
                Professional {service.name.toLowerCase()} service with expert technicians
              </p>
              <div className="service-price">
                <span className="price-label">{t('services.from')}</span>
                <span className="price-value">{service.price}</span>
              </div>
              <button className="service-link">
                {t('services.learnMore')} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
