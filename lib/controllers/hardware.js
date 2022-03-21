const { Router } = require('express');
const Hardware = require('../models/Hardware');
const pool = require('../utils/pool'); // TODO: Remove me after tests

module.exports = Router().post('/', async (req, res) => {
  const hardware = await Hardware.insert(req.body);
  res.send(hardware);
});
