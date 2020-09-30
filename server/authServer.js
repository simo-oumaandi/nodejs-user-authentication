require('dotenv').config();
const express = require('express');
const app = express();


const jwt = require('jsonwebtoken');



app.use(express.json());



let refreshToken = [];

// CREATE NEW TOKEN SINCE OUR LOGIN TOKEN IS EXPIRE IN 15 SECOND
app.post('/token', (req, res, next) => {
    // REFRESH TOKEN SHOULD BE SAVE IN DATABASE
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    if (refreshToken.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        // WE HAVE A TOKEN BUT THE TOKEN IS NO LONGER VALID SO YOU NOT HAVE THE ACCESS
        if (err) return res.sendStatus(403);

        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });
    });


});



app.post('/login', (req, res, next) => {
    // AUTHENTICATE USER WITH PASSPORT

    // THIS USER SHOULD COME FROM PASSPORT AUTH
    const username = req.body.username;
    // CREATING USER OBJECT
    const user = { name: username };
    // Sign asynchronously
    // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshToken.push(refreshToken);
    // WE CAN ACCESS ANY USER WITH THIS ACCESS TOKEN
    res.json({ accessToken: accessToken, refreshToken: refreshToken });


});



/*
// GET TOKEN -> VARIFY USER -> RETURN USER TO ROUTE
function authenticateToken(req, res, next){
    // GET TOKEN FROM HEADER
    const authHeader = req.headers['authorization']
    // IF WE HAVE A AUTH HEADER THEN RETURN AUTH HEADER TOKEN
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) {
        return res.sendStatus(401);
    }

    // VARIFY TOKEN
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        // WE HAVE A TOKEN BUT THE TOKEN IS NO LONGER VALID SO YOU NOT HAVE THE ACCESS
        if(err) return res.sendStatus(403);
        

        // SO WE HAVE VALID TOKEN
        req.user = user;
        next();
    });
}
*/











function generateAccessToken(user) {
    // Sign asynchronously
    // IN REAL APPLICATION THIS SHOULD EXPIRES IN 15 MINUTES
    return accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });


}

































app.listen(3000, () => console.log("server is running on localhost:3000"));
