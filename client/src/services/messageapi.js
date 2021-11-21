import axios from 'axios';

const url = axios.create({
  baseURL: 'http://localhost:3500',
  withCredentials: true
});

export const createMessage = (receiverId, data) => {
  return url
    .post(`/message/${receiverId}`, data)
    .then((response) => response.data);
};

export const createUserMessage = (receiverId, data) => {
  return url
    .post(`/message/user/create/${receiverId}`, data)
    .then((response) => response.data);
};

export const getMessages = (receiverId) =>
  url.get(`/message/user/${receiverId}`).then((response) => response.data);

export const getAllMessages = () =>
  url.get('/message/all').then((response) => response.data);
