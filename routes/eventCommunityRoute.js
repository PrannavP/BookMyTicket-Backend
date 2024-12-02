const express = require("express");
const router = express.Router();

const { getEventCommentsController, commentInEventController } = require("../controllers/eventCommunityController");

// Route to post comment
router.post("/event/post/comment", commentInEventController);

// Route to get event comments
router.post("/event/comments", getEventCommentsController);

module.exports = router;