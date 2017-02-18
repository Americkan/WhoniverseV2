/**
* Database configuration settings
* @return db connection instance
*/
const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/whoniverse');

module.exports = db;
