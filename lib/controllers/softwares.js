const { Router } = require('express');
const Software = require('../models/Software');
const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  const software = await Software.insert(req.body);
  res.send(software);
});
