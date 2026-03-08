import React from 'react';
import { Wrench, DollarSign, Clock } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-content">
          
          {/* Left Column - Image */}
          <div className="about-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=2670&auto=format&fit=crop"
              alt="Professional mechanics working on a car"
              className="about-image"
            />
            <div className="about-image-badge">
              <span className="badge-number">15+</span>
              <span className="badge-text">Years<br/>Experience</span>
            </div>
          </div>

          {/* Right Column - Text */}
          <div className="about-text-content">
            <div className="about-header">
              <span className="about-subtitle">About Us</span>
              <h2 className="about-title">Trusted car service with quality, experience, and customer satisfaction</h2>
            </div>
            
            <p className="about-description">
              At AutoCare, we are dedicated to providing top-tier automotive repair and maintenance. 
              Our modern facility is equipped to handle everything from routine oil changes 
              to complex engine diagnostics. We treat every vehicle as if it were our own, ensuring 
              safety and reliability on the road.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">
                  <Wrench size={24} />
                </div>
                <div className="highlight-text">
                  <h3>Experienced Mechanics</h3>
                  <p>Our team consists of highly skilled and certified professionals.</p>
                </div>
              </div>
              
              <div className="highlight-item">
                <div className="highlight-icon">
                  <DollarSign size={24} />
                </div>
                <div className="highlight-text">
                  <h3>Affordable Pricing</h3>
                  <p>Transparent and fair quotes with no hidden costs or fees.</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon">
                  <Clock size={24} />
                </div>
                <div className="highlight-text">
                  <h3>Fast Service</h3>
                  <p>Quick turnaround times to get you back on the road safely.</p>
                </div>
              </div>
            </div>

            <button className="about-cta-btn">
              Contact Us
            </button>
          </div>
          
      </div>
    </section>
  );
};

export default About;
