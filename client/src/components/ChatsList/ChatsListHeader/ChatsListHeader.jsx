import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalStorage } from 'Src/helpers/storage';
import { ProfileIcon } from 'Src/components/SvgIcons/ProfileIcon';
import { MessageIcon } from 'Src/components/SvgIcons/MessageIcon';
import { MenuIcon } from 'Src/components/SvgIcons/MenuIcon';
import { StatusIcon } from 'Src/components/SvgIcons/StatusIcon';
import { GroupIcon } from 'Src/components/SvgIcons/GroupIcon';
import { PanelActionButton } from 'Src/components/PanelActionButton';
import { Popover } from 'Src/components/Popover';
import './ChatsListHeader.scss';

export const ChatsListHeader = (props) => {
  const { onNewChatClick } = props;

  const navigate = useNavigate();

  const onLogOutClick = () => {
    LocalStorage.remove('userData');

    navigate('/login');
  };

  const menuActions = [
    {
      text: 'Выйти',
      action: onLogOutClick
    }
  ];

  return (
    <header className="chats-list-header">
      <PanelActionButton>
        <ProfileIcon />
      </PanelActionButton>

      <div className="chats-list-header__right">
        <PanelActionButton>
          <GroupIcon />
        </PanelActionButton>

        <PanelActionButton>
          <StatusIcon />
        </PanelActionButton>

        <PanelActionButton onClick={onNewChatClick}>
          <MessageIcon />
        </PanelActionButton>

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
