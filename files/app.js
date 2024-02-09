const express = require('express');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

// Create an Express application
const app = express(); // create an express app
app.use(express.json()); // use the json middleware to parse the request body

// db connection
let db;

// Connect to the database
connectToDb((err) => {
    if (!err) {
        app.listen(5000, () => { // listen on port 5000
            console.log('Server is running on port 5000');
        });
        db = getDb(); // get the database object
    }
})
// Create a GET route
app.get('/books', (req, res) => {
    const page = req.query.p || 0 // get the page number from the query string or use 0 if it's not provided
    const booksPerPage = 3 // number of books to show per page

    // find all books in the database
    let books = [];
    
    db.collection('books')
        .find() // find all books
        .sort({ author: 1 }) // sort by author name
        .skip(page * booksPerPage) // skip the first n books
        .limit(booksPerPage) // limit the number of books to n
        .forEach(book => books.push(book)) // push each book to the books array
        .then(() => { // when the forEach is done
            res.status(200).json(books); // send the books array as a JSON response
        })
        .catch(() => { // if there is an error
            // send a 500 Internal Server Error response
            res.status(500).json({ error: 'Could not fetch the documents' });
        })
});

app.get('/books/:id', (req, res) => { // get a book by id
    // check if the id is valid
    if (ObjectId.isValid(req.params.id)) { // if the id is valid
        db.collection('books') // get the books collection
        .findOne({ _id: new ObjectId(req.params.id) }) // find the book with the given id
        .then(doc => {  // when the book is found
            if (doc) { // if the book exists
                res.status(200).json(doc); //
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'Could not fetch the document' });
        });
    } else {
        res.status(400).json({ error: 'Invalid ID' });
    }

})

app.post('/books', (req, res) => {
    const book = req.body;
    db.collection('books')
        .insertOne(book)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({err: 'Could not create a new document'})
        })

})

app.delete('/books/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .deleteOne({ _id: new ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not delete the document' });
        });
    } else {
        res.status(400).json({ error: 'Invalid ID' });
    }
});

app.patch('/books/:id', (req, res) => {
    const updates = req.body
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
        .updateOne({ _id: new ObjectId(req.params.id)}, {$set: updates})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not update the document' });
        });
    } else {
        res.status(400).json({ error: 'Invalid ID' });
    }

})