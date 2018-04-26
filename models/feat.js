const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema for prereq stats. must come first to use in FeatSchem
var StatReqSchema = new Schema({
	stat_type: String,
	stat_limit: String,
	is_limit_min: Boolean
});

// create feat schema & model
const FeatSchema = new Schema({
	name: String,
	school: String,
	effect: String,
	prereq: {
		stat_req: [StatReqSchema],
		skill_req: [String],
		misc_req: [String]
	},
	type: Boolean, //active or passive
	description: String
});


// creates variable to access Feat based on the model
const Feat = mongoose.model('feat', FeatSchema);

// export Feat for use in other files
module.exports = Feat;