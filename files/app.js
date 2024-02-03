const express = require('express');
const { connectToDb, getDb } = require('./db');

// Create an Express application
const app = express();

// db connection
let db;

// Connect to the database
connectToDb((err) => {
    if (!err) {
        app.listen(5000, () => {
            console.log('Server is running on port 3000');
        });
        db = getDb();
    }
})

// Create a GET route
app.get('/books', (req, res) => {
    let books = [];
    db.collection('books')
        .find() // find all books
        .sort({ author: 1 }) // sort by author name
        .forEach(book => books.push(book)) // push each book to the books array
        .then(() => {
            res.status(200).json(books);
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the documents' });
        })
});