const express = require('express');
const dotenv = require('dotenv');


// LOAD CONFIG 
dotenv.config({path: "./config/config.env"});
const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server is running on ' + process.env.NODE_ENV + ' mode on port: '+ PORT));