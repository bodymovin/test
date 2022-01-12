const { promises: { readFile } } = require('fs');
const fs = require('fs');
const { exec } = require('child_process');

const promiseExec = (command) => (
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      if (stderr) {
        reject(stderr);
        return;
      }
      resolve(stdout);
    });
  })
);

const promiseWrite = (file, content) => (
  new Promise((resolve, reject) => {
    fs.writeFile(file, content, (err, success) => {
      if (err) {
        reject(err);
      } else {
        resolve(success);
      }
    });
  })
);


const callGold = async () => {
  try {
    const result = await promiseExec('goldctl auth --work-dir ./tmp --service-account ./secret.json');
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  // try {
  //   const result = await promiseExec('goldctl whoami --work-dir ./tmp --instance lottie-animation-community');
  //   console.log(result);
  // } catch (error) {
  //   console.log(error);
  // }
  try {
    const githubCommit = process.env.GITHUB_SHA || 'abcd';
    console.log('githubCommit', githubCommit);
    const result = await promiseExec(`goldctl imgtest init --work-dir ./tmp --commit_id ${githubCommit} --keys-file ./keys.json --instance lottie-animation-community`);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const getSecret = async () => {
  try {
    const fileData = await readFile('./secret.json', 'utf8');
    const storageKey = JSON.parse(fileData);
    return storageKey;
  } catch (err) {
    console.log(err);
    return { status: 'failed' };
  }
};

const writeSecret = async () => {
  try {
    const googleEnvSecret = process.env.GOOGLE_SECRET;
    const keyString = Buffer.from(googleEnvSecret, 'base64').toString('ascii');
    await promiseWrite('./secret.json', keyString);
    return true;
  } catch (err) {
    return { status: 'failed' };
  }
};

const start = async () => {
  await writeSecret();
  await getSecret();
  await callGold();

start();
