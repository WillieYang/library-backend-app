const Book = require('../models/book.model');
const helpers = require('../../utils/helpers');

const createBook = (req, res) => { helpers.createCustomItem(req, res, Book); };

const getBookList = (req, res) => { helpers.getCustomItemList(req, res, Book); };

const getBookById = (req, res) => { helpers.getCustomItemById(req, res, Book); };

const updateBookById = (req, res) => { helpers.updateCustomItemById(req, res, Book); };

const deleteBookById = (req, res) => { helpers.deleteCustomItemById(req, res, Book); };

exports.createBook = createBook;
exports.getBookList = getBookList;
exports.getBookById = getBookById;
exports.updateBookById = updateBookById;
exports.deleteBookById = deleteBookById;
