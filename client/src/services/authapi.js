import axios from 'axios';

const url = axios.create({
  baseURL: 'http://localhost:3500',
  withCredentials: true
});

export const signUp = (body) => {
  return url.post('/authentication/sign-up', body).then((response) => {
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
  return url
    .patch(`/authentication/${idUser}/edit`, bodynew)
    .then((response) => {
      return response.data.user;
    });
};

export const parentSignUp = (body) => {
  return url.post('/authentication/parent/sign-up', body).then((response) => {
    return response.data.user;
  });
};
export const signIn = (body) =>
  url
    .post('/authentication/sign-in', body)
    .then((response) => response.data.user);

export const signOut = () => {
  return url.post('/authentication/sign-out');
};

export const loadAuthenticatedUser = () => {
  return url.get('/authentication/me').then((response) => response.data.user);
};
