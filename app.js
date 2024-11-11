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
const UserGenreRoutes = require("./routes/UserGenresRoute");
const EsewaPaymentRoute = require("./routes/esewapaymentRoute");
const EsewaPaymentConfirmationRoute = require("./routes/esewapaymentRoute");
const TransactionRoute = require("./routes/transactionRoute");
const TicketQRCode = require("./routes/qrRoute");
const verifyTicketRoute = require("./routes/TicketRoutes");
const TicketsSoldData = require("./routes/eventDetailsRoute");
const registerOrganizer = require("./routes/organizerRoute");
const organizerEvents = require("./routes/organizerRoute");
const organizerEarning = require("./routes/TicketRoutes");
const organizerTicketsSales = require("./routes/TicketRoutes");
const organizerActiveEvents = require("./routes/TicketRoutes");
const attendeeActiveTicketDetails = require("./routes/TicketRoutes");
const attendeePastTicketDetails = require("./routes/TicketRoutes");
const updateAttendeeName = require("./routes/UserDetailsRoutes");
const updatedAttendeeEmail = require("./routes/UserDetailsRoutes");
const updatedAttendeeContactNumber = require("./routes/UserDetailsRoutes");
const updateUserPassword = require("./routes/UserDetailsRoutes");
const bookedTicketDetails = require("./routes/TicketRoutes");

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
app.use('/attendee', updateAttendeeName);
app.use('/attendee', updatedAttendeeEmail);
app.use('/user', updateUserPassword);

// User Ticket Related Routes
app.use('/userticketdetails/', UserTicketDetailsRoutes);

// Tickets Related Routes
app.use('/details/', ticketDetailsRoutes);
app.use('/details/', UserUpcomingEventsRoutes);
app.use('/details', UserMoneySpentRoutes);
app.use('/', verifyTicketRoute);
app.use('/attendee/', attendeeActiveTicketDetails);
app.use('/attendee', attendeePastTicketDetails);
app.use('/attendee', updatedAttendeeContactNumber);
app.use('/organizer/', bookedTicketDetails);

// User suggestion related routes
app.use('/suggestions', UserGenreRoutes);

// User payment related routes
app.use('/payment', EsewaPaymentRoute);
app.use('/payment', EsewaPaymentConfirmationRoute);

// Transaction related routes
app.use('/transaction', TransactionRoute);

// Sending Email Routes
app.use('/sendemail', sendEmailRoutes);

// QR Code Routes
app.use('/', TicketQRCode);

// Organizers related routes
app.use('/organizer/', TicketsSoldData);
app.use('/organizer', registerOrganizer);
app.use('/organizer', organizerEvents);
app.use('/organizer', organizerEarning);
app.use('/organizer', organizerTicketsSales);
app.use('/organizer', organizerActiveEvents);

// Protected Routes
app.use('/api/protected', require('./routes/protectedRoutes'));

module.exports = app;