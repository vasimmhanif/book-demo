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

    return message;
}

module.exports = {
    getMultiple,
    create
};
