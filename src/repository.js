var rp = require('request-promise'),
	utils = require('./utils.js');

// Repository
var Repository = function() {};

Repository.prototype.getAll = function() {
	// read from all files
	return Promise.all([
		rp('https://storage.googleapis.com/aquigorkanet-auth0-csv/top_100_failed_because_of_password.csv'),
		rp('https://storage.googleapis.com/aquigorkanet-auth0-csv/top_100_failed_usernames.csv'),
		rp('https://storage.googleapis.com/aquigorkanet-auth0-csv/top_100_users_with_more_logins.csv')
	])
	.then(utils.toJSON)
	.then(function(data) {
		return {
			'passwordFailure': data[0],
			'usernameFailure': data[1],
			'loginCount': data[2]
		};
	});
};
Repository.prototype.get = function(id) {
	var prom = Promise.reject({status: 400, message:'Bad request'});
	switch(id) {
		case 'password-failure':
			prom = rp('https://storage.googleapis.com/aquigorkanet-auth0-csv/top_100_failed_because_of_password.csv').then(utils.csvJSON);
			break;
		case 'username-failure':
			prom = rp('https://storage.googleapis.com/aquigorkanet-auth0-csv/top_100_failed_usernames.csv').then(utils.csvJSON);
			break;
		case 'login-count':
			prom = rp('https://storage.googleapis.com/aquigorkanet-auth0-csv/top_100_users_with_more_logins.csv').then(utils.csvJSON);
			break;	
	}
	return prom;
};

module.exports = Repository;