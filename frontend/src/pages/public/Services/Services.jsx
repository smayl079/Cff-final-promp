import styles from './Services.module.css';

const Services = () => {
  return (
    <div className={styles.services}>
      <div className="container">
        <h1>Our Services</h1>
        <p className="text-muted">
          Comprehensive car repair and maintenance services
        </p>

        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <h3>Oil Change & Lubrication</h3>
            <p>Regular oil changes are essential for engine health</p>
            <p className={styles.price}>From $39.99</p>
          </div>

          <div className={styles.serviceCard}>
            <h3>Brake Inspection & Repair</h3>
            <p>Complete brake system diagnostic and repair</p>
            <p className={styles.price}>From $89.99</p>
          </div>

          <div className={styles.serviceCard}>
            <h3>Engine Diagnostics</h3>
            <p>Advanced computer diagnostics for engine issues</p>
            <p className={styles.price}>From $69.99</p>
          </div>

          <div className={styles.serviceCard}>
            <h3>Tire Services</h3>
            <p>Rotation, balancing, alignment, and replacement</p>
            <p className={styles.price}>From $49.99</p>
          </div>

          <div className={styles.serviceCard}>
            <h3>Battery Service</h3>
            <p>Battery testing, charging, and replacement</p>
            <p className={styles.price}>From $29.99</p>
          </div>

          <div className={styles.serviceCard}>
            <h3>Air Conditioning Service</h3>
            <p>A/C inspection, recharge, and repair</p>
            <p className={styles.price}>From $79.99</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
