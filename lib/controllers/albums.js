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

  .get('/:id', async (req, res) => {
    // const album = await Album.findById(req.params.id);
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        albums
      WHERE
        id=$1
      `,
      [req.params.id]
    );

    res.send(rows[0]);
  });
