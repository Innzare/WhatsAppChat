import React from 'react';
import propz from 'propz';
import { ChatListItem } from '../ChatListItem';
import { Loader } from 'Src/components/Loader';
import { LockIcon } from 'Src/components/SvgIcons/LockIcon';
import './ChatsListBody.scss';

export const ChatsListBody = (props) => {
  const { chats, isLoading, activeChat, onSelectChat } = props;

  const isActiveChatExist = typeof activeChat !== 'undefined';
  const activeChatId = propz.get(activeChat, ['id']);

  return (
    <div className="chats-list-body">
      {isLoading && <Loader />}

      <div>
        {chats.map((chat) => {
          const chatId = propz.get(chat, ['id']);
          const isActive = isActiveChatExist && chatId === activeChatId;

          return <ChatListItem key={chat.id} chat={chat} onClick={onSelectChat} isActive={isActive} />;
        })}
      </div>

      <div className="chats-list-body__encrypted-text">
        <LockIcon />
        Ваши персональные сообщения <span>защищены сквозным шифрованием</span>
      </div>
    </div>
  );
};
