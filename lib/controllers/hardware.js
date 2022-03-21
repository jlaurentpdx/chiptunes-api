const { Router } = require('express');
const Hardware = require('../models/Hardware');
const pool = require('../utils/pool'); // TODO: Remove me after tests

module.exports = Router()
  .post('/', async (req, res) => {
    const hardware = await Hardware.insert(req.body);
    res.send(hardware);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const hardware = await Hardware.findById(req.params.id);
      res.send(hardware);
    } catch (error) {
      error.status = 404;
      error.message = `No matching hardware at ID ${req.params.id}.`;
      next(error);
    }
  })

  .get('/', async (req, res) => {
    const hardware = await Hardware.findAll();
    res.send(hardware);
  })

  .patch('/:id', async (req, res) => {
    // const hardware = await Hardware.updateById(req.params.id, req.body);
    // res.send(hardware);

    const existingHardware = await Hardware.findById(1);
    const updateEntry = { ...existingHardware, ...req.body };
    const { device, type, manufacturer, chip, channels } = updateEntry;

    const { rows } = await pool.query(
      `
      UPDATE
        hardware
      SET
        device=$1,
        type=$2,
        manufacturer=$3,
        chip=$4,
        channels=$5
      WHERE
        id=$6
      RETURNING
        *
      `,
      [device, type, manufacturer, chip, channels, req.params.id]
    );

    res.send(rows[0]);
  });
