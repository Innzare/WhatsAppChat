import propz from 'propz';

export function getIncomingMessage(data) {
  const idMessage = propz.get(data, ['idMessage']);
  const timestamp = propz.get(data, ['timestamp']);
  const messageData = propz.get(data, ['messageData']);
  const senderId = propz.get(data, ['senderData', 'sender']);
  const senderName = propz.get(data, ['senderData', 'senderName']);
  const chatId = propz.get(data, ['senderData', 'chatId']);
  const textMessage = propz.get(messageData, ['textMessageData', 'textMessage'], '');
  const typeMessage = propz.get(messageData, ['typeMessage', 'textMessage'], '');

  return {
    timestamp,
    idMessage,
    typeMessage,
    chatId,
    textMessage,
    senderId,
    senderName
  };
}

export function formatTime(time) {
  const formattedTime = String(time).padStart(2, '0');
  return formattedTime;
}
