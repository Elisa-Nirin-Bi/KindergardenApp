const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const Message = require('./../models/message');
const routeGuard = require('./../middleware/route-guard');

router.post('/:receiver', routeGuard, (req, res, next) => {
  const { textBody, sender, receiver } = req.body;
  const receiverId = req.params.receiver;
  const senderId = req.user._id;
  Message.create({
    textBody,
    sender: senderId,
    receiver: receiverId
  })

    .then((message) => res.json(message))
    .catch((error) => {
      next(error);
    });
});

router.post('/user/create/:receiver', routeGuard, (req, res, next) => {
  const { textBody, sender, receiver } = req.body;
  const receiverId = req.params.receiver;
  const senderId = req.user._id;
  Message.create({
    textBody,
    sender: senderId,
    receiver: receiverId
  })

    .then((message) => res.json(message))
    .catch((error) => {
      next(error);
    });
});

router.get('/user/:receiver', routeGuard, (req, res, next) => {
  Message.find({})
    .populate('sender')
    .populate('receiver')
    .then((allMessages) => res.json(allMessages))
    .catch((error) => {
      next(error);
    });
});

router.get('/all', routeGuard, (req, res, next) => {
  Message.find({})
    .populate('sender')
    .populate('receiver')
    .then((allMessages) => res.json(allMessages))
    .catch((error) => {
      next(error);
    });
});
module.exports = router;
