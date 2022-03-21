const { Router } = require('express');
const Artist = require('../models/Artist');

module.exports = Router()
  .post('/', async (req, res) => {
    const artist = await Artist.insert(req.body);
    res.send(artist);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const artist = await Artist.findById(req.params.id);
      res.send(artist);
    } catch (error) {
      error.status = 404;
      error.message = `No matching artist at ID ${req.params.id}.`;
      next(error);
    }
  })

  .get('/', async (req, res) => {
    const artists = await Artist.findAll();
    res.send(artists);
  })

  .patch('/:id', async (req, res) => {
    const artist = await Artist.updateById(req.params.id, req.body);
    res.send(artist);
  })

  .delete('/:id', async (req, res) => {
    const artist = await Artist.deleteById(req.params.id);
    res.send(artist);
  });
