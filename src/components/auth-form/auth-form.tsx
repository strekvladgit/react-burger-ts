import type { FormEvent } from 'react';

import styles from './auth-form.module.css';

type TAuthForm = {
  title: string;
  children: React.JSX.Element[] | string;
  onSubmit: (e?: FormEvent<HTMLFormElement>) => void;
};

const AuthForm = ({
  title,
  children,
  onSubmit,
}: TAuthForm): React.JSX.Element => {
  return (
    <main className={`${styles.wrap} pl-4 pr-4`}>
      <form className={styles.form} onSubmit={onSubmit}>
        <p className="text text_type_main-medium">{title}</p>
        {children}
      </form>
    </main>
  );
};

export default AuthForm;
