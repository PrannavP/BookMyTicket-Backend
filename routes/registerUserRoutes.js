const express = require('express');
const router = express.Router();
const UserImageUpload  = require('../middleware/userImageUploadMiddleware');
const { registerNewUserController } = require('../controllers/registerUserController');

// Route to register new attendee
router.post('/', UserImageUpload.single('profile_image'), registerNewUserController);

module.exports = router;