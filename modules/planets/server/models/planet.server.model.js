const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const planetSchema = Schema({
  name: String,
});

module.exports = mongoose.model('Planet', planetSchema);
