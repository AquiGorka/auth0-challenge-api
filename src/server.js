var express = require('express'),
	http = require('http'),
	cors = require('cors')
	jwt = require('express-jwt')
	config = require('../config/webtask.config.js')();

var port = process.argv[2] || process.env.PORT || 8080,
	app = express(),
	api = require('./api.js'),
	jwtCheck = jwt({
		secret: new Buffer(config.secret.secret, 'base64'),
		audience: config.secret.audience
	});

// general middlewares
app.use(cors());
app.use(jwtCheck, function (err, req, res, next) {
	if (err && err.name === 'UnauthorizedError') {
		return res.status(401).send(err.message);
	}
	next();
});


// api routes
app.use('/', api());

//
app.server = http.createServer(app);
app.server.listen(port, function() { console.log('Server listening on port: ', port); });
