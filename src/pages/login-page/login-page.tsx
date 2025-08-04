import AuthForm from '@/components/auth-form/auth-form';
import Spinner from '@/components/spinner/spinner';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { signIn } from '@/services/store/user/actions';
import { getIsLoading } from '@/services/store/user/reducers';
import {
  Button,
  EmailInput,
  Input,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import type { FormEvent } from 'react';

const LoginPage = (): React.JSX.Element => {
  const isLoading = useSelector(getIsLoading);
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleIconClick = (): void => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleSubmit = (e?: FormEvent<HTMLFormElement>): void => {
    e?.preventDefault();
    void dispatch(
      signIn({
        email: emailValue,
        password: passwordValue,
      })
    );
  };

  return (
    <AuthForm title="Вход" onSubmit={handleSubmit}>
      <EmailInput
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        name="email"
        placeholder="E-mail"
      />
      <Input
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        name="password"
        type={passwordVisibility ? 'text' : 'password'}
        placeholder="Пароль"
        icon={passwordVisibility ? 'HideIcon' : 'ShowIcon'}
        onIconClick={handleIconClick}
      />
      <Button disabled={isLoading} htmlType="submit">
        {isLoading ? <Spinner size="small" /> : 'Войти'}
      </Button>
      <footer className="mt-20">
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?{' '}
          <Link to="/register">Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
        </p>
      </footer>
    </AuthForm>
  );
};

export default LoginPage;
