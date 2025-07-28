import AuthForm from '@/components/auth-form/auth-form';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ResetPasswordPage = (): React.JSX.Element => {
  const [passwordValue, setPasswordValue] = useState<string>('');

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const handleIconClick = (): void => {
    setPasswordVisibility(!passwordVisibility);
  };

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
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        name="email"
        placeholder="Укажите e-mail"
      />
      <Button htmlType="submit">Сохранить</Button>
      <footer className="mt-20">
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </footer>
    </AuthForm>
  );
};

export default ResetPasswordPage;
