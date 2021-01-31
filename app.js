const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');



const connectDB = require('./config/db');



// MIDDLEWARE 
// LOAD CONFIG 
dotenv.config({path: "./config/config.env"});
connectDB();
const app = express();
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
}
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/index'));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server is running on ' + process.env.NODE_ENV + ' mode on port: '+ PORT));