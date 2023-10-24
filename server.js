const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const Book = require('./models/Book.js');
require('dotenv').config();
require('./config/db.js');
const PORT = 3001;

const app = express();

// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());
// END MIDDLEWARE //

// START ROUTES //

// GET all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching books' });
    }
});

// POST - Create a new book
app.post('/books', async (req, res) => {
    try {
        const newBook = await Book.create(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'Error creating book' });
    }
});

// GET a specific book by ID
app.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book' });
    }
});

// PUT - Update a book by ID
app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: 'Error updating book' });
    }
});

// PATCH - Partially update a book by ID
app.patch('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: 'Error updating book' });
    }
});

// DELETE - Delete a book by ID
app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await Book.findByIdAndRemove(id);
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(deletedBook);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting book' });
    }
});

// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});