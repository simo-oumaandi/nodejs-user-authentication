let express = require('express');
let router = express.Router();
//MULTER IS FOR UPLOADING A FILE
let multer = require('multer');
let upload = multer({
  dest: './uploads'
});
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let User = require('../models/user');




/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.get('/register', function (req, res, next) {
  res.render('register', {
    title: 'Register'
  });
});



router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'login'
  });
});


router.post('/login',
  passport.authenticate('local', {
    faiureRedirect: '/users/login',
    failureFlash: 'Invalid user name or password'
  }),
  function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    req.flash('success', 'you are now logged in ');
    res.redirect('/');
  });




passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});








passport.use(new LocalStrategy(function (username, password, done) {
  User.getUserByUsername(username, function (err, user) {
    if (err) throw err;
    if (!user) {
      return done(null, false, {
        message: 'unknown user'
      });
    }

    User.comparePassword(password, user.password, function (err, isMatch) {
      if (err) return done(err);
      if (isMatch) {
        return done(null, user);
      } else 
        return done(null, false, {
        message: "Invallid passwird"
      });
    });
  })
}));




router.post('/register', upload.single('profileimage'), (req, res, next) => {


  //GETTING TEXT FROM FORM OR CLIENT REQUEST BY USING BODY PARSER
  let name = req.body.name;
  let email = req.body.email;
  let username = req.body.name;
  let password = req.body.password;
  let password2 = req.body.password2;
  let profileimage;
  if (req.file) {
    console.log('Uploading file');
    profileimage = req.file.filename;
  } else {
    console.log('No file uploaded');
    profileimage = 'noimage.jpg';
  }

  //FORM VALIDATION
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'email field is required').notEmpty();
  req.checkBody('email', 'email field is required').isEmail();
  req.checkBody('username', 'username field is required').notEmpty();
  req.checkBody('password', 'password field is required').notEmpty();
  req.checkBody('password2', 'password do not match').equals(req.body.password);


  //CHECK ERROR
  let errors = req.validationErrors();
  if (errors) {
    res.render('register', {
      errors: errors
    });
  } else {
    let newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileimage
    });
    User.createUser(newUser, (err, user) => {
      if (err) throw err;
      console.log(`User: ${user}`)
    });

    req.flash('success', ' you are now connected and can login');

    res.location('/');
    res.redirect('/');
  }
});



// router.get('/logout', function(res, req){
//   req.logout();
//   req.flash('success', 'you are log out');
//   redirect('/login');
// })

module.exports = router;