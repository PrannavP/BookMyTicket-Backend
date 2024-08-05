const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const eventRoutes = require('./routes/eventRoutes');
const userRegisterRoutes = require('./routes/registerUserRoutes');
const createNewEventRoutes = require('./routes/newEventRoutes');
const loginUserRoutes = require('./routes/loginUserRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Events Related Routes
app.use('/events', eventRoutes);
app.use('/createNewEvent', createNewEventRoutes);

// User Related Routes
app.use('/register', userRegisterRoutes);
app.use('/login', loginUserRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;