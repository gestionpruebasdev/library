const express = require('express');
const moment = require('moment');
const Book = require('../models/Book');

const app = express();

app.get('/time', (req, res) => {
    let time = (new Date(Date.now()));
    res.json({ ok: true, time: moment(time).format('LTS')});
});

app.post('/book/create', (req, res) => {

    let { title, pages, year, isbn, author } = req.body;
    let book = new Book(title, pages, year, isbn, author);

    let created = book.create(book);

    res.json({ status: true, message: created });
});

app.get('/book/list', (req, res) => {

    let book = new Book();
    let listBooks = book.find();

    res.json({ status: true, listBooks });
});

app.get('/book/:isbn', (req, res) => {

    let isbn = req.params.isbn;
    let book = new Book();
    let bookByISBN = book.findISBN(isbn);

    res.json({ status: true, book: bookByISBN });

})

app.delete('/book/delete/:isbn', (req, res) => {

    let isbn = req.params.isbn;
    let book = new Book();
    let message = book.delete(isbn);

    res.json({ status: true, message });

});

app.put('/book/update/:isbn', (req, res)=>{

    let {title, pages, year, autor} = req.body;
    let isbn = req.params.isbn;
    let book = new Book(title, pages, year, isbn, autor);
    let message = book.update(isbn, book);

    res.json({status: true, message});

});

module.exports = app;