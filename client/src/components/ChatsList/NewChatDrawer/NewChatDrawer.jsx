import React, { useState, useRef, useEffect } from 'react';
import { ArrowIcon } from 'Src/components/SvgIcons/ArrowIcon';
import { TextField } from 'Src/components/TextField';
import './NewChatDrawer.scss';

export const NewChatDrawer = (props) => {
  const { isOpen, onClose, onAddNewChat } = props;

  const newChatInputRef = useRef(null);

  const [contact, setContact] = useState('');

  useEffect(() => {
    if (newChatInputRef.current !== null) {
      isOpen && newChatInputRef.current.focus();
    }

    if (!isOpen) {
      setContact('');
    }
  }, [isOpen]);

  const onSubmit = (event) => {
    event.preventDefault();

    if (contact === '') return;

    onAddNewChat(contact);
  };

  return (
    <div className="new-chat-drawer">
      <div className="new-chat-drawer__header-wrapper">
        <header>
          <button onClick={onClose}>
            <ArrowIcon />
          </button>

          <span>Новый чат</span>
        </header>
      </div>

      <div className="new-chat-drawer__form">
        <form onSubmit={onSubmit}>
          <TextField
            node={newChatInputRef}
            darkMode
            label="Введите номер"
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          />

          <button className="submit-button">Добавить</button>
        </form>
      </div>
    </div>
  );
};
