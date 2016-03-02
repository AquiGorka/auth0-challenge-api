var express = require('express'),
	routes = require('./routes');

// api
module.exports = function() {
  	var api = express.Router();
	api.use('/', routes());
  	return api;
};