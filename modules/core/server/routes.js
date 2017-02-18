const path = require('path');

const express = require('express');

const PlanetRouter = require('../../planets/server/routes/planet.server.routes');

const router = express.Router();

//TODO
//Send landing page
router.get('/', (req, res) => {
  res.json({msg: "This is landing page"});
});

router.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../../public/game.html'));
});

module.exports = router;
