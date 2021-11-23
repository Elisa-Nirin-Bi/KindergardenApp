import axios from 'axios';

import api from './api';

export const createMessage = (receiverId, data) => {
  return api
    .post(`/message/${receiverId}`, data)
    .then((response) => response.data);
};

export const createUserMessage = (receiverId, data) => {
  return api
    .post(`/message/user/create/${receiverId}`, data)
    .then((response) => response.data);
};

export const getMessages = (receiverId) =>
  api.get(`/message/user/${receiverId}`).then((response) => response.data);

export const getAllMessages = () =>
  api.get('/message/all').then((response) => response.data);

export const editMessage = (receiverId, data) => {
  return api
    .patch(`/user/edit/${receiverId}`, data)
    .then((response) => response.data);
};

export const removeMessageById = (messageId) => {
  return api.delete(`/message/user/delete/${messageId}`);
};
