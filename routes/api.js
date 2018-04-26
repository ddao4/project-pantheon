const express = require('express');
const router = express.Router();

// get list of feats from the database
router.get('/feats', function(req, res){
	res.send({type: 'GET'})
});

// add a new feat to the db
router.post('/feats', function(req, res){
	res.send({type: 'POST'})
});

// update a feat in the db
router.put('/feats/:id', function(req, res){
	res.send({type: 'PUT'})
});

// delete a feat from the db
router.delete('/feats/:id', function(req, res){
	res.send({type: 'DELETE'})
});