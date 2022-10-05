import * as github from '@actions/github';
import yargs from 'yargs';

function getTestPayload(player) {
  if(player === 'lottie-web' || player === 'skottie') {
    return {
      player,
    }
  }
}

async function run() {
  try {
    console.log('Running test');
    // const token = 'a';
    const argv = yargs(process.argv).argv
    const secretToken = process.env.GITHUB_TOKEN || 'none secret';
    const octokit = github.getOctokit(secretToken);
    const payload = getTestPayload(argv.player);
    console.log('payload', payload)
    if (payload) {
      const result = await octokit.rest.repos.createDispatchEvent({
        owner: 'bodymovin',
        repo: 'test',
        event_type: 'trigger-test',
        client_payload: {},
      });
      console.log('result', result);
    }
  } catch (error) {
    console.log('RUN ERROR: ', error);
  }
}

try {
  run();
} catch (error) {
  console.log('FAILED', error);
}
