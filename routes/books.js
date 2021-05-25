var express = require('express');
var router = express.Router();
const books = require('../services/book-service');

router.get('/', async function(req, res, next) {
  try {
    res.json(await books.getMultiple(req.query.page));
  } catch(err) {
    console.error('Error while getting book data', err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await books.create(req.body));
  } catch (err) {
    console.error('Error while adding book data', err.message);
    next(err);
  }
});

router.put('/:isbn', async function(req, res, next) {
  try {
    res.json(await books.update(req.params.isbn, req.body));
  } catch(err) {
    console.error('Error while updating book data', err.message);
    next(err);
  }
});

router.delete('/:isbn', async function(req, res, next) {
  try {
    res.json(await books.remove(req.params.isbn));
  } catch(err) {
    console.error('Error while deleting book data', err.message);
    next(err);
  }
});

module.exports = router;
