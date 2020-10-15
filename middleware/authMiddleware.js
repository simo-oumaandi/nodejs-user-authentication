const User = require('../models/User');
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



const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SECRETKEY, async (err, decoredToken) => {
            if (err) {
                console.log(err.message);
                // IF USER IS NOT LOGGED IN THIS WOULD BE NULL
                res.locals.user = null;
                next();
            } else {
                // IF THERE IS A VALID USER LOGGED IN 
                console.log("Decoded token", decoredToken);
                // FIND THE USER
                let user = await User.findById(decoredToken.id);
                // http://expressjs.com/en/api.html#app.locals
                // http://expressjs.com/en/5x/api.html#res.locals
                // IF USER IS LOGGED IN THIS WOULD BE CURRENT USER
                // NOW WE CAN ACCESS USER PROPERTIES INSIDE OUR VIEWS FILE
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}


module.exports = { requireAuth, checkUser };