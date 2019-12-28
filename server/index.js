require('dotenv').config();

const express = require('express');
const path = require('path');

const apiRoute = require('./routes/api');

const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use(express.json()),
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoute);

app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server started (port: ${PORT})`) );

