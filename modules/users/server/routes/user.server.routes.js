const express = require('express');

const router = express.Router();

const jwt = require('express-jwt');
const auth = jwt({
  secret: 'BLUE_BOX',
  userProperty: 'payload'
});

const userController = require('../controllers/user.server.controller');


router.get('/register', (req, res) => {
  res.json({msg: "Register"});
});

router.post('/register', userController.register);

router.get('/profile', auth, userController.profile);

router.post('/login', userController.login);

router.get('/login', (req, res) => {
  res.json({msg: "Login"});
});

router.post('/login', userController.login);

module.exports = router;
