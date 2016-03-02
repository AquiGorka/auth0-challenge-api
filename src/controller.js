var utils = require('./utils.js');

module.exports = function(service) {
	this.service = service;
	this.getAll = utils.resourceHandler( function(req) { return service.getAll(); });
	this.get = utils.resourceHandler( function(req) { return service.get(req.params.id); });
};