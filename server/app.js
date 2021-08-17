// ⛏️⛏️ ALL IMPORTS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
require('dotenv').config({ path: 'config/.env' });
const express = require('express');
const passport = require('passport');
const app = express();
const cors = require('cors');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');


const indexRoute = require('./routes/index');
const adminRoute = require('./routes/admin');




// ⛏️⛏️ MONGO DB DATABASE ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0ss9r.mongodb.net/Spikeball-Events?retryWrites=true&w=majority`;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if (err) throw err;
    console.log("Db is connected successfully ");
});






// ⛏️⛏️ MIDDLEWARE SETUP ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
app.use(cors({ origin: process.env.HOSTNAME, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
}));
app.use(cookieParser(process.env.SESSION_SECRET));


app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);




// ⛏️⛏️ ROUTES ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
app.use('/api', indexRoute);
app.use('/api/admin', adminRoute);




// ⛏️⛏️ SERVER ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖ 
const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server is running on: ' + PORT));