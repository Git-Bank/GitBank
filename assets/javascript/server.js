// ===========================================
// =====            App.js               =====
// ===========================================

// Requirements: express (server management) 
// jswt (jsonwebtoken) (Creates web tokens)
const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const app = express();


app.get('/api', (req, res) => {
    res.json({
        message: 'Hello. Welcome to the API.'
    });
});


app.post('/api/posts', verifyToken /* Middleware function */ , (req, res) => {
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

app.post('/api/login', (req, res) => {
    // callback function (asynch)
    // Usually you'd have a database full of users that you'd be getting a req. from
    // this is a mock user
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
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
app.listen(5300, () => console.log('Server started on port 5300'));

