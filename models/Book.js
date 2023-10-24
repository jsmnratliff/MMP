const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    pages: Number
},
{
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema); // No need to re-declare 'Book'

module.exports = Book;