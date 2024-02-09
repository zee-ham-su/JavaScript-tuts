const express = require('express');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');

// Create an Express application
const app = express();
app.use(express.json());

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
    const page = req.query.page || 0
    const booksPerPage = 3
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