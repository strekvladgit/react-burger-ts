import styles from './constructor-space.module.css';

type TConstructorSpace = {
  text: string;
  type?: 'top' | 'bottom';
};

const ConstructorSpace = ({
  text,
  type,
}: TConstructorSpace): React.JSX.Element => {
  return (
    <div className={`${styles.wrap} ${type && styles[type]}`}>
      <p className="text text_type_main-default">{text}</p>
    </div>
  );
};

export default ConstructorSpace;
