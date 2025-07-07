import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import ModalOverlay from './modal-overlay/modal-overlay';

import type { TModal } from '@/utils/types';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modal');

const Modal = ({ title, onClose, extraClass, children }: TModal): React.JSX.Element => {
  const handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
      onClose?.();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);

    return (): void => document.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <>
      {modalRoot &&
        createPortal(
          <ModalOverlay onClose={onClose}>
            <div className={`${styles.modal} p-10 ${extraClass}`}>
              <div className={styles.modal_header}>
                <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
                <button className={styles.close_button} onClick={onClose}>
                  <CloseIcon type="primary" />
                </button>
              </div>
              <div>{children}</div>
            </div>
          </ModalOverlay>,
          modalRoot
        )}
    </>
  );
};

export default Modal;
