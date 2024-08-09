const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const eventRoutes = require('./routes/eventRoutes');
const userRegisterRoutes = require('./routes/registerUserRoutes');
const createNewEventRoutes = require('./routes/newEventRoutes');
const loginUserRoutes = require('./routes/loginUserRoutes');
const eventFilterByDateRoutes = require('./routes/eventsFilterByDate');

const app = express();



// Middleware
app.use(bodyParser.json());
app.use(cors());

// Allowing frontend to use the files of this directory
app.use('/uploads/event_image', express.static('uploads/event_image'));

// Events Related Routes
app.use('/events', eventRoutes);
app.use('/createNewEvent', createNewEventRoutes);
app.use('/getEventsByDate', eventFilterByDateRoutes);

// User Related Routes
app.use('/register', userRegisterRoutes);
app.use('/login', loginUserRoutes);

// Protected Routes
app.use('/api/protected', require('./routes/protectedRoutes'));

module.exports = app;