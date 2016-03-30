'use strict';

let middleware = (request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
  response.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
};

module.exports = () => middleware;
