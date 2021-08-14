const express = require('express');
const passport = require('passport');
const passportLocal = require("passport-local").Strategy;
const app = express();
const cors = require('cors');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(session({
    secret: 'keyboardcat',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
}));
app.use(cookieParser("keyboardcat"));




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server is running on: ' + PORT));