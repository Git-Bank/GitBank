// ===========================================
// =====            App.js               =====
// ===========================================

// Requirements: express (server management) 
// jswt (jsonwebtoken) (Creates web tokens)
const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const app = express();
const PORT = 5600;
// Require sequelize (And mysql2), set dialect as mysql 
const Sequelize = require('sequelize');
const sequelize = new Sequelize('budgetdb', 'root', 'vj4cxex6', {
    dialect: 'mysql'
})

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello. Welcome to the API.'
    });
});

/* // Jquery calls user input from login form
var emailInput = $("#email-form").val().trim();
var passwordInput = $("#password-form").val().trim();

if (emailInput && passwordInput != null)
    sequelize.query('SELECT * FROM userbase WHERE email = ' + "'" + emailInput + "'", { raw: true })
    .then(userinfo => {

    })
    const user = {
        id: 
        email: emailInput
    }
*/



app.post('/api/posts', verifyToken /* Middleware function "verifyToken" */ , (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created.',
                authData
            });
        }
    });
});

const example = "'framez@bgsu.edu'";
var id = sequelize.query('SELECT * FROM userbase WHERE email = ' + example, {
        raw: true
    })
    .then(projects => {
        JSON.stringify(projects);
        id = projects[0][0].id;
        //console.log(id)
    })
var email = sequelize.query('SELECT * FROM userbase WHERE email = ' + example, {
        raw: true
    })
    .then(projects => {
        JSON.stringify(projects);
        email = projects[0][0].email;
        // console.log(email)
    })



app.post('/api/login', (req, res) => {
    // callback function (asynch)
    // Usually you'd have a database full of users that you'd be getting a req. from

    const user = {
        id: id,
        email: email
    }

    // This gets us our token back, which is everything we need to reach a 'protected route'
    jwt.sign({
        user
    }, 'secretkey', {
        expiresIn: '1h'
    }, (err, token) => {
        res.json({
            token
        });
    });
})

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
// Verify Token

function verifyToken(req, res, next) {
    // Runs, then calls 'next' to proceed.
    // Get Auth header value, sends token in header as an authorization value.
    const bearerHeader = req.headers['authorization']; // Gets actual token.
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token 
        req.token = bearerToken;
        // Next
        next();
    } else {
        // Sends a Forbidden message if the bearer is undefined.
        res.sendStatus(403);
    }
}


// json object example
/*
{
    
    "message": "Post created.",         validation that the post was actually created.
    "authData": {                       name of our object
        "user": {                       user branch
            "id": 1,                    unique id
            "username": "brad",         unique username
            "email": "brad@gmail.com"   email (not unique)
        },
        "iat": 1526426965,              iat means "issued at", our token has a lifespan of 60 minutes.
        "exp": 1526426965               simply proclaims that there's an expiration time.
    }
}
*/
app.listen(PORT, () => console.log('Server started on port ' + PORT));




// Zach Frame 5/19/2018