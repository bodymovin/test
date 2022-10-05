import * as core from '@actions/core';
import * as github from '@actions/github';
import yargs from 'yargs';

async function run() {
  try {
    console.log('Running test');
    const player = core.getInput('player');
    console.log('playerplayer', player);
    console.log('=== process.arg ===');
    console.log(process.argv);
    // const token = 'a';
    const argv = yargs(process.argv).argv
    console.log('==== argv ====')
    console.log(argv)
    const secretToken = process.env.GITHUB_TOKEN || 'none secret';
    console.log('secretToken', secretToken.length);
    const octokit = github.getOctokit(secretToken);
    console.log(typeof octokit);
    const result = await octokit.rest.repos.createDispatchEvent({
      owner: 'bodymovin',
      repo: 'test',
      event_type: 'trigger-test',
      client_payload: {},
    });
    console.log('result', result);
  } catch (error) {
    console.log('RUN ERROR: ', error);
  }
}

try {
  run();
} catch (error) {
  console.log('FAILED', error);
}
