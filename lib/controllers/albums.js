const { Router } = require('express');
const Album = require('../models/Album');

module.exports = Router()
  .post('/', async (req, res) => {
    const album = await Album.insert(req.body);
    res.send(album);
  })

  .get('/', async (req, res) => {
    const albums = await Album.findAll();
    res.send(albums);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const album = await Album.findById(req.params.id);
      res.send(album);
    } catch (error) {
      error.status = 404;
      error.message = `No matching album at ID ${req.params.id}.`;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const album = await Album.updateById(req.params.id, req.body);
    res.send(album);
  })

  .delete('/:id', async (req, res) => {
    const album = await Album.deleteById(req.params.id);
    res.send(album);
  });
