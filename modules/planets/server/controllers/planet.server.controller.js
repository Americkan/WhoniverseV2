const Planet = require('../models/planet.server.model');
/**
* @function A list of planets
*/
exports.list = (req, res) => {
  Planet.find((err, planets) => {
    if (err) res.send(err);
    res.json(planets);
  });
};
/**
* @function create new planet
*/
exports.create = (req, res) => {
  const planet = new Planet();
  planet.name = req.body.name;
  planet.save((err) => {
    if (err) res.send(err);
    res.json({ msg: 'Planet Created' });
  });
};
/**
* @function get single planet
*/
exports.show = (req, res) => {
  Planet.findOne({
    name: req.params.planet_name
  }, (err, planet) => {
    if (err) res.send(err);
    res.json(planet);
  });
};

/**
* @function get new planet
*/
exports.new = (req, res) => {
  const planet = new Planet();
  res.json(planet);
};

/**
* @function update planet
*/
exports.update = (req, res) => {
  Planet.findById(req.params.planet_id, (err, planet) => {
    if (err) res.send(err);
    planet.name = req.body.name;
    res.json(planet);
  });
};
/**
* @function delete planet
*/
exports.delete = (req, res) => {
  Planet.remove({
    _id: req.params.id,
  }, (err) => {
    if (err) res.send(err);
    res.json({ msg: 'Planet deleted' });
  });
};
