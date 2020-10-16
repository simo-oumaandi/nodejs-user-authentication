const jwt = require("jsonwebtoken");




// PROTECTING ROUTE
module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json({ "Error: ": "Access denied" });
    try {
        const verified = jwt.verify(token, "THIS_IS_TOKEN_SECRET");
        req.user = verified;
        console.log(req.user);
        next();
    } catch (err) {
        res.status(400).json({ "Error": "Invalid token" });
    }
}