import React, { useState, useEffect } from 'react';
import propz from 'propz';
import socketIO from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { SOCKET_SERVER_URL } from 'Src/consts/api';
import { ROUTE_PATHS } from 'Src/consts/routes';
import { USER_STATE } from 'Src/consts/user';
import { SOCKET_EVENT } from 'Src/consts/socket';
import { PROFILE_NOT_EXIST } from 'Src/consts/errors';
import { getChats, getChatHistory, sendMessage, getContactInfo, checkWhatsApp } from 'Src/services/api';
import { LocalStorage } from 'Src/helpers/storage';
import { getIncomingMessage } from 'Src/helpers/messages';
import { getContactToAdd } from 'Src/helpers/contacts';
import { ChatsList } from 'Src/components/ChatsList';
import { Chat } from 'Src/components/Chat';
import { LoadingChatsOverlay } from 'Src/components/LoadingChatsOverlay';
import { Snackbar } from 'Src/components/Snackbar';
import { SameChatSnackbar } from './SameChatSnackbar';
import './HomePage.scss';

const socket = socketIO.connect(SOCKET_SERVER_URL);

const SEND_MESSAGE_DELAY = 1000;

export const HomePage = () => {
  const userData = LocalStorage.get('userData');

  let id = propz.get(userData, ['id'], '');
  let token = propz.get(userData, ['token'], '');
  let stateInstance = propz.get(userData, ['stateInstance'], '');

  const isUserAuthorized = stateInstance === USER_STATE.AUTHORIZED;

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isChatAdding, setIsChatAdding] = useState(false);
  const [isSameChatExist, setIsSameChatExist] = useState(false);
  const [isProfileNotExist, setIsProfileNotExist] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [chatsFiltered, setChatsFiltered] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [sameChat, setSameChat] = useState();

  const isSelectedChatExist = typeof selectedChat !== 'undefined';

  useEffect(() => {
    if (isUserAuthorized) {
      socket.emit(SOCKET_EVENT.AUTH, { id, token });

      setIsLoading(true);

      getChats(id, token).then((chats) => {
        setChats(chats);
        setChatsFiltered(chats);
        setIsLoading(false);
      });
    } else {
      navigate(ROUTE_PATHS.LOGIN);
    }
  }, []);

  useEffect(() => {
    if (isUserAuthorized) {
      socket.on(SOCKET_EVENT.INCOMING_MESSAGE, (data) => {
        const incomingMessage = getIncomingMessage(data);

        setMessages([...messages, incomingMessage]);
      });
    }
  }, [socket, messages]);

  useEffect(() => {
    if (isProfileNotExist) {
      setTimeout(() => {
        setIsProfileNotExist(false);
      }, 3000);
    }
  }, [isProfileNotExist]);

  const onSelectChat = (chat) => {
    const chatId = propz.get(chat, ['id']);
    const selectedChatId = propz.get(selectedChat, ['id']);

    if (isSelectedChatExist && chatId === selectedChatId) {
      return;
    }

    setMessages([]);
    setSelectedChat(chat);
    setIsMessagesLoading(true);

    getChatHistory(id, token, chatId).then((chatHistory) => {
      setMessages(chatHistory.reverse());
      setIsMessagesLoading(false);
    });
  };

  const onUpdateChat = (chat) => {
    const chatId = propz.get(chat, ['id']);

    getChatHistory(id, token, chatId).then((chatHistory) => {
      setMessages(chatHistory.reverse());
    });
  };

  const onCloseChat = () => {
    setSelectedChat(undefined);
  };

  const onSendMessage = (chatId, message) => {
    setMessages([
      ...messages,
      {
        textMessage: message,
        type: 'outgoing',
        isTemplate: true
      }
    ]);

    sendMessage(id, token, chatId, message).then(() => {
      setTimeout(() => {
        onUpdateChat(selectedChat);
      }, SEND_MESSAGE_DELAY);
    });
  };

  const onAddNewChat = (contact) => {
    setIsChatAdding(true);

    const contactFormatted = `${contact}@c.us`;

    checkWhatsApp(id, token, contact)
      .then(({ existsWhatsapp }) => {
        if (existsWhatsapp) {
          return getContactInfo(id, token, contactFormatted);
        } else {
          throw PROFILE_NOT_EXIST;
        }
      })
      .then((contactInfo) => {
        const { chatId } = contactInfo;

        const sameChat = chats.find((item) => item.id === chatId);
        const isSameChatExist = typeof sameChat !== 'undefined';

        if (isSameChatExist) {
          setIsSameChatExist(true);
          setIsChatAdding(false);
          setSameChat(sameChat);

          return;
        }

        const contactToAdd = getContactToAdd(contactInfo);

        setChats([contactToAdd, ...chats]);
        setChatsFiltered([contactToAdd, ...chatsFiltered]);
        onSelectChat(contactToAdd);
      })
      .catch((error) => {
        const errorStatus = propz.get(error, ['response', 'status']);

        if (error === PROFILE_NOT_EXIST || errorStatus === 400) {
          setIsProfileNotExist(true);
        }
      })
      .finally(() => {
        setIsChatAdding(false);
      });
  };

  const onSearchChat = (value) => {
    const valueFormatted = value.toLowerCase();

    if (value === '') {
      return setChatsFiltered(chats);
    }

    const chatsFiltered = chats.filter((item) => {
      const id = propz.get(item, ['id'], '');
      const name = propz.get(item, ['name'], '');

      const nameFormatted = name.toLowerCase();

      return nameFormatted.includes(valueFormatted) || id.includes(valueFormatted);
    });

    setChatsFiltered(chatsFiltered);
  };

  const onCloseSameChatSnackbar = () => {
    setIsSameChatExist(false);
    setSameChat(undefined);
  };

  const onOpenSameChat = () => {
    onSelectChat(sameChat);
    onCloseSameChatSnackbar();
  };

  if (isLoading) {
    return <LoadingChatsOverlay />;
  }

  return (
    <div className="home-page">
      <ChatsList
        chats={chatsFiltered}
        activeChat={selectedChat}
        isLoading={isChatAdding}
        onSearchChat={onSearchChat}
        onSelectChat={onSelectChat}
        onAddNewChat={onAddNewChat}
      />

      <Chat
        messages={messages}
        activeChat={selectedChat}
        isLoading={isMessagesLoading}
        onCloseChat={onCloseChat}
        onSendMessage={onSendMessage}
      />

      <Snackbar isOpen={isSameChatExist}>
        <SameChatSnackbar onAccept={onOpenSameChat} onCancel={onCloseSameChatSnackbar} />
      </Snackbar>

      <Snackbar isOpen={isProfileNotExist}>
        <div style={{ color: 'red' }}>Проверьте введенные данные.</div>
      </Snackbar>
    </div>
  );
};
