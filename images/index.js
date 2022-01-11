// const fs = require('fs');
const { exec } = require('child_process');

// fs.writeFile('./test.txt', 'testing', (err) => {
//   console.log('written');
//   console.log(err);
// });

exec('goldctl', (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
