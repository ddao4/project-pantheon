const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

// import schema for use here
const Feat = require('./models/feat.js');

// set up express app
const app = express();

// middleware that passes our POST data for us, and stores it inside urlencodedParser 
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// use ejs as view engine
app.set('view engine', 'ejs');

// connect to mongodb
mongoose.connect('mongodb://jtemple5:Gt5isboss@ds011785.mlab.com:11785/pantheon_test');
mongoose.Promise = global.Promise;

mongoose.connection.once('open', function(){
	console.log('Connected to mongodb :)');
}).on('error', function(error){
	console.log("Could not connect to mongo db :(");
})

// support json ecoded bodies
// must be before routes because it attaches json to send response
app.use(bodyParser.json());

// support econded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// listen for requests
// if using provided port for something like heroku, it will use process.env.port
// otherwise it uses 4000/whatever we set it to for local hosting
app.listen(process.env.port || 4000, function(){
	console.log('Connected to port :)');
})

// specify to use routes from api.js in routes folder
app.use('/', require('./routes/api'));
















