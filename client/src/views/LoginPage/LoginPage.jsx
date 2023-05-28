import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from 'Src/consts/routes';
import { USER_STATE } from 'Src/consts/user';
import { GREEN_API_LOGO_LINK } from 'Src/consts/common';
import { LOGIN_ERRORS_TEXT, LOGIN_ERRORS } from 'Src/consts/errors';
import { getProfileState } from 'Src/services/api';
import { LocalStorage } from 'Src/helpers/storage';
import { LoadingChatsOverlay } from 'Src/components/LoadingChatsOverlay';
import { Snackbar } from 'Src/components/Snackbar';
import { LoginForm } from './LoginForm';
import { LoginPageHeader } from './LoginPageHeader';
import './LoginPage.scss';

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  }, [isError]);

  const onSubmit = async (id, token) => {
    const isFieldsFilled = id !== '' && token !== '';

    setIsLoading(true);

    try {
      if (isFieldsFilled) {
        const { stateInstance } = await getProfileState(id, token);

        switch (stateInstance) {
          case USER_STATE.AUTHORIZED:
            LocalStorage.set('userData', {
              stateInstance,
              id,
              token
            });

            navigate(ROUTE_PATHS.HOME);

            break;

          case USER_STATE.NOT_AUTHORIZED:
            console.error(USER_STATE.NOT_AUTHORIZED);

            throw LOGIN_ERRORS.NOT_AUTHORIZED;

          default:
            throw LOGIN_ERRORS.UNCAUGHT_ERROR;
        }
      } else {
        throw LOGIN_ERRORS.EMPTY_FIELDS;
      }
    } catch (error) {
      const errorText = LOGIN_ERRORS_TEXT[error];

      setIsError(true);
      setErrorText(errorText);

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingChatsOverlay />;
  }

  return (
    <div className="login-page">
      <LoginPageHeader />

      <div className="login-page__content">
        <div className="login-page__text-wrapper">
          <div className="login-page__text">
            <h1>Используйте Whats App на компьютере</h1>

            <div className="login-page__subtitle">
              Вам понадобятся данные из системы <span>GREEN-API</span>
            </div>
          </div>

          <img src={GREEN_API_LOGO_LINK} alt="Green-api" />
        </div>

        <LoginForm onSubmit={onSubmit} />
      </div>

      <Snackbar isOpen={isError}>
        <span style={{ color: 'red' }}>{errorText}</span>
      </Snackbar>
    </div>
  );
};
