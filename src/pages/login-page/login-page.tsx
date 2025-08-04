import AuthForm from '@/components/auth-form/auth-form';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { signIn } from '@/services/store/user/actions';
import {
  Button,
  EmailInput,
  Input,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = (): React.JSX.Element => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleIconClick = (): void => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handleSubmit = (): void => {
    void dispatch(
      signIn({
        email: emailValue,
        password: passwordValue,
      })
    );
  };

  return (
    <AuthForm title="Вход">
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
        Войти
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
