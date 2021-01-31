const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const exphbs = require('express-handlebars');

// LOAD CONFIG 
dotenv.config({ path: "./config/config.env" });

const connectDB = require('./config/db');


require('./config/passport')(passport);



// MIDDLEWARE 

connectDB();
const app = express();
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
}
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// SESSION MIDDLEWARE 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true } // THIS WON'T WORK WITHOUT HTTPS
}));
// PASSPORT MIDDLEWARE 
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server is running on ' + process.env.NODE_ENV + ' mode on port: ' + PORT));