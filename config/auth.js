// NOW WE CAN ACCESS DASHBOARD AFTER LOGOUT THAT IS PROBLEM
// BY USING THIS MODULE ARE NO LONGER ABLE TO DO THAT
module.exports = {
    ensureAuthenticated: function(req, res, next){
        if (req.isAuthenticated()) {
          return next()  ;
        } 
        req.flash('error_msg', 'Please login to access dashboard');
        res.redirect('/users/login');
    }
}