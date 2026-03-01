import styles from './Booking.module.css';

const Booking = () => {
  return (
    <div className={styles.booking}>
      <div className="container">
        <h1>Book an Appointment</h1>
        <p className="text-muted">Schedule your car service today</p>

        <div className={styles.bookingCard}>
          <h3>Coming Soon</h3>
          <p>The booking system is under development.</p>
          <p>Please call us at (555) 123-4567 to schedule an appointment.</p>
        </div>
      </div>
    </div>
  );
};

export default Booking;
