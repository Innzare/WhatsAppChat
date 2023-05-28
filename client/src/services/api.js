import axios from 'axios';

export function getProfileState(id, token) {
  return axios.get(`https://api.green-api.com/waInstance${id}/getStateInstance/${token}`).then((response) => {
    return response.data;
  });
}

export function getContactInfo(id, token, chatId) {
  const data = {
    chatId
  };

  return axios.post(`https://api.green-api.com/waInstance${id}/getContactInfo/${token}`, data).then((response) => {
    return response.data;
  });
}

export function checkWhatsApp(id, token, phoneNumber) {
  const data = {
    phoneNumber
  };

  return axios.post(`https://api.green-api.com/waInstance${id}/checkWhatsapp/${token}`, data).then((response) => {
    return response.data;
  });
}

export function getLastIncomingMessages(id, token) {
  return axios.get(`https://api.green-api.com/waInstance${id}/lastIncomingMessages/${token}`).then((response) => {
    return response.data;
  });
}

export function getChats(id, token) {
  return axios.get(`https://api.green-api.com/waInstance${id}/getChats/${token}`).then((response) => {
    return response.data;
  });
}

export function getChatHistory(id, token, chatId) {
  const data = {
    chatId,
    count: 50
  };

  return axios.post(`https://api.green-api.com/waInstance${id}/GetChatHistory/${token}`, data).then((response) => {
    return response.data;
  });
}

export function sendMessage(id, token, chatId, message) {
  const data = {
    chatId,
    message
  };

  return axios.post(`https://api.green-api.com/waInstance${id}/sendMessage/${token}`, data).then((response) => {
    return response.data;
  });
}
export function getMessage(id, token, chatId, idMessage) {
  const data = {
    chatId,
    idMessage
  };

  return axios.post(`https://api.green-api.com/waInstance${id}/getMessage/${token}`, data).then((response) => {
    return response.data;
  });
}
