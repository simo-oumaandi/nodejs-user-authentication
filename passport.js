const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

async function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async(email, password, done) => {
        const user = getUserByEmail(email);
        if (user == null) {
            return done(null, false, { message: 'no user with that email' });
        }

        try {
            // IF PASSWORD MATCH
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                // IF PASSWORD DIDN'T MATCH
                return done(null, false, { message: "password didn't match" })
            }
        } catch (e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => done(null, getUserById(id)));
}


module.exports = initialize;