const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const Child = require('./../models/child');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

// to create child profile

router.post('/create', routeGuard, (req, res, next) => {
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

// to find all children profiles

router.get('/list', routeGuard, (req, res, next) => {
  Child.find()
    .then((allChildren) => res.json(allChildren))
    .catch((error) => {
      next(error);
    });
});

// to find one child profile

router.get('/:id', routeGuard, (req, res, next) => {
  const { id } = req.params;
  Child.findById(id)
    .populate('parent')
    .then((child) => {
      res.json({ child });
    })
    .catch((error) => {
      next(error);
    });
});

// to update a child profile

router.patch('/:id', routeGuard, (req, res, next) => {
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

// to delete a child profile

router.delete('/:id', routeGuard, (req, res, next) => {
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
