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
    // const genre = await Genre.updateById(req.params.id, req.body);
    // res.send(genre);

    const existingGenre = {
      id: 1,
      genre: 'Chiptunes',
      description:
        'A broad class of music made with PSGs or their emulations, often in the form of 8-bit sonic wizardry.',
      artists: ['Chip Tanaka', 'Pixelh8'],
    };

    const updateEntry = { ...existingGenre, ...req.body };
    const { genre, description, artists } = updateEntry;

    const { rows } = await pool.query(
      `
      UPDATE
        genres
      SET
        genre=$1,
        description=$2,
        artists=$3
      WHERE
        id=$4
      RETURNING
        *
      `,
      [genre, description, artists, req.params.id]
    );

    res.send(rows[0]);
  });
