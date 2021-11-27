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
    required: true,
    enum: ['boy', 'girl', 'Girl', 'Boy']
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Child = mongoose.model('Child', schema);

module.exports = Child;
