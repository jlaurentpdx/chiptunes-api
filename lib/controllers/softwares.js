const { Router } = require('express');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  const { program, recentVersion, type, developer } = req.body;
  const { rows } = await pool.query(
    `
    INSERT INTO
      software (program, recent_version, type, developer)
    VALUES
      ($1, $2, $3, $4)
    RETURNING 
      *
    `,
    [program, recentVersion, type, developer]
  );

  res.send(rows[0]);
});
