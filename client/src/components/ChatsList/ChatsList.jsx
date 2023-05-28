import React, { useState } from 'react';
import { ChatsListHeader } from './ChatsListHeader';
import { ChatSearchPanel } from './ChatSearchPanel';
import { NewChatDrawer } from './NewChatDrawer';
import { Drawer } from 'Src/components/Drawer';
import { ChatsListBody } from './ChatsListBody';
import './ChatsList.scss';

export const ChatsList = (props) => {
  const { chats, activeChat, onSelectChat, onAddNewChat, onSearchChat, isLoading } = props;

  const [isNewChatDrawerShow, setIsNewChatDrawerShow] = useState(false);

  const onNewChatClick = () => {
    setIsNewChatDrawerShow(true);
  };

  const onCloseNewMessageDrawer = () => {
    setIsNewChatDrawerShow(false);
  };

  const onAddNewChatClick = (contact) => {
    onCloseNewMessageDrawer();
    onAddNewChat(contact);
  };

  return (
    <div className="chats-list">
      <ChatsListHeader onNewChatClick={onNewChatClick} />
      <ChatSearchPanel onSearch={onSearchChat} />

      <ChatsListBody chats={chats} isLoading={isLoading} activeChat={activeChat} onSelectChat={onSelectChat} />

      <Drawer isOpen={isNewChatDrawerShow}>
        <NewChatDrawer
          isOpen={isNewChatDrawerShow}
          onClose={onCloseNewMessageDrawer}
          onAddNewChat={onAddNewChatClick}
        />
      </Drawer>
    </div>
  );
};
