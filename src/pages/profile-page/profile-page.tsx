import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './profile-page.module.css';

type TField = {
  value: string;
  isActive?: boolean;
};

type TProfileForm = {
  name: TField;
  email: TField;
  password: TField;
};

const initialState: TProfileForm = {
  name: {
    value: 'Vasya',
    isActive: false,
  },
  email: {
    value: 'some@email.com',
    isActive: false,
  },
  password: {
    value: '',
    isActive: false,
  },
};

const ProfilePage = (): React.JSX.Element => {
  const [state, setState] = useState<TProfileForm>(initialState);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const isEqualToInitial = useMemo((): boolean => {
    const stateValues = Object.values(state);
    const initialStateValues = Object.values(initialState);
    for (let i = 0; i < stateValues.length; i++) {
      if (stateValues[i].value !== initialStateValues[i].value) {
        return false;
      }
    }
    return true;
  }, [state]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    input: keyof TProfileForm
  ): void => {
    setState({
      ...state,
      [input]: { ...state[input], value: e.target.value },
    });
  };

  const handleIconClick = (
    input: keyof TProfileForm,
    inputRef: React.RefObject<HTMLInputElement | null>
  ): void => {
    setState({
      ...state,
      [input]: {
        ...initialState[input],
        isActive: !state[input].isActive,
      },
    });
    setTimeout(() => {
      if (!state[input].isActive) {
        inputRef?.current?.focus();
      } else {
        inputRef?.current?.blur();
      }
    }, 0);
  };

  return (
    <main className={`${styles.wrap} pt-30 pl-4 pr-4`}>
      <div className={`${styles.navigation} mr-15`}>
        <nav>
          <Link className={styles.navlink} to="/">
            <p className="text text_type_main-medium">Профиль</p>
          </Link>
          <Link className={styles.navlink} to="/">
            <p className="text text_type_main-medium text_color_inactive">
              История заказов
            </p>
          </Link>
          <Link className={styles.navlink} to="/">
            <p className="text text_type_main-medium text_color_inactive">
              Выход
            </p>
          </Link>
        </nav>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div>
        <Input
          disabled={!state.name.isActive}
          ref={nameInputRef}
          name="name"
          onChange={(e) => {
            handleChange(e, 'name');
          }}
          placeholder="Имя"
          value={state.name.value}
          icon={state.name.isActive ? 'CloseIcon' : 'EditIcon'}
          extraClass="mb-6"
          onIconClick={() => {
            handleIconClick('name', nameInputRef);
          }}
        />
        <Input
          disabled={!state.email.isActive}
          ref={emailInputRef}
          onChange={(e) => {
            handleChange(e, 'email');
          }}
          value={state.email.value}
          name="email"
          type="email"
          placeholder="Логин"
          icon={state.email.isActive ? 'CloseIcon' : 'EditIcon'}
          extraClass="mb-6"
          onIconClick={() => {
            handleIconClick('email', emailInputRef);
          }}
        />
        <Input
          disabled={!state.password.isActive}
          ref={passwordInputRef}
          name="password"
          type="password"
          onChange={(e) => {
            handleChange(e, 'password');
          }}
          placeholder="Пароль"
          value={state.password.value}
          icon={state.password.isActive ? 'CloseIcon' : 'EditIcon'}
          extraClass="mb-6"
          onIconClick={() => {
            handleIconClick('password', passwordInputRef);
          }}
        />
        {!isEqualToInitial && (
          <div className={`${styles.buttons} mt-6`}>
            <Button
              htmlType="reset"
              type="secondary"
              onClick={() => {
                setState(initialState);
              }}
            >
              Отмена
            </Button>
            <Button htmlType="submit">Сохранить</Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
