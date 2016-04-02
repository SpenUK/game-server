'use strict';

var mongoose = require('mongoose');
var schema = require('../schemas/entity');

module.exports = mongoose.model('Entity', schema);