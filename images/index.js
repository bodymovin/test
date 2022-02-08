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
      if (stdout) {
        resolve(stdout);
        return;
      }
      reject(stderr);
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

  try {
    const githubCommit = 'c31c67181b079b0f596dcc13d82c269096a19194' || process.env.GITHUB_SHA;
    // const githubCommit = process.env.GITHUB_SHA || '0d36a81a2c37216f5c2a3120af92ade5bce032ea';
    console.log('githubCommit', githubCommit);
    const result = await promiseExec(`goldctl imgtest init --work-dir ./tmp --commit ${githubCommit} --keys-file ./keys.json --instance lottie-animation-community --bucket lottie-animation-community-tests`);
    console.log(result);
  } catch (error) {
    // console.log(error);
  }

  try {
    const result = await promiseExec('goldctl imgtest add --work-dir ./tmp --test-name "rectangle" --png-file "./rectangleAnimated.png"');
    console.log(result);
  } catch (error) {
    // console.log('step1', error);
  }

  try {
    const result = await promiseExec('goldctl imgtest add --work-dir ./tmp --test-name "image" --png-file "./image.png"');
    console.log(result);
  } catch (error) {
    // console.log('step2', error);
  }

  try {
    const result = await promiseExec('goldctl imgtest finalize --work-dir ./tmp');
    console.log(result);
  } catch (error) {
    // console.log('step3', error);
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
};

start();
