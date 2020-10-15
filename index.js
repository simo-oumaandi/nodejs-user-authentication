const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/authRoute');

const app = express();

require('dotenv').config();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");

const mongoURI = process.env.mongoURI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("Mongodb is connected "))
    .catch(err => console.log(err));



// ROUTE

app.get('/', (req, res, next) => { res.render('home.ejs'); });
app.get('/players', (req, res, next) => { res.render('players') });
app.use('/', authRoute);







/*
// USING COOKIES
// https://expressjs.com/en/api.html#setHeaders
app.get('/set-cookies', (req, res, next)=>{
    // res.setHeader('Set-Cookie', 'newUser=true');
    res.cookie("newUser", false);
    // ONE DAY IN MILI SECONDS 1000 * 60 * 60 * 24
    // https://tutorial.techaltum.com/cookie-parser.html
    res.cookie("isEmployee", true, {maxAge: 1000 * 60 * 60 * 24});
    res.send("you got the cookies!");
});

app.get('/read-cookies', (req, res, next)=>{
    // https://www.npmjs.com/package/cookie-parser
    const cookies = req.cookies;
    console.log(cookies);
    console.log(cookies.newUser);
    res.json(cookies);
});

*/



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server is running on port : " + PORT))