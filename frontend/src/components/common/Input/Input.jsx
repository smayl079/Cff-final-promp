import styles from './Input.module.css';

const Input = ({
  label,
  error,
  helperText,
  fullWidth = false,
  ...props
}) => {
  const inputClasses = [
    styles.input,
    error && styles.error,
    fullWidth && styles.fullWidth,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={fullWidth ? styles.fullWidth : ''}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={inputClasses} {...props} />
      {error && <span className={styles.errorText}>{error}</span>}
      {helperText && !error && (
        <span className={styles.helperText}>{helperText}</span>
      )}
    </div>
  );
};

export default Input;
