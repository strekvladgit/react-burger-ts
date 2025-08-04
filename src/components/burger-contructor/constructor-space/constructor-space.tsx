import styles from './constructor-space.module.css';

type TConstructorSpace = {
  text: string;
  type?: 'top' | 'bottom';
  extraClass: string;
};

const ConstructorSpace = ({
  text,
  type,
  extraClass,
}: TConstructorSpace): React.JSX.Element => {
  return (
    <div className={`${styles.wrap} ${type && styles[type]} ${extraClass}`}>
      <p className="text text_type_main-default">{text}</p>
    </div>
  );
};

export default ConstructorSpace;
