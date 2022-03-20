const { Router } = require('express');
const Album = require('../models/Album');

const pool = require('../utils/pool'); // TODO: Remove me after completing model

module.exports = Router()
  .post('/', async (req, res) => {
    const album = await Album.insert(req.body);
    res.send(album);
  })

  .get('/', async (req, res) => {
    // const albums = await Album.findAll();
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        albums
      `
    );

    const albums = rows;
    res.send(albums);
  });
