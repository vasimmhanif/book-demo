const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
      `SELECT isbn, title, author, publisher, 
      date_format(published_date, \"%m/%d/%Y\") as publishedDate FROM books`, 
      []
    );

    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

async function create(book) {
    const result = await db.query(
        `INSERT INTO books (isbn, title, author, publisher, published_date)
         VALUES (?, ?, ?, ?, ?)`,
        [
          book.isbn, book.title, book.author, 
          book.publisher, book.publishedDate
        ]
    );

    let message = 'Error in creating programming language';

    if (result.affectedRows) {
      message = 'Book is added to the database';
    }

    return {message};
}

async function update(isbn, book) {
  const result = await db.query(
    `UPDATE books
    SET title=?, author=?, publisher=?, published_date=?
    WHERE isbn=?`,
    [
      book.title, book.author,
      book.publisher, book.publishedDate, isbn
    ]
  );

  let message = 'Error in book data update';

  if(result.affectedRows){
    message = 'book data updated successfully';
  }

  return {message};
}

async function remove(isbn) {
  const result = await db.query(
    `DELETE FROM books
    WHERE isbn=?`,
    [isbn]
  );

  let message = 'error in deleting book data';

  if(result.affectedRows) {
    message = 'book data deleted successfully'
  }

  return {message};
}

module.exports = {
    getMultiple,
    create,
    update,
    remove
};
