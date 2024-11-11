const express = require("express");
const router = express.Router();
const { getEventTicketsSoldController } = require("../controllers/eventDetailsController");

// Route to get tickets sold data
router.post("/tickets-sold", getEventTicketsSoldController);

module.exports = router;
