const express = require('express');

const router = express.Router();

const planetController = require('../controllers/planet.server.controller');

// Planets
router.get('/list', planetController.list);
router.post('/create', planetController.create);
router.get('/show/:planet_name', planetController.show);
router.get('/new', planetController.new);
router.put('/update/:planet_id', planetController.update);
router.delete('/delete/:planet_id', planetController.delete);

//TODO
//Create routes for episodes, doctors, companions, aliens
module.exports = router;
