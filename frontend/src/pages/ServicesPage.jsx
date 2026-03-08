import React from 'react';
import Header from '../components/public/Header';
import Footer from '../components/public/Footer';
import './ServicesPage.css';

const icons = {
  Oil: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  Brake: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Engine: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Tire: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  Battery: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  AC: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
  Check: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
};

const services = [
  { id: 1, title: 'Full Synthetic Oil Change', desc: 'Premium oil change service including filter replacement, fluid top-off, and a comprehensive 21-point inspection.', price: 'Starting at $69', icon: icons.Oil },
  { id: 2, title: 'Brake Repair & Replacement', desc: 'Complete brake system inspection, pad replacement, and rotor resurfacing to ensure your vehicle stops safely.', price: 'Starting at $149', icon: icons.Brake },
  { id: 3, title: 'Engine Diagnostics', desc: 'State-of-the-art computer diagnostics to identify check engine light issues and engine performance problems.', price: 'Starting at $89', icon: icons.Engine },
  { id: 4, title: 'Tire Services', desc: 'Mounting, balancing, rotation, and flat repair services to maximize your tire life and driving safety.', price: 'Starting at $25', icon: icons.Tire },
  { id: 5, title: 'Battery & Starting Check', desc: 'Thorough testing of your battery, starter, and alternator to prevent unexpected breakdowns.', price: 'Free Inspection', icon: icons.Battery },
  { id: 6, title: 'A/C System Repair', desc: 'Refrigerant recharge, leak detection, and compressor repair to keep you cool during summer months.', price: 'Starting at $129', icon: icons.AC },
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <div className="services-page-wrapper">
        {/* Hero Section */}
        <section className="sp-hero">
          <div className="sp-hero-bg"></div>
          <div className="sp-hero-content">
            <span className="sp-badge">OUR EXPERTISE</span>
            <h1 className="sp-title">
              Premium Care for <span>Your Vehicle</span>
            </h1>
            <p className="sp-subtitle">
              From routine maintenance to complex engine diagnostics, our certified technicians deliver dealer-quality service without the dealer price tag.
            </p>
            <div className="sp-hero-buttons">
              <button className="btn-primary-sp">Book Service Now</button>
              <button className="btn-outline-sp">View Pricing Guide</button>
            </div>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="sp-services-section">
          <div className="sp-section-heading">
            <h2>Comprehensive Services</h2>
            <p>Everything your car needs to run smoothly, safely, and efficiently.</p>
          </div>

          <div className="sp-grid">
            {services.map((service) => (
              <div key={service.id} className="sp-card">
                <div className="sp-icon-wrapper">
                  <service.icon />
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <div className="sp-card-footer">
                  <span className="sp-price">{service.price}</span>
                  <button className="sp-book-btn">Book Now →</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="sp-why-us">
          <div className="sp-why-container">
            <img 
              src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2670&auto=format&fit=crop" 
              alt="Mechanic inspecting engine" 
              className="sp-why-image"
            />
            
            <div className="sp-why-text">
              <h2>Why Trust Us With Your Vehicle?</h2>
              <p>
                Modern vehicles are complex machines that require specialized knowledge and state-of-the-art diagnostic equipment. We invest heavily in our technology and our team to provide uncompromised quality.
              </p>
              
              <ul className="sp-list">
                {[
                  'ASE Certified Master Technicians handling your repairs',
                  'Original Equipment Manufacturer (OEM) parts used',
                  '24-month / 24,000-mile nationwide warranty on all work',
                  'Transparent digital inspections sent directly to your phone'
                ].map((item, idx) => (
                  <li key={idx}>
                    <div className="sp-list-icon">
                      <icons.Check />
                    </div>
                    <h4>{item}</h4>
                  </li>
                ))}
              </ul>
              
              <div style={{ marginTop: '30px' }}>
                <button className="btn-primary-sp" style={{ backgroundColor: '#0f172a' }}>
                  Read Our Warranty Policy
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}