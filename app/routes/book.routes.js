const books = require('../controllers/book.controller.js');
const helpers = require('../../utils/helpers');

module.exports = (app) => {
  app.post('/books', helpers.validateToken, books.createBook);

  app.get('/books', helpers.validateToken, books.getBookList);

  app.get('/books/:bookId', helpers.validateToken, books.getBookById);

  app.put('/books/:bookId', helpers.validateToken, books.updateBookById);

  app.delete('/books/:bookId', helpers.validateToken, books.deleteBookById);
};
