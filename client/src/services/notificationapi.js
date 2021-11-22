// src/api/service.js

import axios from 'axios';

const service = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

const errorHandler = (err) => {
  throw err;
};

const getNotification = (id) => {
  return service
    .get(`/child/${id}/notification`)
    .then((res) => res.data)
    .catch(errorHandler);
};

const getAllNotifications = (id) => {
  return service
    .get(`/child/${id}/allnotification`)
    .then((res) => res.data)
    .catch(errorHandler);
};

const handleUpload = (file, id) => {
  return service
    .post(`/child/${id}/upload`, file)
    .then((res) => res.data)
    .catch(errorHandler);
};

const saveNewNotification = (id, newNotification) => {
  return service
    .post(`/child/${id}/create-notification`, newNotification)
    .then((res) => res.data)
    .catch(errorHandler);
};

export default {
  service,
  getNotification,
  getAllNotifications,
  handleUpload,
  saveNewNotification
};
