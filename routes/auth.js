const express = require('express');
const router = express.Router();


router.get('/',(req, res, next)=>{
    res.send("Request to auth get");
});



module.exports = router;