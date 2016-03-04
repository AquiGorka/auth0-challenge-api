var express = require('express'),
	http = require('http')
  cors = require('cors');

var port = process.argv[2] || process.env.PORT || 8080,
	app = express(),
	api = require('./api.js');


// local middlewares
api.use(cors());

// api routes
app.use('/', api());

//
app.server = http.createServer(app);
app.server.listen(port, function() { console.log('Server listening on port: ', port); });
