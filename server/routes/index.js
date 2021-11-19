'use strict';

const express = require('express');
const router = express.Router();
const User = require('./../models/user');

const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.json({ type: 'success', data: { title: 'Hello World' } });
});

router.get('/users', (req, res, next) => {
  User.find()
    .then((allUsers) => res.json(allUsers))
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
