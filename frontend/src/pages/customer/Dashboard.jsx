import { useAuth } from '../../context/AuthContext';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className={styles.dashboard}>
      <div className="container">
        <h1>Welcome, {user?.firstName}!</h1>
        
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Upcoming Appointments</h3>
            <p className={styles.number}>0</p>
            <p className="text-muted">No upcoming appointments</p>
          </div>

          <div className={styles.card}>
            <h3>My Vehicles</h3>
            <p className={styles.number}>0</p>
            <p className="text-muted">Add your first vehicle</p>
          </div>

          <div className={styles.card}>
            <h3>Total Services</h3>
            <p className={styles.number}>0</p>
            <p className="text-muted">Service history</p>
          </div>
        </div>

        <div className={styles.quickActions}>
          <h2>Quick Actions</h2>
          <div className={styles.actionButtons}>
            <button className={styles.actionBtn}>Book Appointment</button>
            <button className={styles.actionBtn}>Add Vehicle</button>
            <button className={styles.actionBtn}>View History</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
