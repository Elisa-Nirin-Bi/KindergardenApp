'use strict';

const express = require('express');
const router = express.Router();
const Message = require('./../models/message');
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.json({ type: 'success', data: { title: 'Hello World' } });
});

module.exports = router;
