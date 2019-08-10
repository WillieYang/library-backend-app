const Book = require('../models/book.model');

// Create and Save a new book
exports.create = (req, res) => {
  // console.log('req', req.body);
  if (!req.body.description) {
    return res.status(400).send({
      message: 'Book description can not be empty',
    });
  }

  // Create a Book
  const book = new Book({
    name: req.body.name || 'Untitled Book',
    description: req.body.description,
    storage: req.body.storage,
  });


  // Save book to database
  book.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Book.',
      });
    });
  return true;
};

// Retrieve and return all books from the database.
exports.findAll = (req, res) => {
  // console.log('access test')
  Book.find()
    .then((books) => {
      res.send(books);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving books.',
      });
    });
};

// Find a single book with a bookId
exports.findOne = (req, res) => {
  Book.findById(req.params.bookId)
    .then((book) => {
      if (!book) {
        return res.status(404).send({
          message: `Book not found with id ${req.params.bookId}`,
        });
      }
      res.send(book);
      return true;
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Book not found with id ${req.params.bookId}`,
        });
      }
      return res.status(500).send({
        message: `Error retrieving book with id ${req.params.bookId}`,
      });
    });
  return true;
};

// Update a book identified by the bookId in the request
exports.update = (req, res) => {
  if (!req.body.description) {
    return res.status(400).send({
      message: 'Book description can not be empty',
    });
  }

  Book.findByIdAndUpdate(req.params.bookId, {
    name: req.body.name || 'Untitled Book',
    description: req.body.description,
    storage: req.body.storage,
  }, { new: true })
    .then((book) => {
      if (!book) {
        return res.status(404).send({
          message: `Book not found with id ${req.params.bookId}`,
        });
      }
      res.send(book);
      return true;
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Book not found with id ${req.params.bookId}`,
        });
      }
      return res.status(500).send({
        message: `Error updating book with id ${req.params.bookId}`,
      });
    });
  return true;
};

// Delete a book with the specified bookId in the request
exports.delete = (req, res) => {
  Book.findByIdAndRemove(req.params.bookId)
    .then((book) => {
      if (!book) {
        return res.status(404).send({
          message: `Book not found with id ${req.params.bookId}`,
        });
      }
      res.send({ message: 'Book deleted successfully!' });
      return true;
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `Book not found with id ${req.params.bookId}`,
        });
      }
      return res.status(500).send({
        message: `Could not delete book with id ${req.params.bookId}`,
      });
    });
};
