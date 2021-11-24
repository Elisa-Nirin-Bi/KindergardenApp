const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const Child = require('./../models/child');
const router = new Router();
const User = require('./../models/user');
const routeGuard = require('../middleware/route-guard');
const Notification = require('../models/notification');
const fileUploader = require('./../middleware/file-upload');

// to create child profile

router.post('/create', routeGuard, (req, res, next) => {
  console.log('we got the route of the createChild');
  const { name, address, emergencyContactNumber, parent } = req.body;
  Child.create({
    name,
    address,
    emergencyContactNumber,
    parent
  })
    .then((kid) => {
      return User.findByIdAndUpdate(parent, {
        $push: { child: kid._id }
      });
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

router.get('/:id/notification', routeGuard, (req, res, next) => {
  Notification.find()
    .populate('child')
    .then((notification) => res.status(200).json(notification))
    .catch((err) => next(err));
});

router.get('/:id/allnotification', (req, res, next) => {
  console.log('testallnotifications');
  console.log(req.params);
  Notification.find({ childProfile: req.params.id })
    .then((notification) => res.status(200).json(notification))
    .catch((err) => next(err));
});

router.post(
  '/:id/upload',
  fileUploader.single('imageUrl'),
  (req, res, next) => {
    console.log(req.file);

    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }

    res.json({ secure_url: req.file.path });
  }
);

router.post('/:id/create-notification', (req, res, next) => {
  const childProfile = req.params.id;
  const { message, imageUrl } = req.body;
  Notification.create({ message, imageUrl, childProfile })
    .then((newNotification) => {
      res.status(200).json(newNotification);
    })
    .catch((err) => next(err));
});

module.exports = router;
