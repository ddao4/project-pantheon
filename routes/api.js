const express = require('express');
const router = express.Router();
// import feat to use in this file
const Feat = require('../models/feat');

// get list of feats from the database
router.get('/feats', function(req, res){
	res.send({type: 'GET'})
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
	res.send({type: 'PUT'})
});

// delete a feat from the db
router.delete('/feats/:id', function(req, res){
	Feat.findByIdAndRemove({_id: req.params.id}).then(function(feat){
		res.send(feat);
	});
});

// this allows you to export this file for use in other files
module.exports = router;