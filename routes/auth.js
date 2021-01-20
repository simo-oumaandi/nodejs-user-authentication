const express = require('express');
const router = express.Router();

const {signup} = require('../controllers/auth');


router.get('/',(req, res, next)=>{
    res.send("Request to auth get");
});
router.post('/signup', signup);



module.exports = router;