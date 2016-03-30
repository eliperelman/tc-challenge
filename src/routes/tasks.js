'use strict';

let express = require('express');
let fetch = require('../fetch');
let transformer = require('../transformer');

const SERVICE_BASE = 'https://scheduler.taskcluster.net/v1';

let errorHandler = (response) => {
  return (err) => {
    // Output stack to log
    console.error(err.stack || err);

    // Send just error message to user
    response
      .status(500)
      .send(err.message || err);
  };
};
let router = express.Router();

/**
 * Inspect a particular Task Graph ID from the Taskcluster API
 */
router.get('/:id/task-states', (request, response) => {
  let url = `${SERVICE_BASE}/task-graph/${request.params.id}/inspect`;
  let transform = transformer(url);

  fetch('GET', url)
    .end()
    .then(r => transform(r.body.tasks))
    .then(data => response.json(data))
    .catch(errorHandler(response));
});

module.exports = router;
