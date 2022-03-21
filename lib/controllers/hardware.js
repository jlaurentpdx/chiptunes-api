const { Router } = require('express');
const Hardware = require('../models/Hardware');
const pool = require('../utils/pool'); // TODO: Remove me after tests

module.exports = Router()
  .post('/', async (req, res) => {
    const hardware = await Hardware.insert(req.body);
    res.send(hardware);
  })

  .get('/:id', async (req, res) => {
    // const hardware = await Hardware.findById(req.params.id);
    // res.send(hardware);

    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        hardware
      WHERE
        id=$1
      `,
      [req.params.id]
    );

    res.send(rows[0]);
  })

  .get('/', async (req, res) => {
    const hardware = await Hardware.findAll();
    res.send(hardware);
  });
