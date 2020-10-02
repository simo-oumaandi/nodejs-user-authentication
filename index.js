const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();


app.use(express.static('public'));
app.set("view engine", "ejs");

const mongoURI = process.env.mongoURI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log("Mongodb is connected "))
    .catch(err => console.log(err));



const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log("Server is running on port : " + PORT))