// const {sendUser} = require('../utils/helpers');

module.exports = {
    ensureAuth: (req, res, next)=>{
        // console.log("User exist - ", req.user);
        // console.log(req.admin);
        if(req.isAuthenticated()){
            return next(); // PASS
        }
        return res.json({user: null}); // RETUTN REDRECT OR RETURN WITH FLASH MESSAGE

    },
    ensureGuast: (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.json({});  // RETURN REDIRECT OR RETURN WITH FLASH MESSAGE
        }
        next(); // PASS

    }
}