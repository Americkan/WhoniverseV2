const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const coreRoutes = require('../modules/core/server/routes');
const planetRoutes = require('../modules/planets/server/routes/planet.server.routes');
const userRoutes = require('../modules/users/server/routes/user.server.routes');
const db = require('./database');


const passport = require('passport');
const User = require('../modules/users/server/models/user.server.model');
const passportConfig = require('./passport');

/**
* @name middleware configuration
* @param Express.App() instance
* @overview Sets various properties for the express app instance
*/
module.exports = (server) => {
  server.use(express.static('public'));
  server.use(express.static('dist'));
  server.use(express.static('public/game/assets'));
  // log requests
  server.use(morgan('combined'));
  // parse x-www-form-urlencoded data
  server.use(bodyParser.urlencoded({ extended: false }));
  // parse json
  server.use(bodyParser.json());
  //use passport config
  server.use(passport.initialize());
  let port = process.env.PORT || 3000;
  server.set('port', port);

  server.use('/api', coreRoutes);
  server.use('/api/planets', planetRoutes);
  server.use('/api/user', userRoutes);


  return server;
};
