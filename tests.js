'use strict';

let chai = require('chai');
let service = require('./src');
let fetch = require('./src/fetch');
let tcpPortUsed = require('tcp-port-used');

const PORT = 4000;

chai.should();

suiteSetup(() => {
  service.start();
  return tcpPortUsed.waitUntilUsed(PORT);
});

suiteTeardown(() => {
  service.stop();
  return tcpPortUsed.waitUntilFree(PORT);
});

suite('test endpoint validity', () => {
  let data;

  suiteSetup(() => {
    const TASK_GRAPH_ID = 'O6pKa79XTaKDyDv5vGH51A';
    return fetch('GET', `http://localhost:${PORT}/tasks/${TASK_GRAPH_ID}/task-states`)
      .end()
      .then(r => data = r.body);
  });

  test('should be an array', () => {
    data.should.be.instanceof(Array);
  });

  test('should have inputted data', () => {
    data.should.be.length(346);
  });

  test('should contain nested task data', () => {
    let subtask = data.find(t => t.id === 'CZd0YzqdSJOXMiXj8JoiIQ');

    subtask.should.not.be.undefined;
    subtask.tasks.should.not.be.empty;
  });
});