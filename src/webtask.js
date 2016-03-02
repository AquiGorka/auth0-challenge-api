var express = require('express'),
	app = express(),
	Webtask = require('webtask-tools'),
	api = require('./api.js');
	
app.use('/', api());

module.exports = Webtask.fromExpress(app);