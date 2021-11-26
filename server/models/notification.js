'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true
    },
    imageUrl: {
      type: String
    },
    childProfile: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Child'
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'editingDate'
    }
  }
);

const Notification = mongoose.model('Notification', schema);

module.exports = Notification;
