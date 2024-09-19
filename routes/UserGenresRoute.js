const express = require("express");
const router = express.Router();
const { getUsersGenreController } = require("../controllers/UserGenresController");

// Route to ......
router.post('/getusergenres', getUsersGenreController);

module.exports = router;