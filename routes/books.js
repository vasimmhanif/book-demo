var express = require('express');
var mysql = require('mysql');
var router = express.Router();

let books = [];

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "learning_nodejs"
});

con.connect(function(err) {
  if (err) throw err;
});

router.get('/', function(req, res) {
  con.query("SELECT* FROM books", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/', function(req, res, next) {
  const book = req.body;
  books.push(book);
  res.send('book is added to the database');
});

module.exports = router;
