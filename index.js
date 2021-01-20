const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db/connectDB');


const app = express();
const authRoutes = require('./routes/auth');


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());





app.use('/api', authRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server is running on : ${PORT}`));