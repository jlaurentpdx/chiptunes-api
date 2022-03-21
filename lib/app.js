const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/artists', require('./controllers/artists'));
app.use('/api/v1/albums', require('./controllers/albums'));
app.use('/api/v1/genres', require('./controllers/genres'));
app.use('/api/v1/hardware', require('./controllers/hardwares'));
app.use('/api/v1/software', require('./controllers/softwares'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
