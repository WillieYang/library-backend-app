const Book = require('../models/book.model');
const helpers = require('../../utils/helpers');

const createBook = (req, res) => {
  const result = {};
  let status = 201;
  const { name, description, storage } = req.body;
  if (!description) {
    status = 400;
    result.status = status;
    result.error = 'Book description can not be empty';
    res.status(status).send(result);
  }
  const book = new Book({
    name: name || 'Untitled Book',
    description,
    storage,
  });
  book.save((err, book) => {
    if (!err) {
      result.status = status;
      result.result = book;
    } else {
      status = 500;
      result.status = status;
      result.error = err;
    }
    res.status(status).send(result);
  });
};

const getBookList = (req, res) => {
  const result = {};
  let status = 200;
  Book.find({}, (err, books) => {
    if (!err) {
      result.status = status;
      result.result = books;
      res.status(status).send(result);
    } else {
      status = 500;
      result.status = status;
      result.error = err.message;
      res.status(status).send(result);
    }
  });
};

const getBookById = (req, res) => {
  const result = {};
  let status = 200;
  const { bookId } = req.params;
  Book.findById(bookId, (err, book) => {
    if (!err) {
      result.status = status;
      result.result = book;
    } else {
      status = 404;
      result.status = status;
      result.error = err;
    }
    res.status(status).send(result);
  });
};

const updateBookById = (req, res) => {
  const result = {};
  let status = 200;
  const { bookId } = req.params;
  Book.findByIdAndUpdate(bookId, req.body, (err, book) => {
    if (!err) {
      result.status = status;
      result.result = book;
    } else {
      status = 404;
      result.status = status;
      result.error = err;
    }
    res.status(status).send(result);
  });
};

const deleteBookById = (req, res) => {
  const result = {};
  let status = 200;
  const { bookId } = req.params;
  Book.findByIdAndRemove(bookId, (err, book) => {
    if (!err) {
      result.status = status;
      result.message = 'This book has been deleted successfully';
      result.result = book;
    } else {
      status = 404;
      result.status = status;
      result.error = err;
    }
    res.status(status).send(result);
  });
};

exports.createBook = createBook;
exports.getBookList = getBookList;
exports.getBookById = getBookById;
exports.updateBookById = updateBookById;
exports.deleteBookById = deleteBookById;
