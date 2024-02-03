const express = require('express');

// Create an Express application
const app = express();

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

// Create a GET route
app.get('/books', (req, res) => {
    res.json('Welcome to the home page!');
})