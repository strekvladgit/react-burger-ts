import { Link } from 'react-router-dom';

import styles from './not-found-page.module.css';

const NotFoundPage = (): React.JSX.Element => {
  return (
    <div className={styles.wrap}>
      <p className="text text_type_digits-large text_color_inactive">404</p>
      <p className="text text_type_main-large text_color_inactive">
        страница не найдена
      </p>
      <Link className={`${styles.link} mt-5 text text_type_main-medium`} to="/">
        на главную
      </Link>
    </div>
  );
};

export default NotFoundPage;
