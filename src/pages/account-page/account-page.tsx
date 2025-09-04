import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { signOut } from '@/services/store/user/actions';
import { NavLink, Outlet } from 'react-router-dom';

import styles from './account-page.module.css';

const AccountPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const handleSignOutClick = (): void => {
    void dispatch(signOut());
  };

  return (
    <main className={`${styles.wrap} pt-30 pl-4 pr-4`}>
      <div className={`${styles.navigation} mr-15`}>
        <nav>
          <NavLink
            end
            className={({ isActive }) =>
              isActive
                ? `${styles.navlink} text text_type_main-medium`
                : `${styles.navlink} text text_type_main-medium text_color_inactive`
            }
            to=""
          >
            Профиль
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.navlink} text text_type_main-medium`
                : `${styles.navlink} text text_type_main-medium text_color_inactive`
            }
            to="orders"
          >
            История заказов
          </NavLink>
          <button className={styles.navlink} onClick={handleSignOutClick}>
            <p className="text text_type_main-medium text_color_inactive">
              Выход
            </p>
          </button>
        </nav>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={`${styles.content} custom-scroll`}>
        <Outlet />
      </div>
    </main>
  );
};

export default AccountPage;
