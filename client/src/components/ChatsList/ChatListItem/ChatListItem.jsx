import React from 'react';
import { ProfileIcon } from 'Src/components/SvgIcons/ProfileIcon';
import './ChatListItem.scss';

export const ChatListItem = (props) => {
  const { chat, onClick, isActive } = props;
  const isChatNameExist = typeof chat.name !== 'undefined';
  const [number] = chat.id.split('@');
  const name = isChatNameExist ? chat.name : `+${number}`;

  return (
    <div
      className={isActive ? 'chat-list-item chat-list-item--active' : 'chat-list-item'}
      onClick={() => onClick(chat)}
    >
      <div className="chat-list-item__avatar-wrapper">
        <div className="chat-list-item__avatar">
          <ProfileIcon />
        </div>
      </div>

      <div className="chat-list-item__text">
        <span className="chat-list-item__title">{name}</span>
        <span className="chat-list-item__message">{`Chat with ${name}. This is a template text instead of a message`}</span>
      </div>
    </div>
  );
};
