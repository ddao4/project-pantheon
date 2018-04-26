const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

var StatReqSchema = new Schema({
	stat_type: String,
	stat_limit: String,
	is_limit_min: Boolean
});

const Feat = mongoose.model('feat', FeatSchema);

module.exports = Feat;