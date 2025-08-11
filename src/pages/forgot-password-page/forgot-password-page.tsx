import AuthForm from '@/components/auth-form/auth-form';
import Spinner from '@/components/spinner/spinner';
import authApi from '@/services/api/auth-api';
import { getIsLoading } from '@/services/store/user/reducers';
import {
  Button,
  EmailInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import type { FormEvent } from 'react';

const ForgotPasswordPage = (): React.JSX.Element => {
  const isLoading = useSelector(getIsLoading);
  const [emailValue, setEmailValue] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = async (
    e?: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e?.preventDefault();
    await authApi.postResetRequest({ email: emailValue }).then(() => {
      void navigate('/reset-password');
    });
  };

  return (
    <AuthForm
      title="Восстановление пароля"
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
    >
      <EmailInput
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        name="email"
        placeholder="Укажите e-mail"
      />
      <Button htmlType="submit" disabled={isLoading}>
        {isLoading ? <Spinner size="small" /> : 'Восстановить'}
      </Button>
      <footer className="mt-20">
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </footer>
    </AuthForm>
  );
};

export default ForgotPasswordPage;
