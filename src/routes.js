var express = require('express'),
	installer = require('./installer.js');

// routes
module.exports = function() {
	var routes = express.Router();
	routes.use('/', installer());
	return routes;
};