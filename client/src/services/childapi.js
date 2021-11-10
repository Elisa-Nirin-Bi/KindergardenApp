import axios from 'axios';

const url = axios.create({
  baseURL: 'http://localhost:3500',
  withCredentials: true
});

// to create child
export const createChild = (data) => {
  return url
    .post('/child/create', data)
    .then((response) => response.data.course);
};

// to update child
export const editChild = (id, data) => {
  return url
    .patch(`/child/${id}`, data)
    .then((response) => response.data.course);
};

//to get list of all children
export const getAllChildren = () =>
  url.get('/child/list').then((response) => response.data.courses);

// to find 1 child by id
export const getChild = (id) =>
  url.get(`/child/${id}`).then((response) => response.data.course);

// to delete on child found by id
export const removeChild = (id) => {
  return url.delete(`/child/${id}`);
};
