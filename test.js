const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');

console.log('TESTING PR2')
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
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const octokit = github.getOctokit(GITHUB_TOKEN);
  // Get the JSON webhook payload for the event that triggered the workflow
  console.log('=========== REST ======');
  // console.log(github);
  // console.log(octokit);
  console.log(github.context.payload);
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  console.log('TESTING 4')
} catch (error) {
  core.setFailed(error.message);
}