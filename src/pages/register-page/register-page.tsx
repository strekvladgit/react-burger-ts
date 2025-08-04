import AuthForm from '@/components/auth-form/auth-form';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { signUp } from '@/services/store/user/actions';
import {
  Button,
  EmailInput,
  Input,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = (): React.JSX.Element => {
  const [nameValue, setNameValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleIconClick = (): void => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleSubmit = (): void => {
    void dispatch(
      signUp({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
      })
    );
  };

  return (
    <AuthForm title="Регистрация">
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
      <Button htmlType="button" onClick={handleSubmit}>
        Зарегистрироваться
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
