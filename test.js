const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');

const fs = require('fs')
const path = require('path')

console.log('TESTING 1')
const data = fs.readdir(
  path.join(process.env.GITHUB_WORKSPACE, 'data')
)

console.log('data')
console.log(data)


try {
  console.log('TESTING 5')
  // console.log(core)
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const octokit = github.getOctokit(GITHUB_TOKEN);
  // Issue title: github.event.issue.title
  // Issue body: github.event.issue.body

  console.log('=========== REST ======');
  // console.log(github);
  // console.log(octokit);
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);

} catch (error) {
  core.setFailed(error.message);
}