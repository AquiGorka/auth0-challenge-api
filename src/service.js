var Service = function(repository) {
	this.repository = repository;
};

Service.prototype.getAll = function() {
	return this.repository.getAll();
};
Service.prototype.get = function(id) {
	return this.repository.get(id);
};

module.exports = Service;