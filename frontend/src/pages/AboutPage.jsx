import React from 'react';
import Header from '../components/public/Header';
import Footer from '../components/public/Footer';
import './AboutPage.css';

export default function AboutPage() {
  const stats = [
    { label: 'Years of Experience', value: '15+' },
    { label: 'Vehicles Serviced', value: '50,000+' },
    { label: 'Customer Satisfaction', value: '99%' },
    { label: 'Expert Technicians', value: '12' },
  ];

  const values = [
    { title: 'Honesty First', desc: 'We never recommend a service you don\'t need. Our transparent digital reports show you exactly what we see.' },
    { title: 'Technical Excellence', desc: 'We continuously train our staff on the newest automotive technologies to handle modern complex vehicles.' },
    { title: 'Customer Respect', desc: 'Your time is valuable. We focus on getting the job done right, efficiently, and keeping you informed.' },
  ];

  const team = [
    { name: 'Michael Rodriguez', role: 'Lead Diagnostic Technician', exp: '18 Years Experience' },
    { name: 'Sarah Jenkins', role: 'Service Manager', exp: '12 Years Experience' },
    { name: 'David Chen', role: 'Specialized Engine Mechanic', exp: '10 Years Experience' },
  ];

  return (
    <>
      <Header />
      <div className="ap-wrapper">
        {/* About Hero */}
        <section className="ap-hero">
          <div className="ap-hero-bg-shape"></div>
          <div className="ap-hero-content">
            <h1 className="ap-title">
              Driven by Passion. <br/><span>Defined by Trust.</span>
            </h1>
            <p className="ap-subtitle">
              For over a decade, we've been redefining the auto repair experience. No jargon, no surprises—just premium service for people who care about their cars.
            </p>
          </div>
        </section>

        {/* Story & Stats */}
        <section className="ap-story-section">
          <div className="ap-story-container">
            <div className="ap-story-text">
              <h2>Our Story</h2>
              <p>
                What started as a two-bay garage in 2011 has grown into a state-of-the-art automotive care center. Our founder noticed a gap in the industry: customers were forced to choose between the high prices of dealerships and the uncertain quality of quick-lube shops.
              </p>
              <p>
                We bridge that gap. We combine dealership-level diagnostic equipment and expertise with the personalized, honest care of a local neighborhood shop.
              </p>
            </div>
            
            <div className="ap-stats-box">
              <dl className="ap-stats-grid">
                {stats.map((stat, idx) => (
                  <div key={idx} className="ap-stat-item">
                    <dt className="ap-stat-label">{stat.label}</dt>
                    <dd className="ap-stat-value">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="ap-values-section">
          <div className="ap-values-container">
            <div className="ap-values-header">
              <h2>Our Core Values</h2>
              <p>The principles that guide every wrench turn and every customer conversation.</p>
            </div>
            
            <div className="ap-values-grid">
              {values.map((value, idx) => (
                <div key={idx} className="ap-value-card">
                  <div className="ap-value-icon">{idx + 1}</div>
                  <h3 className="ap-value-title">{value.title}</h3>
                  <p className="ap-value-desc">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="ap-team-section">
          <div className="ap-team-header">
            <div className="ap-team-title">
              <h2>Meet The Experts</h2>
              <p>Our team holds the highest ASE certifications, ensuring your vehicle is in the most capable hands.</p>
            </div>
            <button className="ap-team-btn">
              Join our team <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>

          <div className="ap-team-grid">
            {team.map((member, idx) => (
              <div key={idx} className="ap-team-member">
                <div className="ap-team-img-placeholder">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <h3>{member.name}</h3>
                <p className="ap-team-role">{member.role}</p>
                <p className="ap-team-exp">{member.exp}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}