'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  notice: {
    type: String,
    required: true,
    trim: true
  }
});

const Message = mongoose.model('Message', schema);

module.exports = Message;
