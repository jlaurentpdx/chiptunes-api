const { Router } = require('express');
const Genre = require('../models/Genre');
const pool = require('../utils/pool'); //TODO: Remove me after tests

module.exports = Router()
  .post('/', async (req, res) => {
    const genre = await Genre.insert(req.body);
    res.send(genre);
  })

  .get('/', async (req, res) => {
    // const genres = await Genre.findAll();
    // res.send(genres);

    const { rows } = await pool.query(
      `
    SELECT
      *
    FROM
      genres
    `
    );

    res.send(rows);
  });
