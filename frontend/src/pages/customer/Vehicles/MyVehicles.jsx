import styles from './MyVehicles.module.css';

const MyVehicles = () => {
  return (
    <div className={styles.vehicles}>
      <div className="container">
        <h1>My Vehicles</h1>
        
        <button className={styles.addBtn}>+ Add Vehicle</button>

        <div className={styles.emptyState}>
          <p>No vehicles added yet</p>
          <p className="text-muted">Add your vehicle information to get started</p>
        </div>
      </div>
    </div>
  );
};

export default MyVehicles;
