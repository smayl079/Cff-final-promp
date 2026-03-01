import styles from './Spinner.module.css';

const Spinner = ({ size = 'medium', color = 'primary' }) => {
  return (
    <div className={`${styles.spinner} ${styles[size]} ${styles[color]}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
