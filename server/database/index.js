require('dotenv').config();

const mongoose = require('mongoose');

// Connect to desired MongoDB
mongoose.connect(process.env.DB_URL,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () =>  console.log(`Connected to DB`));