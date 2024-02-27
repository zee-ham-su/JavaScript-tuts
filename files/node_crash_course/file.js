const fs = require('fs');

fs.readFile('./docs/blog.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data.toString());
});

console.log('last line');

// reading files

// writing files


// directories


//deleting files