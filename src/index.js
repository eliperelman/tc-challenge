'use strict';

let bodyParser = require('body-parser');
let cors = require('./cors');
let express = require('express');
let http = require('http');

let server;

let start = exports.start = () => {
  let app = express();

  app.use(bodyParser.json());
  app.use(cors());
  app.use('/tasks', require('./routes/tasks'));
  app.use(express.static('public'));

  server = http.createServer(app);
  server.listen(process.env.PORT || 4000);
};

exports.stop = () => {
  server.close();
};

if (require.main === module) {
  start();
}
