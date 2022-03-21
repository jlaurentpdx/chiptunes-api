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
    const software = await Software.updateById(req.params.id, req.body);
    res.send(software);
  })

  .delete('/:id', async (req, res) => {
    const software = await Software.deleteById(req.params.id);
    res.send(software);
  });
