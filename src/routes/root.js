'use strict';

let express = require('express');

let router = express.Router();

router.get('/', (request, response) => response.sendStatus(200));

module.exports = router;
