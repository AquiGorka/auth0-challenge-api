var express = require('express'),
  routes = require('./routes'),
  jwt = require('express-jwt'),
  config = require('../config/webtask.config.js')()
  jwtCheck = jwt({
    secret: new Buffer(config.secret.secret, 'base64'),
    audience: config.secret.audience
  });

// api
module.exports = function() {
  var api = express.Router();

  // middlewares
  api.use(jwtCheck, function (err, req, res, next) {
    if (err && err.name === 'UnauthorizedError') {
      return res.status(401).send(err.message);
    }
    next();
  });

  // routes
  api.use('/', routes());
  return api;
};
