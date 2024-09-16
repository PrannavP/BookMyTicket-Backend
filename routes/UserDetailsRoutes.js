const express = require("express");
const router = express.Router();
const { getUserActiveTicketController, getUserActiveUpcomingEventController, getUsersTotalSpentController } = require("../controllers/UserDetailsController");

// Route to get active tickets details
router.post('/activetickets', getUserActiveTicketController);

// Router to get upcoming event details
router.post('/upcomingevents', getUserActiveUpcomingEventController);

// Router to get users spent money details
router.post('/spentmoney', getUsersTotalSpentController);

module.exports = router;