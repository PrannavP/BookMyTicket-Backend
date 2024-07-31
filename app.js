const express = require('express');
const bodyParser = require('body-parser');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/events', eventRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
