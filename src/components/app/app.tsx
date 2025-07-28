import ForgotPasswordPage from '@/pages/forgot-password-page/forgot-password-page';
import HomePage from '@/pages/home-page/home';
import LoginPage from '@/pages/login-page/login-page';
import ProfilePage from '@/pages/profile-page/profile-page';
import RegisterPage from '@/pages/register-page/register-page';
import ResetPasswordPage from '@/pages/reset-password-page/reset-password-page';
import { Route, Routes } from 'react-router-dom';

import { AppHeader } from '@components/app-header/app-header';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
};

export default App;
