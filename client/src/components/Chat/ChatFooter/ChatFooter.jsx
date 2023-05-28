import React, { useState } from 'react';
import { SendMessageIcon } from 'Src/components/SvgIcons/SendMessageIcon';
import './ChatFooter.scss';

export const ChatFooter = (props) => {
  const { onSubmit } = props;

  const [message, setMessage] = useState('');

  const onSubmitClick = (event) => {
    event.preventDefault();

    onSubmit(message);
    setMessage('');
  };

  return (
    <footer className="chat-footer">
      <form onSubmit={(event) => onSubmitClick(event)}>
        <input
          type="text"
          placeholder="Введите сообщение"
          className="chat-send-message-input"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />

        <button>
          <SendMessageIcon />
        </button>
      </form>
    </footer>
  );
};
