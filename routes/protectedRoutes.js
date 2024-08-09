const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
    // console.log(req.user);

    res.json({
        msg: 'You access protected data!',
        user: req.user.id
    });
});

module.exports = router;