const { Router } = require('express');
const Genre = require('../models/Genre');
const pool = require('../utils/pool'); //TODO: Remove me after tests

module.exports = Router()
  .post('/', async (req, res) => {
    const genre = await Genre.insert(req.body);
    res.send(genre);
  })

  .get('/', async (req, res) => {
    const genres = await Genre.findAll();
    res.send(genres);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const genre = await Genre.findById(req.params.id);
      res.send(genre);
    } catch (error) {
      error.status = 404;
      error.message = `No matching genre at ID ${req.params.id}`;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const genre = await Genre.updateById(req.params.id, req.body);
    res.send(genre);
  })

  .delete('/:id', async (req, res) => {
    const genre = await Genre.deleteById(req.params.id);
    res.send(genre);
  });
