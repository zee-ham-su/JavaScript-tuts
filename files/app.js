const express = require('express');
const { connectToDb, getDb } = require('./db');

// Create an Express application
const app = express();

// db connection
let db;

// Connect to the database
connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
        db = getDb();
    }
})

// Create a GET route
app.get('/books', (req, res) => {
    res.json('Welcome to the home page!');
})