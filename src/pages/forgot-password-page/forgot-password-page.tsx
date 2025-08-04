import AuthForm from '@/components/auth-form/auth-form';
import authApi from '@/services/api/auth-api';
import {
  Button,
  EmailInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordPage = (): React.JSX.Element => {
  const [emailValue, setEmailValue] = useState<string>('');

  const navigate = useNavigate();

  const handleClick = async (): Promise<void> => {
    await authApi.postResetRequest({ email: emailValue }).then(() => {
      void navigate('/reset-password');
    });
  };

  return (
    <AuthForm title="Восстановление пароля">
      <EmailInput
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        name="email"
        placeholder="Укажите e-mail"
      />
      <Button
        htmlType="button"
        onClick={() => {
          void handleClick();
        }}
      >
        Восстановить
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
