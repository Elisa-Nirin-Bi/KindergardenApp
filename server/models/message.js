'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    textBody: {
      type: String,
      required: true,
      trim: true
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    receiver: {
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

const Message = mongoose.model('Message', schema);

module.exports = Message;
