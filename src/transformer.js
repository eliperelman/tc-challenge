'use strict';

let fetch = require('./fetch');

/**
 * Convert a Taskcluster inspect payload to a map of task states
 * @param payload
 */
module.exports = (url) => {
  return function transform(payload) {
    return new Promise((resolve, reject) => {
      let collection = [];
      let requests = [];

      payload.forEach(item => {
        let task = {
          id: item.taskId,
          state: item.state,
          tasks: []
        };

        collection.push(task);

        if (!item.dependents || !item.dependents.length) {
          return;
        }

        requests = item.dependents.map(taskId => {
          return fetch('GET', `${url}/${taskId}`)
            .end()
            .then(r => transform([r.body]))
            .then(t => task.tasks = t);
        });
      });

      Promise
        .all(requests)
        .then(() => resolve(collection))
        .catch(reject);
    });
  };
};
