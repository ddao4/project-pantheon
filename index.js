const express = require('express');
const bodyParser = require('body-parser');

// set up express app
const app = express();

// must be before routes because it attaches json to send response
app.use(bodyParser.json());

// listen for requests
// if using provided port for something like heroku, it will use process.env.port
// otherwise it uses 4000/whatever we set it to for local hosting
app.listen(process.env.port || 4000, function(){
	console.log('Succesfully connected :)');
})

// specify to use routes from api.js in routes folder
app.use('/api', require('./routes/api'));
