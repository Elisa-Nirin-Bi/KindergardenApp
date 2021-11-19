const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const Message = require('./../models/message');
const routeGuard = require('./../middleware/route-guard');

router.post('/:receiver', (req, res, next) => {
  const { textBody, sender, receiver } = req.body;
  const receiverUser = req.params.receiver;

  Message.create({
    textBody,
    sender: req.user._id,
    receiver: receiverUser
  })

    .then((message) => res.json(message))
    .catch((error) => {
      next(error);
    });
});

router.get('/:receiver', routeGuard, (req, res, next) => {
  Message.find({
    $or: [
      { sender: req.user._id, receiver: req.params.id },
      { sender: req.params.receiver, receiver: req.user._id }
    ]
  })
    .then((allMessages) => res.json(allMessages))
    .catch((error) => {
      next(error);
    });
});
module.exports = router;
