const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create express app
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Configuring database

const mongoose = require('mongoose');
const dbConfig = require('./config/database.config');

mongoose.Promise = global.Promise;

// Connecting to the database

mongoose.set('useCreateIndex', true);
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Successfully connected to the database');
}).catch((err) => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.' });
});

// Require routes

require('./app/routes/book.routes.js')(app);
require('./app/routes/reservation.routes.js')(app);
require('./app/routes/user.routes.js')(app);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
