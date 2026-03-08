import React from 'react';
import { Settings, Droplet, CircleDot, Car, Battery, Zap } from 'lucide-react';
import './Services.css';

const Services = () => {
  const services = [
    { 
      icon: <Settings size={32} color="#007bff" />, 
      title: 'Engine Repair', 
      description: 'Expert diagnostics and repair for all types of engine issues to keep your car running smoothly.' 
    },
    { 
      icon: <Droplet size={32} color="#007bff" />, 
      title: 'Oil Change', 
      description: 'Quick and clean oil change services using premium oils for optimal engine performance.' 
    },
    { 
      icon: <CircleDot size={32} color="#007bff" />, 
      title: 'Brake Service', 
      description: 'Comprehensive brake inspections, pad replacements, and rotor resurfacing for your safety.' 
    },
    { 
      icon: <Car size={32} color="#007bff" />, 
      title: 'Tire Replacement', 
      description: 'High-quality tire rotation, balancing, and replacement to ensure a safe and smooth ride.' 
    },
    { 
      icon: <Battery size={32} color="#007bff" />, 
      title: 'Battery Check', 
      description: 'Reliable battery testing, cleaning, and replacement to prevent unexpected breakdowns.' 
    },
    { 
      icon: <Zap size={32} color="#007bff" />, 
      title: 'Car Diagnostics', 
      description: 'State-of-the-art computer diagnostics to accurately pinpoint and resolve any vehicular issues.' 
    }
  ];

  return (
    <section className="services-section" style={{ backgroundColor: '#f8f9fa', padding: '80px 20px', minHeight: '600px' }}>
      <div className="services-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="services-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '36px', color: '#2b2b2b', marginBottom: '15px' }}>Our Services</h2>
          <p style={{ fontSize: '16px', color: '#6c757d' }}>We provide reliable and fast car repair and maintenance services</p>
        </div>

        {/* Fallback layout to guarantee visibility in case CSS fails to load */}
        <div 
          className="services-grid" 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '30px', 
            justifyContent: 'center',
            width: '100%' 
          }}
        >
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '35px 25px',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '350px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid #e0e0e0'
              }}
            >
              <div 
                className="service-icon-wrapper"
                style={{
                  width: '70px',
                  height: '70px',
                  backgroundColor: '#e6f0fa',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}
              >
                {service.icon}
              </div>
              <h3 className="service-title" style={{ fontSize: '20px', color: '#333', marginBottom: '12px' }}>
                {service.title}
              </h3>
              <p className="service-description" style={{ fontSize: '15px', color: '#666', lineHeight: '1.6', marginBottom: '25px', flexGrow: 1 }}>
                {service.description}
              </p>
              <button 
                className="service-btn"
                style={{
                  backgroundColor: 'transparent',
                  color: '#007bff',
                  border: '2px solid #007bff',
                  padding: '10px 24px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
