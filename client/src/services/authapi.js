import axios from 'axios';

import api from './api';

export const signUp = (body) => {
  return api.post('/authentication/sign-up', body).then((response) => {
    return response.data.user;
  });
};

export const updateTeacher = (body) => {
  const { name, email, password } = body;
  const { idUser } = body;
  console.log('idUser');
  console.log(idUser);
  console.log('name');
  console.log(name);
  console.log('email');
  console.log(email);
  console.log('password');
  console.log(password);
  const bodynew = { name, email, password };
  return api
    .patch(`/authentication/${idUser}/edit`, bodynew)
    .then((response) => {
      return response.data.user;
    });
};

export const updateParent = (body) => {
  const { name, email, password } = body;
  const { idUser } = body;
  console.log('idUser');
  console.log(idUser);
  console.log('name');
  console.log(name);
  console.log('email');
  console.log(email);
  console.log('password');
  console.log(password);
  const bodynew = { name, email, password };
  return api
    .patch(`/authentication/parent/${idUser}/edit`, bodynew)
    .then((response) => {
      return response.data.user;
    });
};

export const parentSignUp = (body) => {
  return api.post('/authentication/parent/sign-up', body).then((response) => {
    return response.data.user;
  });
};

export const signIn = (body) =>
  api
    .post('/authentication/sign-in', body)
    .then((response) => response.data.user);

export const signOut = () => {
  return api.post('/authentication/sign-out');
};

export const loadAuthenticatedUser = () => {
  return api.get('/authentication/me').then((response) => response.data.user);
};

export const getAllUsers = () =>
  api.get('/users').then((response) => response.data);
