import styles from './preloader.module.css';

import type { FC } from 'react';

export const Preloader: FC = () => (
  <div className={styles.preloader}>
    <div className={styles.preloader_circle} />
  </div>
);
