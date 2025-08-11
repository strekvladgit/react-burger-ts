import AuthForm from '@/components/auth-form/auth-form';
import Spinner from '@/components/spinner/spinner';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { signUp } from '@/services/store/user/actions';
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

const RegisterPage = (): React.JSX.Element => {
  const isLoading = useSelector(getIsLoading);
  const [nameValue, setNameValue] = useState<string>('');
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
      signUp({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      })
    );
  };

  return (
    <AuthForm
      title="Регистрация"
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
    >
      <Input
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
        name="name"
        placeholder="Имя"
      />
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
      <Button htmlType="button" onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? <Spinner size="small" /> : 'Зарегистрироваться'}
      </Button>
      <footer className="mt-20">
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы? <Link to="/login">Войти</Link>
        </p>
      </footer>
    </AuthForm>
  );
};

export default RegisterPage;
