import React from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Users, Shield, DollarSign, Settings } from 'lucide-react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: <Settings size={64} />,
      title: t('whyChoose.qualityPartsTitle'),
      description: t('whyChoose.qualityPartsDesc')
    },
    {
      icon: <Users size={64} />,
      title: t('whyChoose.expertTeamTitle'),
      description: t('whyChoose.expertTeamDesc')
    },
    {
      icon: <Shield size={64} />,
      title: t('whyChoose.warrantyTitle'),
      description: t('whyChoose.warrantyDesc')
    },
    {
      icon: <DollarSign size={64} />,
      title: t('whyChoose.pricingTitle'),
      description: t('whyChoose.pricingDesc')
    }
  ];

  return (
    <section className="why-choose section section-light">
      <div className="container">
        <div className="section-header">
          <h2>{t('whyChoose.title')}</h2>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
