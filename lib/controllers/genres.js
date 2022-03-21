const { Router } = require('express');
const Genre = require('../models/Genre');
const pool = require('../utils/pool'); //TODO: Remove me after tests

module.exports = Router().post('/', async (req, res) => {
  const genre = await Genre.insert(req.body);
  res.send(genre);
});
