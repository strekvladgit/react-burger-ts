import { useAppDispatch } from '@/hooks/useAppDispatch';
import ForgotPasswordPage from '@/pages/forgot-password-page/forgot-password-page';
import HomePage from '@/pages/home-page/home';
import LoginPage from '@/pages/login-page/login-page';
import NotFoundPage from '@/pages/not-found-page/not-found-page';
import ProfilePage from '@/pages/profile-page/profile-page';
import RegisterPage from '@/pages/register-page/register-page';
import ResetPasswordPage from '@/pages/reset-password-page/reset-password-page';
import { checkAuth } from '@/services/store/user/actions';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from '../protected-route/protected-route';
import { AppHeader } from '@components/app-header/app-header';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <ForgotPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
