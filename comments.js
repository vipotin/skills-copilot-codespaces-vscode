// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Read data from file
let comments = JSON.parse(fs.readFileSync('./comments.json'));

// Set up the body-parser
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Post a comment
app.post('/comments', (req, res) => {
    let newComment = {
        id: comments.length + 1,
        text: req.body.text,
        timestamp: new Date().getTime()
    };
    comments.push(newComment);
    fs.writeFileSync('./comments.json', JSON.stringify(comments));
    res.json(newComment);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});