import { useAppDispatch } from '@/hooks/use-app-dispatch';
import AccountPage from '@/pages/account-page/account-page';
import ForgotPasswordPage from '@/pages/forgot-password-page/forgot-password-page';
import HomePage from '@/pages/home-page/home';
import IngredientPage from '@/pages/ingredient-page/ingredient-page';
import LoginPage from '@/pages/login-page/login-page';
import NotFoundPage from '@/pages/not-found-page/not-found-page';
import OrderFeedPage from '@/pages/order-feed-page/order-feed-page';
import OrderPage from '@/pages/order-page/order-page';
import RegisterPage from '@/pages/register-page/register-page';
import ResetPasswordPage from '@/pages/reset-password-page/reset-password-page';
import { loadIngredients } from '@/services/store/ingredients/actions';
import { checkAuth } from '@/services/store/user/actions';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Modal from '../modal/modal';
import Profile from '../profile/profile';
import ProtectedRoute from '../protected-route/protected-route';
import UsersFeed from '../users-feed/users-feed';
import { AppHeader } from '@components/app-header/app-header';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    void dispatch(loadIngredients());
    void dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={locationState?.backgroundLocation ?? location}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route path="orders" element={<UsersFeed />} />
        </Route>
        <Route path="/profile/orders/:number" element={<OrderPage />} />
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
        <Route path="/ingredient/:id" element={<IngredientPage />} />
        <Route path="/feed" element={<OrderFeedPage />} />
        <Route path="/feed/:number" element={<OrderPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {locationState?.backgroundLocation && (
        <Routes>
          <Route
            path="/ingredient/:id"
            element={
              <Modal
                title="Детали ингридиента"
                onClose={() => {
                  void navigate(-1);
                }}
              >
                <IngredientPage />
              </Modal>
            }
          />
          <Route
            path="/feed/:number"
            element={
              <Modal
                onClose={() => {
                  void navigate(-1);
                }}
              >
                <OrderPage />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <Modal
                onClose={() => {
                  void navigate(-1);
                }}
              >
                <OrderPage />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
