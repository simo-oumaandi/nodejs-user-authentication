const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;



const User = require('../models/User');


const cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt'];
        console.log(token);
    }
    return token;
};




module.exports = (passport) => {

    const opts = {}
    // opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();  /// USE POST MAN REQUEST WITH BEARER TOKEN IN HEADER
    opts.jwtFromRequest = cookieExtractor;
    opts.secretOrKey = process.env.JWT_SECRET;
    // opts.issuer = 'accounts.examplesoft.com';
    // opts.audience = 'yoursite.net';

    passport.use(new JWTstrategy(opts, async (jwt_payload, done) =>{
        console.log("JWT Payload: ", jwt_payload);
        User.findOne({ _id: jwt_payload.id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                console.log("User");
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));


}











