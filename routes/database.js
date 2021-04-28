var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "learning_nodejs"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT isbn, publisher FROM books", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});