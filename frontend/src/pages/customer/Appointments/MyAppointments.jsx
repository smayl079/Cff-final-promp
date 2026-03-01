import styles from './MyAppointments.module.css';

const MyAppointments = () => {
  return (
    <div className={styles.appointments}>
      <div className="container">
        <h1>My Appointments</h1>
        
        <div className={styles.emptyState}>
          <p>No appointments yet</p>
          <button className={styles.bookBtn}>Book Your First Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
