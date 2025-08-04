import { useAppDispatch } from '@/hooks/useAppDispatch';
import { signOut, updateUser } from '@/services/store/user/actions';
import { getUser } from '@/services/store/user/reducers';
import { Button, Input } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
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

const ProfilePage = (): React.JSX.Element => {
  const user = useSelector(getUser);

  const dispatch = useAppDispatch();

  const [initialState, setInitialState] = useState<TProfileForm>({
    name: {
      value: '',
      isActive: false,
    },
    email: {
      value: '',
      isActive: false,
    },
    password: {
      value: '',
      isActive: false,
    },
  });
  const [state, setState] = useState<TProfileForm>(initialState);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newState = {
      name: {
        value: user!.name,
        isActive: false,
      },
      email: {
        value: user!.email,
        isActive: false,
      },
      password: {
        value: '',
        isActive: false,
      },
    };
    setInitialState(newState);
    setState(newState);
  }, [user]);

  const isEqualToInitial = useMemo((): boolean => {
    const stateValues = Object.values(state);
    const initialStateValues = Object.values(initialState);
    for (let i = 0; i < stateValues.length; i++) {
      if (stateValues[i].value !== initialStateValues[i].value) {
        return false;
      }
    }
    return true;
  }, [state, initialState]);

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

  const handleUpdateUserClick = (): void => {
    void dispatch(
      updateUser({
        email: state.email.value,
        name: state.name.value,
        password: state.password.value,
      })
    );
  };

  const handleSignOutClick = (): void => {
    void dispatch(signOut());
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
            <Button htmlType="button" onClick={handleUpdateUserClick}>
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
