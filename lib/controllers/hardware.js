const { Router } = require('express');
const Hardware = require('../models/Hardware');
const pool = require('../utils/pool'); // TODO: Remove me after tests

module.exports = Router()
  .post('/', async (req, res) => {
    const hardware = await Hardware.insert(req.body);
    res.send(hardware);
  })

  .get('/', async (req, res) => {
    // const hardware = await Hardware.findAll();
    // res.send(hardware);

    const { rows } = await pool.query(
      `
    SELECT
      *
    FROM
      hardware
    `
    );

    res.send(rows);
  });