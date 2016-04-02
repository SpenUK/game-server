var mongoose = require('mongoose');

module.exports = mongoose.Schema({

	name: {
		type: String,
		default: 'noname'
		// enum?
	},

	type: {
		type: String,
		default: 'entity'
	},

	typeId: {
		type: Number, // type?
		default: 0
	},

	map: {
		type: String,
		default: 'entity'
	},

	mapId: {
		type: Number, // type?
		default: 0
	},

	x: {
		type: Number, // type?
		default: -1
	},

	y: {
		type: Number, // type?
		default: -1
	}
	// futher properties that override class defaults?
	// the same 'entity' might appear in more than one place with different values...
});
