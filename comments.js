// Create web server

// Import the express module
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create a new web server
const app = express();

// Use the body-parser middleware to parse the body of the request
app.use(bodyParser.json());

// Use the express.static middleware to serve static files
app.use(express.static('public'));

// Read the comments.json file
let comments = [];
fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        comments = JSON.parse(data);
    }
});

// Define a route to get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Define a route to add a comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            console.log(err);
        } else {
            res.json(comment);
        }
    });
});

// Start the web server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});