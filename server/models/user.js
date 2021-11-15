'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHashAndSalt: {
    type: String
  },
  role: {
    type: String,
    enum: ['teacher', 'parent'],
    required: true
  },
  child: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Child' }]
});

const User = mongoose.model('User', schema);

module.exports = User;
