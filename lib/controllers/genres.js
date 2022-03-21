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

  .get('/:id', async (req, res) => {
    // const genre = await Genre.findById(req.params.id);
    // res.send(genre);

    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        genres
      WHERE
        id=$1
      `,
      [req.params.id]
    );

    res.send(rows[0]);
  });
