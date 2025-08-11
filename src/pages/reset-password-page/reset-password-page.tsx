import AuthForm from '@/components/auth-form/auth-form';
import Spinner from '@/components/spinner/spinner';
import authApi from '@/services/api/auth-api';
import { getIsLoading } from '@/services/store/user/reducers';
import { getWithExpiry } from '@/utils/localStoragetWithExpiry';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import type { FormEvent } from 'react';

const ResetPasswordPage = (): React.JSX.Element => {
  const isLoading = useSelector(getIsLoading);

  const [passwordValue, setPasswordValue] = useState<string>('');
  const [tokenValue, setTokenValue] = useState<string>('');

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleIconClick = (): void => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleSubmit = async (
    e?: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e?.preventDefault();
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
    <AuthForm
      title="Восстановление пароля"
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
    >
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
        name="token"
        placeholder="Введите код из письма"
      />
      <Button disabled={isLoading} htmlType="submit">
        {isLoading ? <Spinner size="small" /> : 'Сохранить'}
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
