const express = require("express");
const router = express.Router();
const UserImageUpload = require("../middleware/userImageUploadMiddleware");
const { registerNewOrganizerController, getOrganizerEventsController } = require("../controllers/OrganizerController");

// Route to register new organizer
router.post("/register", UserImageUpload.single('profile_image'), registerNewOrganizerController);

router.post("/events", getOrganizerEventsController);

module.exports = router;