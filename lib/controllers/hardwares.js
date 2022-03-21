const { Router } = require('express');
const Hardware = require('../models/Hardware');

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
    const hardware = await Hardware.updateById(req.params.id, req.body);
    res.send(hardware);
  })

  .delete('/:id', async (req, res) => {
    const hardware = await Hardware.deleteById(req.params.id);
    res.send(hardware);
  });
