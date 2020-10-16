const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');


const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/jwt_auth",
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
        console.log('connected to db')
    });



// MIDDLEWARE
app.use(express.json());



// ROUTES MIDDLEWARE
app.use('/api/user', authRoute);


app.listen(3000, () => console.log("server is running on 3000"));
