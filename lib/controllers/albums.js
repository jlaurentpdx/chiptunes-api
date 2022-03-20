const { Router } = require('express');
const Album = require('../models/Album');

const pool = require('../utils/pool'); // TODO: Remove me after completing model

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
    // const album = await Album.deleteById(req.params.id);
    // res.send(album);

    const { rows } = await pool.query(
      `
      DELETE FROM
        albums
      WHERE
        id=$1
      RETURNING
        *
      `,
      [req.params.id]
    );

    if (!rows[0]) return null;

    res.send(rows[0]);
  });
