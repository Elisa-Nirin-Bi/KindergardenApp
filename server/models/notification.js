'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true
  }
});

const Notification = mongoose.model('Notification', schema);

module.exports = Notification;
