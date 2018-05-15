const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello Zach. Welcome to the API.'
    });
});


app.post('/api/posts', verifyToken /* Middleware function */, (req, res) => {
    res.json({
        message: 'Post created... Looking good'
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
    jwt.sign({user}, 'secretkey', (err, token) => {
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
    if(typeof bearerHeader !== 'undefined'){

    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

app.listen(5100, () => console.log('Server started on port 5100'));