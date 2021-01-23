const express = require('express');
const router = express.Router();
const Joi = require('joi');
const passport = require('passport');
const mailer = require('../misc/mailer');
const randomstring = require('randomstring');

const User = require('../models/user');

// Validation Schema
const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
});

// Authorization 
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'Sorry, but you must be registered first!');
    res.redirect('/');
  }
};

const isNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash('error', 'Sorry, but you are already logged in!');
    res.redirect('/');
  } else {
    return next();
  }
};

router.route('/register')
  .get(isNotAuthenticated, (req, res) => {
    res.render('register');
  })
  .post(async (req, res, next) => {
    try {
      const result = Joi.validate(req.body, userSchema);
      if (result.error) {
        req.flash('error', 'Data is not valid. Please try again.');
        res.redirect('/users/register');
        return;
      }

      // Checking if email is already taken
      const user = await User.findOne({ 'email': result.value.email });
      if (user) {
        req.flash('error', 'Email is already in use.');
        res.redirect('/users/register');
        return;
      }

      // Hash the password
      const hash = await User.hashPassword(result.value.password);


      // GENERATE SECRET TOKEN 
      const secretToken = randomstring.generate();
      // ASSIGNING IT TO THE VARIABLE 
      result.value.secretToken = secretToken;
      // FLAG THE ACCOUNT AS INACTIVE 
      result.value.active = false;




      // Save user to DB
      delete result.value.confirmationPassword;
      result.value.password = hash;

      const newUser = await new User(result.value);
      console.log('newUser', newUser);
      await newUser.save();


      // COMPOSE AN EMAIL 
      const html = `
        <h2>Hi there,</h2>
        <p>Please veryfy email with this token</p>
        Token: <b>${secretToken}</b>
        <a href="http://localhost:4000/users/verify">Activate</a>
      `;

      await mailer.sendEmail('mdshayon0@gmail.com', result.value.email, 'Please verify your email', html);

      req.flash('success', 'Please check your email.');
      res.redirect('/users/login');
    } catch (error) {
      next(error);
    }
  });







router.route('/login')
  .get(isNotAuthenticated, (req, res) => {
    res.render('login');
  })
  .post(passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  }));





router.route('/dashboard')
  .get(isAuthenticated, (req, res) => {
    res.render('dashboard', {
      username: req.user.username
    });
  });




router.route('/verify')
  .get(isNotAuthenticated, (req, res, next) => {
    res.render('verify');
  })
  .post(async (req, res, next) => {
    try {
      const { secretToken } = req.body;

      // FIND THE TOKEN THAT MATCHES SECRET TOKEN 
      const user = await User.findOne({ 'secretToken': secretToken });
      if (!user) {
        req.flash("error", "No user found");
        res.redirect('/users/verify');
        return;
      }
      user.active = true;
      user.secretToken = '';
      await user.save();
      req.flash('success', "You now may login");
      res.redirect('/users/login');
    } catch (error) {
      next(error);
    }
  });




router.route('/logout')
  .get(isAuthenticated, (req, res) => {
    req.logout();
    req.flash('success', 'Successfully logged out. Hope to see you soon!');
    res.redirect('/');
  });





module.exports = router;