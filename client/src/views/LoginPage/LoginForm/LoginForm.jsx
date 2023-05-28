import React, { useState } from 'react';
import { TextField } from 'Src/components/TextField';
import './LoginForm.scss';

export const LoginForm = (props) => {
  const { onSubmit } = props;

  const [id, setId] = useState('');
  const [token, setToken] = useState('');

  const onSubmitClick = (event) => {
    event.preventDefault();

    onSubmit(id, token);
  };

  return (
    <div className="login-form-wrapper">
      <form className="login-form" onSubmit={(event) => onSubmitClick(event)}>
        <TextField label="Ваш id" value={id} onChange={(event) => setId(event.target.value)} />
        <TextField label="Ваш token" value={token} onChange={(event) => setToken(event.target.value)} />

        <button className="login-form__submit-button">Войти</button>
      </form>
    </div>
  );
};
