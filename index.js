const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();



const users = [];


// MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.static('public'));
// app.use(express.urlencoded({ extended: false })); // THIS WILL ABLE TO ACCESS THE FORM INSIDE REQUEST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES
app.get('/', (req, res) => {
    res.render('index.ejs');
});



app.get('/login', (req, res, next) => {
    res.render('login');
});
app.post('/login', (req, res, next) => {

});

app.get('/register', (req, res, next) => {
    res.render('register');
});
app.post('/register', async(req, res, next) => {
    // console.log(req.body.name);

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Data.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
    // res.json(users);
    console.log(users);

});





app.listen(3000, () => {
    console.log('server is running on port 3000');
})