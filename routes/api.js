const express = require('express');
const router = express.Router();
// import feat model to use in this file
const Feat = require('../models/feat');
const bodyParser = require('body-parser');



// middleware that passes our POST data for us, and stores it inside urlencodedParser 
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// support json ecoded bodies
// must be before routes because it attaches json to send response
router.use(bodyParser.json());

// support encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));


// get list of feats 
router.get('/', (req, res)=>{

	res.render('homepage');

	/*
	//  finds feats, stores in function
		Feat.find({
			//$text:{$search: $("#feat-search-bar")}
		}).then(function(feat){
			// renders the feats to the homepage, sets function 'feat'(which finds the feats) to array 'feats'
			res.render('homepage', {feats:feat});
		});
	*/
});


router.post('/', urlencodedParser, function(req,res){

	const query = {}
	if (req.body.feat.school && req.body.feat.school !=='any') 
		query.school = req.body.feat.school
	if (req.body.feat.name)
		query.name = req.body.feat.name
	console.log("Attempted query:");
	console.log(query);

	Feat.find(query).then(function(feat){
		// use res.send  ??? nate said
		res.send(feat);
		
	});
});



// get list of feats from the database
router.get('/feats', function(req, res){
	// finds feats, stores it in function
	Feat.find({}).then(function(feat){
		// sends feat function info to browser
		res.send(feat);
	});
});

// add a new feat to the db
router.post('/feats', function(req, res){
	// can use because we imported feat at top of file. this creates a feat then saves to db
	Feat.create(req.body).then(function(feat){
		// sends response back to user so user knows it saved successfully
		res.send(feat);
	});
	
});

// update a feat in the db
router.put('/feats/:id', function(req, res){
	Feat.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
		Feat.findOne({_id: req.params.id}).then(function(feat){
			res.send(feat);
		});		
	});
});

// delete a feat from the db
router.delete('/feats/:id', function(req, res){
	Feat.findByIdAndRemove({_id: req.params.id}).then(function(feat){
		res.send(feat);
	});
});

// this allows you to export this file for use in other files
module.exports = router;