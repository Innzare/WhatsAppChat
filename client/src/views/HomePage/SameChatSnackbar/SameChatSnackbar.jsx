import React from 'react';
import './SameChatSnackbar.scss';

export const SameChatSnackbar = (props) => {
  const { onAccept, onCancel } = props;

  return (
    <div className="same-chat-snackbar">
      <p>У вас уже есть чат с этим контактом. Открыть?</p>

      <div className="same-chat-snackbar__buttons-wrapper">
        <button onClick={onAccept}>Да</button>
        <button onClick={onCancel}>Нет</button>
      </div>
    </div>
  );
};
