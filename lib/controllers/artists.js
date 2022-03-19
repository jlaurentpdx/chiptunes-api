const { Router } = require('express');
const Artist = require('../models/Artist');

module.exports = Router().post('/', async (req, res) => {
  const artist = await Artist.insert(req.body);

  res.send(artist);
});
