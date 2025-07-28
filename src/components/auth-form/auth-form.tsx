import styles from './auth-form.module.css';

type TAuthForm = {
  title: string;
  children: React.JSX.Element[] | string;
};

const AuthForm = ({ title, children }: TAuthForm): React.JSX.Element => {
  return (
    <main className={`${styles.wrap} pl-4 pr-4`}>
      <form className={styles.form}>
        <p className="text text_type_main-medium">{title}</p>
        {children}
      </form>
    </main>
  );
};

export default AuthForm;
