const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', 'utf8');

readStream.on('data', (chunk) => {
    console.log('--- NEW CHUNK ---');
    console.log(chunk.toString());
});
