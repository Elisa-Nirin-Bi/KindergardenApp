import axios from 'axios';
import api from './api';
// to create child
export const createChild = (data) => {
  console.log('reached the clildapi');
  return api.post('/child/create', data).then((response) => response.data);
};

// to update child
export const editChild = (id, data) => {
  return api.patch(`/child/${id}`, data).then((response) => response.data);
};

//to get list of all children
export const getAllChildren = () =>
  api.get('/child/list').then((response) => response.data);

// to find 1 child by id
export const getChild = (id) =>
  api.get(`/child/${id}`).then((response) => response.data);

// to delete on child found by id
export const removeChild = (id) => {
  return api.delete(`/child/${id}`);
};
