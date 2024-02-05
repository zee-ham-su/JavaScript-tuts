const express = require('express');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

// Create an Express application
const app = express();

// db connection
let db;

// Connect to the database
connectToDb((err) => {
    if (!err) {
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
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

app.get('/books/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .findOne({ _id: new ObjectId(req.params.id) })
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the document' });
        });
    } else {
        res.status(400).json({ error: 'Invalid ID' });
    }

})