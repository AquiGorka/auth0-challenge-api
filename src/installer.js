var express = require('express'),
	Repository = require('./repository.js'),
	Service = require('./service.js'),
	Controller = require('./controller.js');

module.exports = function() {
	var route = express.Router();
	var repository = new Repository();
	var service = new Service(repository);
	var controller = new Controller(service);
	//
	route.get('/', controller.getAll);
	route.get('/:id', controller.get);
	return route;
};