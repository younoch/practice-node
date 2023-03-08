//Basic
const express = require('express');
const router = require('./src/routes/api.js')
const app = new express();
const bodyParser = require('body-parser')


//Security Middlewere

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitaze = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Database lib Import
const mongoose = require('mongoose');

//Security Middlewere Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitaze())
app.use(xss())
app.use(hpp())

//Body parser Implement
app.use(bodyParser.json());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 })
app.use(limiter);

// Mongo DB Database Connection

// let URL = 'mongodb://localhost:27017/Todo';
let URL = 'mongodb+srv://younoch295:Teletalk9@cluster0.3dxx8we.mongodb.net/?retryWrites=true&w=majority';
let OPTION = { user: '', pass: '', autoIndex: true }
mongoose.set("strictQuery", false);
mongoose.connect(URL, OPTION, (err)=> {
    console.log("Connection Sucess");
    console.log(err);
})

app.use('/api/v1', router);

//Undefiend route Implement

app.use('*', (req, res) => {
    res.status(404).json({status: "fail", data: "Not Found"})
})

module.exports = app;

