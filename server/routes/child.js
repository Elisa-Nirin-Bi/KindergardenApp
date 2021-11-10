const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const Child = require('./../models/child');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

router.post('/create', (req, res, next) => {
  const { name, address, emergencyContactNumber } = req.body;
  Child.create({
    name,
    address,
    emergencyContactNumber
  })

    .then((response) => res.json(response))
    .catch((error) => {
      next(error);
    });
});

router.get('/list', (req, res, next) => {
  Child.find()
    .then((allChildren) => res.json(allChildren))
    .catch((error) => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Child.findById(id)
    .then((child) => {
      res.json({ child });
    })
    .catch((error) => {
      next(error);
    });
});

router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, address, emergencyContactNumber } = req.body;
  Child.findByIdAndUpdate(id, { name, address, emergencyContactNumber })
    .then((child) => {
      res.json({ child: child });
    })
    .catch((error) => {
      next(error);
    });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Child.findByIdAndRemove(id)
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
