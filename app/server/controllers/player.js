var Player = {

	create: function () {
		var instance = Object.create(this);
		instance.constructor.apply(this, arguments);
		// console.log('game created');
		return instance;
	},

	constructor: function (options) {
		options = options;
		this.money = 1000;
	}

};

module.exports = Player;