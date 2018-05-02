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

// support econded bodies
router.use(bodyParser.urlencoded({ extended: true }));


// get list of feats 
router.get('/', (req, res)=>{
	//  finds feats, stores in function
	//if ($("#class-dropdown").value == 'any'){
		Feat.find({
			//$text:{$search: $("#feat-search-bar")}
			//'name': $("#feat-search-bar").val()
		}).then(function(feat){
			//console.log(feat);
			// renders the feats to the homepage, sets function 'feat'(which finds the feats) to array 'feats'
			res.render('homepage', {feats:feat});

		});
	//});
});


router.post('/', urlencodedParser, function(req,res){
	console.log('************');
	console.log(req.body.feat.school);
	console.log(req.body.feat.name);
	console.log(req.body.feat);
	console.log(typeof(req.body.feat.school));
	console.log(typeof(req.body.feat.name));
	console.log(typeof(req.body.feat));
	console.log('************');
  
	Feat.find({
		name: req.body.feat.name,
		school: req.body.feat.school,
	}).then(function(feat){
		// use res.send  ??? nate said
		res.render('homepage', {feats:feat});
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