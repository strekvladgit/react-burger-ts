import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.link} ${styles.link_active}`
                : `${styles.link}`
            }
          >
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </NavLink>
          <a href="/feed" className={`${styles.link} ml-10`}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </a>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? `${styles.link} ${styles.link_position_last} ${styles.link_active}`
              : `${styles.link} ${styles.link_position_last}`
          }
        >
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
};
