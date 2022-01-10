const fs = require('fs');

fs.writeFile('./test.txt', 'testing', (err) => {
  console.log('written');
  console.log(err);
});
