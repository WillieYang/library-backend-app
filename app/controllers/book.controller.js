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

const getBookList = (req, res) => { helpers.getCustomItemList(req, res, Book); };

const getBookById = (req, res) => { helpers.getCustomItemById(req, res, Book); };

const updateBookById = (req, res) => { helpers.updateCustomItemById(req, res, Book); };

const deleteBookById = (req, res) => { helpers.deleteCustomItemById(req, res, Book); };

exports.createBook = createBook;
exports.getBookList = getBookList;
exports.getBookById = getBookById;
exports.updateBookById = updateBookById;
exports.deleteBookById = deleteBookById;
