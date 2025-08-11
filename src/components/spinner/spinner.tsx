import styles from './spinner.module.css';

type TSpinnerProps = {
  size?: 'small' | 'big';
};

const Spinner = ({ size = 'big' }: TSpinnerProps): React.JSX.Element => {
  const spinnerClass = `${styles.spinner} ${size === 'small' ? styles.small : styles.big}`;
  return (
    <div className={styles.wrap}>
      <div className={spinnerClass}></div>
    </div>
  );
};

export default Spinner;
