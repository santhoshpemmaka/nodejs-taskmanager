const express = require('express');
const mongoose = require('mongoose');
const bodyParsed = require('body-parser');
require('dotenv').config();
const taskRoutes = require('./router/taskManager');

const app = express();
const databaseUrl = process.env.DATABASE_URL;
app.use(bodyParsed.json());
app.use('/task-manager',taskRoutes);

mongoose.connect(databaseUrl)
.then(result => {
    const server = app.listen(8080);

})
.catch(err => {
    console.log("err",err);
})



