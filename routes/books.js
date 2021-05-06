var express = require('express');
var mysql = require('mysql');
var router = express.Router();

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
  con.query("select isbn, title, author, publisher, date_format(published_date, \"%m/%d/%Y\") as publishedDate from books;", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/', function(req, res) {
  var book = req.body;
  var sql = `INSERT INTO books (isbn, title, author, publisher, published_date)
             VALUES ('${book.isbn}','${book.title}','${book.author}','${book.publisher}','${book.publishedDate}')`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send("book is added to the database");
  });
});

module.exports = router;
