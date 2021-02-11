// NO PROBLEM HERE 
const passport = require('passport');

module.exports = {
//     router.get('/profile', passport.authenticate('jwt', { session: false }),
//     function(req, res) {
//         res.send(req.user);
//     }
// );

    ensureAuth: async (req, res, next)=>{
        const isAuthenticated = await passport.authenticate('jwt', { session: false });
        console.log("Checking for authentication: ", isAuthenticated);
        if(isAuthenticated){
            console.log("Authenticated");
            return next();
        }else{
            console.log("Not Authenticated");
            res.redirect('/');
        }
    },

    ensureGuest: async(req, res, next) =>{
        const isAuthenticated = await passport.authenticate('jwt', { session: false });
        if(isAuthenticated){
            console.log("Authenticated");
            res.redirect('/dashboard');;
        }else{
            console.log("Not Authenticated");
            return next();
        }
    },




}