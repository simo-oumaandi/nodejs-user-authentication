const jwt = require("jsonwebtoken");

// PROTECTING ROUTE
const requireAuth = (req, res, next) => {
    // GETTING THE COOKIES FROM BROWSER COOKIE STORAGE
    const token = req.cookies.jwt;
    // WE ALWAYS NEED TO CALL NEXT

    // CHECK JSON WEB TOKEN EXIST AND IS VARIFIED
    if (token) {
        // VARIFY TOKEN
        // https://www.jsonwebtoken.io/
        // https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
        jwt.verify(token, process.env.SECRETKEY, (err, decoredToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log("Decoded token", decoredToken);
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
}


module.exports = {requireAuth};