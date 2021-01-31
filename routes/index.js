const express = require('express');
const router = express();



router.get('/', (req, res, next) => {
    res.status(200).json({ request: 'Login' });
});



router.get('/dashboard', (req, res, next) => {
    res.status(200).json({ request: 'Dashboard' });
});




module.exports = router;