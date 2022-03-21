const { Router } = require('express');
const pool = require('../utils/pool'); // TODO: Remove me after tests

module.exports = Router().post('/', async (req, res) => {
  const { rows } = await pool.query(
    `
    INSERT INTO
      hardware (device, type, manufacturer, chip, channels)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING 
      *
    `,
    [
      req.body.device,
      req.body.type,
      req.body.manufacturer,
      req.body.chip,
      req.body.channels,
    ]
  );

  res.send(rows[0]);
});
