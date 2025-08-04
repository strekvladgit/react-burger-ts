import AuthForm from '@/components/auth-form/auth-form';
import authApi from '@/services/api/auth-api';
import { getWithExpiry } from '@/utils/localStoragetWithExpiry';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const ResetPasswordPage = (): React.JSX.Element => {
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [tokenValue, setTokenValue] = useState<string>('');

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleIconClick = (): void => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleClick = async (): Promise<void> => {
    await authApi
      .postReset({
        password: passwordValue,
        token: tokenValue,
      })
      .then(() => {
        void navigate('/login');
      });
  };

  const isOnReset = getWithExpiry<boolean>('isOnReset');

  if (!isOnReset) {
    return <Navigate to="/forgot-password" />;
  }

  return (
    <AuthForm title="Восстановление пароля">
      <Input
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        name="password"
        type={passwordVisibility ? 'text' : 'password'}
        placeholder="Введите новый пароль"
        icon={passwordVisibility ? 'HideIcon' : 'ShowIcon'}
        onIconClick={handleIconClick}
      />
      <Input
        value={tokenValue}
        onChange={(e) => setTokenValue(e.target.value)}
        name="email"
        placeholder="Укажите e-mail"
      />
      <Button
        htmlType="button"
        onClick={() => {
          void handleClick();
        }}
      >
        Сохранить
      </Button>
      <footer className="mt-20">
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </footer>
    </AuthForm>
  );
};

export default ResetPasswordPage;
