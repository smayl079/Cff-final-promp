import { Link } from 'react-router-dom';
import { Calendar, Phone, Mail, ArrowLeft } from 'lucide-react';
import styles from './Booking.module.css';

const Booking = () => {
  return (
    <div className={styles.booking}>
      <div className="container">
        <Link to="/customer/dashboard" className={styles.backLink}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>
        
        <h1>Book an Appointment</h1>
        <p className="text-muted">Schedule your car service today</p>

        <div className={styles.bookingCard}>
          <div className={styles.iconWrapper}>
            <Calendar size={64} />
          </div>
          <h3>Coming Soon</h3>
          <p>The online booking system is under development.</p>
          <p style={{marginTop: '1rem'}}>In the meantime, please contact us directly to schedule an appointment:</p>
          
          <div className={styles.contactOptions}>
            <div className={styles.contactOption}>
              <Phone size={24} />
              <div>
                <strong>Call Us</strong>
                <a href="tel:+15551234567">(555) 123-4567</a>
              </div>
            </div>
            <div className={styles.contactOption}>
              <Mail size={24} />
              <div>
                <strong>Email Us</strong>
                <a href="mailto:booking@autocare.com">booking@autocare.com</a>
              </div>
            </div>
          </div>
          
          <Link to="/customer/dashboard" className={styles.returnBtn}>
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Booking;
