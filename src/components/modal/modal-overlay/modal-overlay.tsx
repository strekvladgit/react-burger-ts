import { useEffect, useRef } from 'react';

import type { TModal } from '@/utils/types';

import styles from './modal-overlay.module.css';

const ModalOverlay = ({ onClose, children }: TModal): React.JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: MouseEvent): void => {
    const clickedTarget = e.target as HTMLElement;
    const curTarget = e.currentTarget as HTMLElement;

    if (clickedTarget === curTarget) {
      onClose?.();
    }
  };

  useEffect(() => {
    modalRef.current?.addEventListener('click', handleClick);

    return (): void => modalRef.current?.removeEventListener('click', handleClick);
  }, []);

  return (
    <div ref={modalRef} className={styles.overlay}>
      {children}
    </div>
  );
};

export default ModalOverlay;
