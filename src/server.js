// utils
var toJSON = function(data) {
	return data.map(function(item) {
		return csvJSON(item);
	});
}
var csvJSON = function(csv) {
	var lines=csv.split("\r"),
		result = [],
		headers=lines[0].split(",");
	for(var i=1;i<lines.length;i++){
		var obj = {},
			currentline=lines[i].split(",");
		for(var j=0;j<headers.length;j++){
			obj[headers[j]] = currentline[j];
		}
		result.push(obj);
	}
	return result;
};

// server
var express = require('express'),
	app = express(),
	rp = require('request-promise'),
	cors = require('cors'),
	port = process.argv[2] || process.env.PORT || 8080;

//
app.use(cors());

// routes
app.get('/top-100', function(req, res) {
	// https://storage.googleapis.com/aquigorkanet-auth0-csv/top_100_failed_because_of_password.csv
	// https://storage.googleapis.com/aquigorkanet-auth0-csv/top_100_failed_usernames.csv
	// https://storage.googleapis.com/aquigorkanet-auth0-csv/top_100_users_with_more_logins.csv

	// read from files
	Promise.all([
			rp('https://storage.googleapis.com/aquigorkanet-auth0-csv/top_100_failed_because_of_password.csv'),
			rp('https://storage.googleapis.com/aquigorkanet-auth0-csv/top_100_failed_usernames.csv'),
			rp('https://storage.googleapis.com/aquigorkanet-auth0-csv/top_100_users_with_more_logins.csv')
		])
		.then(toJSON)
		.then(function(data) {
			return {
				'passwordFailure': data[0],
				'usernameFailure': data[1],
				'loginCount': data[2]
			};
		})
		.then(function (data) {
			// return json
			//console.log(data)
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		})
		.catch(function(err) {
			// return err
			console.log(err);
			res.status(520).send('Something went wrong on our side: ' + err);
		});
});
app.get('/top-100/password-failure', function(req, res) {
	rp('https://storage.googleapis.com/aquigorkanet-auth0-csv/top_100_failed_usernames.csv')
		.then(csvJSON)
		.then(function (data) {
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		})
		.catch(function(err) {
			// return err
			console.log(err);
			res.status(520).send('Something went wrong on our side: ' + err);
		});
});
app.get('/top-100/username-failure', function(req, res) {
	rp('https://storage.googleapis.com/aquigorkanet-auth0-csv/top_100_failed_because_of_password.csv')
		.then(csvJSON)
		.then(function (data) {
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		})
		.catch(function(err) {
			// return err
			console.log(err);
			res.status(520).send('Something went wrong on our side: ' + err);
		});
});
app.get('/top-100/login-count', function(req, res) {
	rp('https://storage.googleapis.com/aquigorkanet-auth0-csv/top_100_users_with_more_logins.csv')
		.then(csvJSON)
		.then(function (data) {
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		})
		.catch(function(err) {
			// return err
			console.log(err);
			res.status(520).send('Something went wrong on our side: ' + err);
		});
});

app.listen(port, function(){ console.log('Server listening on port: ', port); });
