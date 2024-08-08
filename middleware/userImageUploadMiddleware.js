const multer = require('multer');
const path = require('path');

// Setting up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/user_profile_image'));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
});

const UserImageUpload = multer({ storage });

module.exports = UserImageUpload;