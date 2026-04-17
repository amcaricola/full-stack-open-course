const express = require('express');
const app = express();
const cors = require('cors');
const blogRouter = require('./controller/blogs.js');

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;
