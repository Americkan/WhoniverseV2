const express = require('express');
const server = require('../config/middleware')(express());

let port = process.env.PORT || 3000;
server.set('port', port);
server.listen(server.get('port'), () => {
  /* eslint-disable no-alert, no-console */
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = server;
