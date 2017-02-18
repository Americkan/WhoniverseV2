const passport = require('passport');
const User = require('../models/user.server.model');

exports.register = (req, res) => {
  let user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save((err) => {
    if (err) {
      res.status(500).json({err});
    }
    let token;
    token = user.generateJwt();
    res.status(200).json({token});
  });
};


exports.login = (req, res) => {

  passport.authenticate('local', (err, user, info) => {
    let token;
    if (err) {
      return res.status(404).json(err);
    }
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      })
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};


exports.profile = (req, res) => {
  if (!req.payload._id) {
    res.status(401).json({
      message: "UnauthorizedError: Invalid Credentials"
    });
  } else {
    User.findById(req.payload._id)
    .exec((err, user) => {
      if (err) {
        res.status(404).json({err});
      }
      res.status(200).json(user);
    });
  }
};
