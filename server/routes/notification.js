/*const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const routeGuard = require('../middleware/route-guard');
const Child = require('./../models/child');
const fileUploader = require('./../middleware/file-upload');

router.get('/movies', (req, res, next) => {
  Notification.find()
    .then((moviesFromDB) => res.status(200).json(moviesFromDB))
    .catch((err) => next(err));
});

router.post('/upload', fileUploader.single('imageUrl'), (req, res, next) => {
  console.log(req.file);

  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }

  res.json({ secure_url: req.file.path });
});

router.post('/create', (req, res, next) => {
  Notification.create(req.body)
    .then((newlyCreatedMovieFromDB) => {
      // console.log('Created new movie: ', newlyCreatedMovieFromDB);
      res.status(200).json(newlyCreatedMovieFromDB);
    })
    .catch((err) => next(err));
});

module.exports = router;*/
