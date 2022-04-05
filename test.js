const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');

fs.readdir('./', (err, files) => {
  files.forEach(file => {
      console.log(file);
  });
});
console.log('TESTING')


try {
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  console.log('=========== REST ======');
  console.log(github.rest);
} catch (error) {
  core.setFailed(error.message);
}