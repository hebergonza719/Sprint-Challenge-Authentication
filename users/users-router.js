const router = require('express').Router();

const Users = require('./users-model.js');

// const restricted = require('../auth/authenticate-middleware.js');

// router.get('/', restricted, (req, res) => {
router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch( err => res.send({ message: "Error contacting database" }));
});

module.exports = router;