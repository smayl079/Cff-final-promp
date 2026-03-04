import { Link } from 'react-router-dom';
import { Car, Plus, ArrowLeft } from 'lucide-react';
import styles from './MyVehicles.module.css';

const MyVehicles = () => {
  return (
    <div className={styles.vehicles}>
      <div className="container">
        <Link to="/customer/dashboard" className={styles.backLink}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>
        
        <div className={styles.header}>
          <h1>My Vehicles</h1>
          <button className={styles.addBtn}>
            <Plus size={20} />
            Add Vehicle
          </button>
        </div>

        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Car size={64} />
          </div>
          <h3>No vehicles added yet</h3>
          <p className="text-muted">Add your vehicle information to get started with booking services</p>
          <button className={styles.emptyAddBtn}>
            <Plus size={20} />
            Add Your First Vehicle
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyVehicles;
