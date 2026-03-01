import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
      <div className="container">
        <h1>About Us</h1>
        
        <section className={styles.section}>
          <h2>Our Story</h2>
          <p>
            Founded in 2010, Car Repair Service has been serving the community with
            professional automotive repair and maintenance services. Our commitment to
            quality, honesty, and customer satisfaction has made us a trusted name in
            the industry.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Our Mission</h2>
          <p>
            To provide exceptional automotive services with integrity, expertise, and
            a customer-first approach. We believe in building long-term relationships
            with our customers through transparent communication and quality workmanship.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Why Choose Us</h2>
          <ul className={styles.benefitsList}>
            <li>ASE Certified Technicians</li>
            <li>State-of-the-Art Equipment</li>
            <li>Competitive Pricing</li>
            <li>Comprehensive Warranty</li>
            <li>Free Estimates</li>
            <li>Convenient Scheduling</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
