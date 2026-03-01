import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Professional Car Repair & Maintenance Services
            </h1>
            <p className={styles.heroSubtitle}>
              Expert technicians, quality parts, and exceptional service for your vehicle
            </p>
            <div className={styles.heroButtons}>
              <Link to="/customer/booking" className={styles.btnPrimary}>
                Book Appointment
              </Link>
              <Link to="/services" className={styles.btnSecondary}>
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className={styles.servicesPreview}>
        <div className="container">
          <h2 className="text-center">Our Services</h2>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <h3>Oil Change</h3>
              <p>Regular maintenance to keep your engine running smoothly</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Brake Service</h3>
              <p>Complete brake inspection and repair services</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Engine Diagnostics</h3>
              <p>Advanced diagnostic tools to identify engine issues</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Tire Service</h3>
              <p>Tire rotation, alignment, and replacement services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whyChooseUs}>
        <div className="container">
          <h2 className="text-center">Why Choose Us</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <h3>Certified Mechanics</h3>
              <p>ASE certified technicians with years of experience</p>
            </div>
            <div className={styles.feature}>
              <h3>Quality Parts</h3>
              <p>We use only genuine and high-quality replacement parts</p>
            </div>
            <div className={styles.feature}>
              <h3>Warranty</h3>
              <p>All services backed by comprehensive warranty</p>
            </div>
            <div className={styles.feature}>
              <h3>Fast Service</h3>
              <p>Quick turnaround times without compromising quality</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
