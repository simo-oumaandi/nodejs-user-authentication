require('dotenv').config();
const express =require('express');
const app = express();


const jwt = require('jsonwebtoken');



app.use(express.json());

const posts = [
    {
        username: "Cristiano",
        title: "Juventus"
    },
    {
        username: "Messi",
        title: "Barcelona"
    },
]


app.get('/posts',authenticateToken, (req, res, next)=>{
    res.json(posts.filter(post=>post.username === req.user.name));
});


app.post('/login', (req, res, next)=>{
    // AUTHENTICATE USER WITH PASSPORT

    // THIS USER SHOULD COME FROM PASSPORT AUTH
    const username = req.body.username;
    // CREATING USER OBJECT
    const user = {name: username};
    // Sign asynchronously
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    // WE CAN ACCESS ANY USER WITH THIS ACCESS TOKEN
    res.json({accessToken: accessToken});

});




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


app.listen(4000, ()=>console.log("server is running on localhost:4000"));
