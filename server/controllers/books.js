//<!-- Iris Guillermo |300700757 | October 20, 2022 -->

// define the book model
import { render } from 'ejs';
import books from '../models/books.js';
import booksModel from '../models/books.js';

/* GET books List page. READ */
export function displayBookList(req, res, next) {
    // find all books in the books collection
    booksModel.find((err, booksCollection) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Book List', page: 'books/list', books: booksCollection });
    });
}
//start here for video demo
//  GET the Book Details page in order to add a new Book
export function displayAddPage(req, res, next) {
    res.render('index', {title: 'Add Books', page: 'books/add', books: {}});
}

// POST process the Book Details page and create a new Book - CREATE
export function processAddPage(req, res, next) {
    let newBook = booksModel({
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
    });

    booksModel.create(newBook, (err, Books) => {
        if (err){
            console.error(err);
            res.end(err);
        };
        res.redirect('/books/list')
    })
}

// GET the Book Details page in order to edit an existing Book
export function displayEditPage(req, res, next) {
    let id = req.params.id;

    booksModel.findById(id, (err, books) =>{
        if (err){
            console.error(err);
            red.end(err);
        }
        res.render('index', {title: 'Edit Books', page: 'books/edit', books: books})
    })
}

// POST - process the information passed from the details form and update the document
export function processEditPage(req, res, next) {
    let newBook = booksModel({
        name: req.body.name,
        author: req.body.author,
        published: req.body.published,
        description: req.body.description,
        price: req.body.price
    });

    booksModel.create(newBook, (err, Books) => {
        if (err){
            console.error(err);
            res.end(err);
        };
        res.redirect('/books/list')
    })
}

// GET - process the delete by user id
export function processDelete(req, res, next) {
    let id = req.params.id;

    booksModel.remove({_id: id}, (err) => {
        if (err){
            console.error(err);
            res.end(err);
        }
        res.redirect('/books/list');
    })
}