import { Link } from 'react-router-dom';
import { Calendar, Plus, ArrowLeft } from 'lucide-react';
import styles from './MyAppointments.module.css';

const MyAppointments = () => {
  return (
    <div className={styles.appointments}>
      <div className="container">
        <Link to="/customer/dashboard" className={styles.backLink}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>
        
        <div className={styles.header}>
          <h1>My Appointments</h1>
          <Link to="/customer/booking" className={styles.bookBtn}>
            <Plus size={20} />
            Book Appointment
          </Link>
        </div>
        
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Calendar size={64} />
          </div>
          <h3>No appointments yet</h3>
          <p className="text-muted">Schedule your first appointment to get started</p>
          <Link to="/customer/booking" className={styles.emptyBookBtn}>
            <Calendar size={20} />
            Book Your First Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
