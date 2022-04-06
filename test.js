const core = require('@actions/core');
const github = require('@actions/github');
const {readdir} = require('fs/promises');
const path = require('path');


console.log('TESTING 1')
async function readFiles() {
  try {
    const data = await readdir(
      path.join(process.env.GITHUB_WORKSPACE, 'data')
    )
  } catch(error) {
    console.log('readFiles error');
    console.log(error);
  }
}

async function run() {
  await readFiles()
  console.log('RUN ENDED')
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
}

run()