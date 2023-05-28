import React from 'react';
import propz from 'propz';
import { IntroPage } from 'Src/components/IntroPage';
import { ChatHeader } from './ChatHeader';
import { ChatBody } from './ChatBody';
import { ChatFooter } from './ChatFooter';
import './Chat.scss';

export const Chat = (props) => {
  const { activeChat, onCloseChat, onSendMessage, messages, isLoading } = props;

  const isActiveChatExist = typeof activeChat !== 'undefined';
  const activeChatId = propz.get(activeChat, ['id']);

  const onSendMessageClick = (message) => {
    if (message !== '') {
      onSendMessage(activeChatId, message);
    }
  };

  if (!isActiveChatExist) {
    return <IntroPage />;
  }

  return (
    <div className="chat">
      <div className="chat__background" />

      <ChatHeader onCloseChat={onCloseChat} activeChat={activeChat} />

      <ChatBody messages={messages} isLoading={isLoading} />

      <ChatFooter onSubmit={onSendMessageClick} />
    </div>
  );
};
