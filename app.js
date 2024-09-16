const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const eventRoutes = require('./routes/eventRoutes');
const userRegisterRoutes = require('./routes/registerUserRoutes');
const createNewEventRoutes = require('./routes/newEventRoutes');
const loginUserRoutes = require('./routes/loginUserRoutes');
const userInfoByIdRoutes = require('./routes/userIdRoutes');
const sendEmailRoutes = require('./routes/sendEmailRoutes');
const ticketDetailsRoutes = require('./routes/TicketRoutes');
const UserTicketDetailsRoutes = require('./routes/UserDetailsRoutes');
const UserUpcomingEventsRoutes = require('./routes/UserDetailsRoutes');
const UserMoneySpentRoutes = require('./routes/UserDetailsRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Allowing frontend to use the files of this directory
app.use('/uploads/event_image', express.static('uploads/event_image'));
app.use('/uploads/user_profile_image', express.static('uploads/user_profile_image'));

// Events Related Routes
app.use('/events', eventRoutes);
app.use('/createNewEvent', createNewEventRoutes);
app.use('/api/events/', eventRoutes);
app.use('/api/events/', eventRoutes);

// User Related Routes
app.use('/register', userRegisterRoutes);
app.use('/login', loginUserRoutes);
app.use('/userinfo/', userInfoByIdRoutes);

// User Ticket Related Routes
app.use('/userticketdetails/', UserTicketDetailsRoutes);

// Tickets Related Routes
app.use('/details/', ticketDetailsRoutes);
app.use('/details/', UserUpcomingEventsRoutes);
app.use('/details', UserMoneySpentRoutes);


// Sending Email Routes
app.use('/sendemail', sendEmailRoutes);

// Protected Routes
app.use('/api/protected', require('./routes/protectedRoutes'));

module.exports = app;