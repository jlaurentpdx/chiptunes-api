const { Router } = require('express');
const pool = require('../utils/pool'); //TODO: Remove me after tests

module.exports = Router().post('/', async (req, res) => {
  const { rows } = await pool.query(
    `
      INSERT INTO
        genres (genre, description, artists)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
    [req.body.genre, req.body.description, req.body.artists]
  );

  res.send(rows[0]);
});
