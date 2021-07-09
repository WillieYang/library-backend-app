const books = require('../controllers/book.controller.js');

module.exports = (app) => {
  // Create a new book
  app.post('/books', books.createBook);

  // Retrieve all books
  app.get('/books', books.getBookList);

  // Retrieve a single book with bookId
  app.get('/books/:bookId', books.getBookById);

  // Update a book with bookId
  app.put('/books/:bookId', books.updateBookById);

  // Delete a book with bookId
  app.delete('/books/:bookId', books.deleteBookById);
};
