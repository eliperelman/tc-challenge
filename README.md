# Taskcluster Challenge!

This repo is npm-based. To run, please clone this repository, install the dependencies, and run:

```sh
git clone https://github.com/eliperelman/tc-challenge.git
npm install
npm start
```

This will launch a web server running on port 4000. Open your browser to `http://localhost:4000` to run the demo app.

> NOTE: This demo is also running on Heroku at: https://eliperelman-tc-challenge.herokuapp.com/

You can also `curl` the endpoint directly to examine the JSON output:

```sh
# endpoint:
# curl -X GET 'http://localhost:4000/tasks/<TASK GRAPH ID>/task-states'

# example:
curl -X GET 'http://localhost:4000/tasks/O6pKa79XTaKDyDv5vGH51A/task-states'

# example from the Heroku demo site:
curl -X GET 'https://eliperelman-tc-challenge.herokuapp.com/tasks/O6pKa79XTaKDyDv5vGH51A/task-states'
```

To run tests, be sure you have the dev dependencies installed, and run:

```sh
npm test
```
