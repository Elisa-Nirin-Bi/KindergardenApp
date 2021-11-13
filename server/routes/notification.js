'use strict';

const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const routeGuard = require('../middleware/route-guard');

router.get('/list', (req, res, next) => {
  Notification.find()
    .then((news) => res.json(news))
    .catch((error) => {
      next(error);
    });
});

router.post('/create', (req, res, next) => {
  const { message } = req.body;
  Notification.create({ message })
    .then((news) => res.json(news))
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
