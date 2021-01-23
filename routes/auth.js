const express = require('express');
const router = express.Router();

const {signup, activate} = require('../controllers/auth');



router.post('/signup', signup);
router.post('/activate',activate);


module.exports = router;