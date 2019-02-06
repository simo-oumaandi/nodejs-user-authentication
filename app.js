const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();


app.use(expressLayouts); //WE NEED TO MAKE SURE THIS LAYOUT IS ABOVE VIEW ENGINE EJS SETTING
app.set('view engine', 'ejs'); 



//ROUTES
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');

app.use('/', indexRoutes );
app.use('/users', usersRoutes );



const PORT = process.env.PORT || 5000;
app.listen(PORT , console.log(`app is running on http://localhost:${PORT}`));