var express = require('express'),
	http = require('http'),
	cors = require('cors')
	jwt = require('express-jwt');

var port = process.argv[2] || process.env.PORT || 8080,
	app = express(),
	api = require('./api.js'),
	jwtCheck = jwt({
		secret: new Buffer('', 'base64'),
		audience: ''
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
