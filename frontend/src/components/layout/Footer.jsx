import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Car Repair Service</h3>
            <p>Professional car repair and maintenance services you can trust.</p>
          </div>

          <div className={styles.footerSection}>
            <h4>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h4>Contact</h4>
            <p>Email: info@carrepairservice.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Address: 123 Main St, City, State 12345</p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Car Repair Service. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
