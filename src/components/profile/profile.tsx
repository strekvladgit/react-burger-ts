import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { updateUser } from '@/services/store/user/actions';
import { getIsLoading, getUser } from '@/services/store/user/reducers';
import { Input, Button } from '@krgaa/react-developer-burger-ui-components';
import { useState, useRef, useEffect, useMemo } from 'react';

import Spinner from '../spinner/spinner';

import type { FormEvent } from 'react';

import styles from './profile.module.css';

type TField = {
  value: string;
  isActive?: boolean;
};

type TProfileForm = {
  name: TField;
  email: TField;
  password: TField;
};

const Profile = (): React.JSX.Element => {
  const isLoading = useAppSelector(getIsLoading);
  const user = useAppSelector(getUser);

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

  const handleUpdateUserClick = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void dispatch(
      updateUser({
        email: state.email.value,
        name: state.name.value,
        password: state.password.value,
      })
    );
  };

  return (
    <form onSubmit={handleUpdateUserClick}>
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
          <Button disabled={isLoading} htmlType="submit">
            {isLoading ? <Spinner size="small" /> : 'Сохранить'}
          </Button>
        </div>
      )}
    </form>
  );
};

export default Profile;
