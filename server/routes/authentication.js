'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const Child = require('./../models/child');
const router = new Router();

router.post('/sign-up', (req, res, next) => {
  const { name, email, password, role } = req.body;
  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        email,
        passwordHashAndSalt: hash,
        role: 'teacher'
      });
    })
    .then((user) => {
      req.session.userId = user._id;
      res.json({ user });
    })
    .catch((error) => {
      next(error);
    });
});

router.patch('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      return User.findByIdAndUpdate(id, {
        name,
        email,
        passwordHashAndSalt: hash,
        role: 'teacher'
      });
    })
    .then((user) => {
      req.session.userId = user._id;
      res.json({ user });
    })
    .catch((error) => {
      next(error);
    });
});

router.patch('/parent/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      return User.findByIdAndUpdate(id, {
        name,
        email,
        passwordHashAndSalt: hash,
        role: 'parent'
      });
    })
    .then((user) => {
      req.session.userId = user._id;
      res.json({ user });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/parent/sign-up', (req, res, next) => {
  const { name, email, password, role } = req.body;
  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        email,
        passwordHashAndSalt: hash,
        role: 'parent'
      });
    })
    .then((user) => {
      req.session.userId = user._id;
      res.json({ user });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  console.log('email in the server');
  console.log(email);
  console.log('password in the server');
  console.log(password);
  User.findOne({ email })
    // .populate('child')
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHashAndSalt);
      }
    })
    .then((result) => {
      if (result) {
        req.session.userId = user._id;
        res.json({ user });
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.json({});
});

router.get('/me', (req, res, next) => {
  const user = req.user;
  res.json({ user });
});
module.exports = router;
