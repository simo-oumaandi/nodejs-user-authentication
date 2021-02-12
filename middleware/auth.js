// NO PROBLEM HERE
const passport = require('passport');
const jwt = require('jsonwebtoken');

module.exports = {
  //     router.get('/profile', passport.authenticate('jwt', { session: false }),
  //     function(req, res) {
  //         res.send(req.user);
  //     }
  // );

  ensureAuth: async (req, res, next) => {
    // const token = await req.cookies.jwt;
    // if(token){
    //     jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=>{
    //         if(err) return res.redirect('/auth/login');
    //         console.log("Decoded Token: ",decodedToken);
    //         next();
    //     });
    // }else{
    //     res.redirect('/auth/login');
    // }

    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.redirect('/login?info=' + info);
      }

      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }

        return res.redirect('/');
      });
    })(req, res, next);
    const isAuthenticated = await passport.authenticate('jwt', {
      session: false,
    });
    console.log('Checking for authentication: ', isAuthenticated);
    if (isAuthenticated) {
      console.log('Authenticated');
      return next();
    } else {
      console.log('Not Authenticated');
      res.redirect('/');
    }
  },

  ensureGuest: async (req, res, next) => {
    const isAuthenticated = await passport.authenticate('jwt', {
      session: false,
    });
    if (isAuthenticated) {
      console.log('Authenticated');
      res.redirect('/dashboard');
    } else {
      console.log('Not Authenticated');
      return next();
    }
  },
};
