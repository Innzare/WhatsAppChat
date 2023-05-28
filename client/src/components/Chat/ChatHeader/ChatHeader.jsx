import React from 'react';
import { getChatName } from 'Src/helpers/chats';
import { PanelActionButton } from 'Src/components/PanelActionButton';
import { ProfileIcon } from 'Src/components/SvgIcons/ProfileIcon';
import { Popover } from 'Src/components/Popover';
import { MenuIcon } from 'Src/components/SvgIcons/MenuIcon';
import './ChatHeader.scss';

export const ChatHeader = (props) => {
  const { onCloseChat, activeChat } = props;

  let chatName = getChatName(activeChat);

  const menuActions = [
    {
      text: 'Закрыть чат',
      action: onCloseChat
    }
  ];

  return (
    <header className="chat-header">
      <div className="chat-header-info">
        <ProfileIcon />

        <div className="chat-header-info__text">{chatName}</div>
      </div>

      <div className="chat-header__actions">
        <Popover
          actions={menuActions}
          triggerNode={
            <PanelActionButton>
              <MenuIcon />
            </PanelActionButton>
          }
        />
      </div>
    </header>
  );
};
