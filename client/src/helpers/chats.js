import propz from 'propz';

export function getChatName(chat) {
  const chatId = propz.get(chat, ['id'], '');

  const chatName = propz.get(chat, ['name'], '');
  const [number] = chatId.split('@');

  return chatName !== '' ? chatName : `+${number}`;
}
