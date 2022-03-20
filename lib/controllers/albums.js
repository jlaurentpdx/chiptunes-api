const { Router } = require('express');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  const { rows } = await pool.query(
    `
    INSERT INTO
      albums (title, artist, released, price, source)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING 
      *
    `,
    ['Videogames Ruined My Life', 2, 2007, null, null]
  );

  const album = rows[0];

  res.send(album);
});
