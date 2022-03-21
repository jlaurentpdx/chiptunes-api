const { Router } = require('express');
const Software = require('../models/Software');
const pool = require('../utils/pool'); // TODO: Remove me after tests

module.exports = Router()
  .post('/', async (req, res) => {
    const software = await Software.insert(req.body);
    res.send(software);
  })

  .get('/', async (req, res) => {
    const software = await Software.findAll();
    res.send(software);
  })

  .get('/:id', async (req, res) => {
    const software = await Software.findById(req.params.id);
    res.send(software);
  });
