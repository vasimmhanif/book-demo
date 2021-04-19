var express = require('express');
var router = express.Router();

let books = [];

router.get('/', function(req, res, next) {
  res.json(books);
});

router.post('/', function(req, res, next) {
  const book = req.body;
  books.push(book);
  res.send('book is added to the database');
});

module.exports = router;
