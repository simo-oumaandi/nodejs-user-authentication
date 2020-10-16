const router = require('express').Router();
const verify = require("./verifyToken");



router.get('/', verify,(req, res) => {
    res.status(200).json({ posts: { title: "this is post title", desc: "this is post descriptions" } });
})






module.exports = router;