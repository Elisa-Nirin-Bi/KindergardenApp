'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  address: {
    type: String,
    required: true,
    trim: true
  },
  emergencyContactNumber: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    enum: ['boy', 'girl']
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Child = mongoose.model('Child', schema);

module.exports = Child;
