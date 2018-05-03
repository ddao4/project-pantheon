const express = require('express');
const router = express.Router();
// import feat model to use in this file
const Feat = require('../models/feat');
const bodyParser = require('body-parser');



// middleware that passes our POST data for us, and stores it inside urlencodedParser 
//const urlencodedParser = bodyParser.urlencoded({ extended: false });

// support json ecoded bodies
// must be before routes because it attaches json to send response
router.use(bodyParser.json());

// support encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/', (req, res)=>{

	res.render('homepage');

});


router.post('/', function(req,res){
	// const query = {}
	// if (req.body.feat.school && req.body.feat.school !=='any') 
	// 	query.school = req.body.feat.school
	// if (req.body.feat.name)
	// 	query.name = req.body.feat.name

	var school = req.body.feat.school;
	var name = req.body.feat.name;
	var prereq = {}
	prereq.statType = req.body.feat.statType;
	prereq.statRank = req.body.feat.statRank;

	
	if (school != 'any')
		var query = {$text:{$search:`"${name}" "${school}"`}}
	else if (school == 'any' && name == '')
		query = {}
	else
		query = {$text:{$search: name}}
	

	console.log("Attempted query:");
	console.log(query);
	console.log(prereq);



	Feat.find(query).then(function(feat){
		if (prereq.statType != 'any' && prereq.statRank != 'any'){
			MatchRequirements(prereq, feat, function(result){
				console.log("**************************************************");
				console.log(result);
				console.log("**************************************************");
				res.send(result);
			})
		}else
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


//prereq here is a json object
function MatchRequirements(prereq, result, callback){
	var finalResult = [];
	var indexMeetsSearch = true;

	//iterate through db results
	for(var i = 0; i < result.length; i++){
		//just a note, this assumes that every entry has an array, even a blank one, for stat_req

		if(result[i].prereq != null && result[i].prereq.stat_req[0] != null){
			console.log("Prereq exists");
			var stat_req = result[i].prereq.stat_req;
			indexMeetsSearch = true;
			var j = 0;

			console.log(`searching req: ${result[i].name}`);

			while(indexMeetsSearch && j < stat_req.length) {
				var stat_type = stat_req[j].stat_type.toUpperCase();
				var stat_limit = Enumerate(stat_req[j].stat_limit);
				var isMin = stat_req[j].is_limit_min;
				console.log("this is the stat_limit ");
				console.log(stat_req[j].stat_limit);
				console.log("this is the stat_type: ");
				console.log(stat_type);
				
				var test = Enumerate(stat_req[j].stat_limit);
				console.log(test+"*********************");

				//only compare STR to STR, not STR to CHA
				if(prereq.statType == stat_type){
					//check if the limit applies
				
					console.log(stat_limit);

					var meetsThisReq = (isMin) ? (stat_limit <= (Enumerate(prereq.statRank))) : (stat_limit >= (Enumerate(prereq.statRank)));
					if(!meetsThisReq)
						indexMeetsSearch = false;
					else
						j++;
				}
				else
					j++
			}// end while

			if(indexMeetsSearch){
				console.log(`  >  ${result[i].name} pushed to final`);
				finalResult.push(result[i]);
			}
			else
				console.log(`  >  ${result[i].name} did not qualify.`);
		}//end if(result[i].stat_req exists)


	}//end for
	
	callback(finalResult);
	console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
	console.log(finalResult);
	console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

}

function Enumerate(str){
	var x;

	switch(str){
		case 'S': x = 75;
			break;
		case 'A+': x = 65;
			break;
		case 'A': x = 50;
			break;
		case 'B+': x = 40;
			break;
		case 'B': x = 25;
			break;
		case 'C+': x = 10;
			break;
		case 'C': x = 0;
			break;
		case 'D+': x = -15;
			break;
		case 'D': x = -25;
			break;
		case 'F+': x = -40;
			break;
		case 'F': x = -50;
			break;
		case 'F-': x = -75;
			break;
		default: x = null;
			break;
	}

	return x;
}





// this allows you to export this file for use in other files
module.exports = router;