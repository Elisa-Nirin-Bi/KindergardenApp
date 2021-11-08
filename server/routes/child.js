const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const Child = require('./../models/child');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/profile', routeGuard, (req, res, next) => {
  res.json({ type: 'success', data: { title: 'Hello World' } });
});

module.exports = router;
