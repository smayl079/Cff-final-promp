import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Calendar, Car, History, Plus, Eye } from 'lucide-react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className={styles.dashboard}>
      <div className="container">
        <h1>Welcome, {user?.firstName}!</h1>
        <p className="text-muted" style={{marginBottom: '2rem'}}>Manage your vehicles and appointments</p>
        
        <div className={styles.grid}>
          <Link to="/customer/appointments" className={styles.card}>
            <div className={styles.cardIcon}>
              <Calendar size={32} />
            </div>
            <h3>Upcoming Appointments</h3>
            <p className={styles.number}>0</p>
            <p className="text-muted">No upcoming appointments</p>
          </Link>

          <Link to="/customer/vehicles" className={styles.card}>
            <div className={styles.cardIcon}>
              <Car size={32} />
            </div>
            <h3>My Vehicles</h3>
            <p className={styles.number}>0</p>
            <p className="text-muted">Add your first vehicle</p>
          </Link>

          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <History size={32} />
            </div>
            <h3>Total Services</h3>
            <p className={styles.number}>0</p>
            <p className="text-muted">Service history</p>
          </div>
        </div>

        <div className={styles.quickActions}>
          <h2>Quick Actions</h2>
          <div className={styles.actionButtons}>
            <Link to="/customer/booking" className={styles.actionBtn}>
              <Calendar size={20} />
              Book Appointment
            </Link>
            <Link to="/customer/vehicles" className={styles.actionBtn}>
              <Plus size={20} />
              Add Vehicle
            </Link>
            <Link to="/customer/appointments" className={styles.actionBtn}>
              <Eye size={20} />
              View History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
