const { promises: { readFile } } = require('fs');
const { exec } = require('child_process');

const promiseExec = (command) => (
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        // console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(stderr);
        // console.log(`stderr: ${stderr}`);
        return;
      }
      resolve(stdout);
      // console.log(`stdout: ${stdout}`);
    });
  })
)

// fs.writeFile('./test.txt', 'testing', (err) => {
//   console.log('written');
//   console.log(err);
// });

const callGold = async () => {
  try {
    const result = await promiseExec('goldctl auth --work-dir ./tmp --service-account ./skia2.json');
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  // try {
  //   const result = await promiseExec('goldctl imgtest init --work-dir ./tmp --keys-file ./keys.json --instance foo');
  //   console.log(result);
  // } catch (error) {
  //   console.log(error);
  // }
  try {
    const result = await promiseExec('goldctl whoami --work-dir ./tmp --instance lottie-animation-community');
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const getSecret = async () => {
  try {
    const fileData = await readFile('./test_env.txt', 'utf8');
    return fileData;
  } catch (err) {
    console.log(err);
    return { status: 'failed' };
  }
};

const start = async () => {
  const secret = await getSecret();
  console.log(secret);
};

console.log(process.env.TEST_SECRET);
console.log(process.env.TEST_SECRETS);
start();
// callGold();
