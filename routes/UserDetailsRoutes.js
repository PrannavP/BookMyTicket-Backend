const express = require("express");
const router = express.Router();
const {
    getUserActiveTicketController,
    getUserActiveUpcomingEventController,
    getUsersTotalSpentController,
    updateAttendeeNameController,
    updateAttendeeEmailController,
    updateAttendeeContactNumberController,
    updateUserPasswordController,
    } = require("../controllers/UserDetailsController");

// Route to get active tickets details
router.post('/activetickets', getUserActiveTicketController);

// Router to get upcoming event details
router.post('/upcomingevents', getUserActiveUpcomingEventController);

// Router to get users spent money details
router.post('/spentmoney', getUsersTotalSpentController);

// Router to update attendee name
router.patch('/update/name', updateAttendeeNameController);

// Router to update attendee email
router.patch('/update/email', updateAttendeeEmailController);

// Router to update attendee contactnumber
router.patch('/update/contactnumber', updateAttendeeContactNumberController);

// Router for updating user password
router.put("/update-password", updateUserPasswordController);

module.exports = router;