const { Router } = require('express');
const Software = require('../models/Software');
const pool = require('../utils/pool'); // TODO: Remove me after tests

module.exports = Router()
  .post('/', async (req, res) => {
    const software = await Software.insert(req.body);
    res.send(software);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const software = await Software.findById(req.params.id);
      res.send(software);
    } catch (error) {
      error.status = 404;
      error.message = `No matching software at ID ${req.params.id}`;
      next(error);
    }
  })

  .get('/', async (req, res) => {
    const software = await Software.findAll();
    res.send(software);
  })

  .patch('/:id', async (req, res) => {
    // const software = await Software.updateById(req.params.id);
    // res.send(software);

    const existingSoftware = await Software.findById(req.params.id);
    const updateEntry = { ...existingSoftware, ...req.body };

    const { program, recentVersion, type, developer } = updateEntry;

    const { rows } = await pool.query(
      `
      UPDATE
        software
      SET
        program=$1,
        recent_version=$2,
        type=$3,
        developer=$4
      WHERE
        id=$5
      RETURNING
        *
      `,
      [program, recentVersion, type, developer, req.params.id]
    );

    res.send(rows[0]);
  });
