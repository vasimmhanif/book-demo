var express = require('express');
var router = express.Router();
const books = require('../services/book-service');

router.get('/', async function(req, res, next) {
  try {
    res.json(await books.getMultiple(req.query.page));
  } catch {
    console.error('Error while getting book data');
    next(error);
  }
});

router.post('/', async function(req, res, next) {
  try{
    res.json(await books.create(req.body));
  } catch (err) {
    console.error('Error while adding book data');
    next(error);
  }
});

module.exports = router;
