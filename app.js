const express = require('express');

const app = express();


//ROUTES
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');

app.use('/', indexRoutes );


const PORT = process.env.PORT || 5000;
app.listen(PORT , console.log(`app is running on http://localhost:${PORT}`));