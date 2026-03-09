import React from 'react';
import Header from '../components/public/Header';
import Footer from '../components/public/Footer';
import './ContactPage.css';

const icons = {
  MapPin: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Phone: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  Clock: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Mail: () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
};

export default function ContactPage() {
  const faqs = [
    { q: "Do I need an appointment?", a: "While we accept walk-ins for minor repairs, we strongly recommend scheduling an appointment to ensure prompt service." },
    { q: "Do you offer loaner vehicles?", a: "Yes, we have a limited fleet of complimentary loaner cars available for major repairs requiring more than 24 hours." },
    { q: "What is your warranty?", a: "We provide a 24-month/24,000-mile nationwide warranty on parts and labor for most repairs." }
  ];

  return (
    <>
      <Header />
      <div className="contact-page">
        {/* Contact Hero */}
      <section className="contact-hero">
        <div className="contact-hero-bg"></div>
        <div className="contact-hero-content">
          <h1>Get in Touch</h1>
          <p>
            Have a question about a repair? Need a quote? Our team is ready to provide the answers you need.
          </p>
        </div>
      </section>

      {/* Main Content Areas */}
      <section className="contact-main-wrapper">
        <div className="contact-grid">
          
          {/* Contact Form Details */}
          <div className="contact-form-section">
            <h2>Send Us a Message</h2>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="John" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Doe" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="john@example.com" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="(555) 000-0000" />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="How can we help?" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="Provide details about your vehicle or inquiry..."></textarea>
              </div>
              <button type="submit" className="submit-btn" onClick={() => alert("Message submitted! (Demo only)")}>
                Send Message
              </button>
            </form>
          </div>

          {/* Info Cards */}
          <div className="contact-sidebar">
            <div className="info-card">
              <h3>Contact Info</h3>
              <div className="info-list">
                <div className="info-item">
                  <div className="info-icon">
                    <icons.MapPin />
                  </div>
                  <div>
                    <p className="info-item-title">Our Location</p>
                    <p className="info-item-text">123 Service Blvd.<br/>Auto City, ST 12345</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">
                    <icons.Phone />
                  </div>
                  <div>
                    <p className="info-item-title">Phone</p>
                    <p className="info-item-text">Service: (555) 123-4567<br/>Towing: (555) 987-6543</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">
                    <icons.Mail />
                  </div>
                  <div>
                    <p className="info-item-title">Email</p>
                    <p className="info-item-text">hello@premiumauto.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hours-card">
              <div className="hours-bg"></div>
              <div className="hours-header">
                <icons.Clock />
                <h3>Business Hours</h3>
              </div>
              <ul className="hours-list">
                <li><span>Mon - Fri</span> <span>7:30 AM - 6:00 PM</span></li>
                <li><span>Saturday</span> <span>8:00 AM - 2:00 PM</span></li>
                <li><span>Sunday</span> <span>Closed</span></li>
              </ul>
              <div className="hours-footer">
                <p>Need after-hours towing?</p>
                <a href="tel:5559876543">(555) 987-6543</a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Map Placeholder & FAQ */}
      <section className="bottom-section">
        <div className="bottom-container">
          
          {/* Map Area */}
          <div>
            <h2 className="section-title">Find Us</h2>
            <div 
              className="map-wrapper"
              style={{
                backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=Pittsburgh,PA&zoom=13&size=800x400&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0x333333&style=feature:landscape|element:all|color:0xf2f2f2&style=feature:poi|element:all|visibility:off&style=feature:road|element:all|saturation:-100|lightness:45&style=feature:road.highway|element:all|visibility:simplified&style=feature:road.arterial|element:labels.icon|visibility:off&style=feature:transit|element:all|visibility:off&style=feature:water|element:all|color:0xc8d7d4&style=feature:water|element:geometry.fill|color:0xdfe6e5&key=YOUR_API_KEY_HERE')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="map-overlay">
                <icons.MapPin />
                <span style={{ fontWeight: 600, color: '#1e293b', marginTop: '0.5rem' }}>Interactive Map</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Integration ready</span>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="section-title">Common Questions</h2>
            <div className="faq-list">
              {faqs.map((faq, idx) => (
                <div key={idx} className="faq-item">
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
      <Footer />
    </>
  );
}
