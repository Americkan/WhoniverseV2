const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({
  'usernameField': 'email'
}, (username, password, done) => {
  User.findOne({ email: username}, (err, user) => {
    //Error handling
    if (err) {
      return done(err);
    }
    //If no user is found
    if (!user) {
      return done(null, false, {
        message: 'User not found'
      });
    }

    //Verify password
    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Error Unable to Authenticate'
      });
    }
    //All good
    return done(null, user);
  });
}));
