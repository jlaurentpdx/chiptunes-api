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
    // const album = await Album.updateById(req.params.id, req.body);
    const { title, artist, released, price, source } = req.body;
    const { rows } = await pool.query(
      `
      UPDATE
        albums
      SET
        title=$1,
        artist=$2,
        released=$3,
        price=$4,
        source=$5
      WHERE
        id=$6
      RETURNING
        *
      `,
      [title, artist, released, price, source, req.params.id]
    );

    if (!rows[0]) return null;

    res.send(rows[0]);
  });
