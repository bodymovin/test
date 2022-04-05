const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');

console.log('TESTING 1')
// fs.readdir('./', (err, files) => {
//   files.forEach(file => {
//       console.log(file);
//   });
// });
console.log('TESTING 2')


try {
  console.log('TESTING 3')
  console.log(core)
  // Get the JSON webhook payload for the event that triggered the workflow
  console.log('=========== REST ======');
  console.log(github.rest);
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  console.log('TESTING 4')
} catch (error) {
  core.setFailed(error.message);
}