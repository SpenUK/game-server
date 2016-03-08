var _ = require('underscore');
var tokenController = {

	ids: [],

	sockets: [],

	checkId: function (id) {
		return !id || _.contains(this.ids, id);
	},

	generateId: function () {
		return _.map(_.range(0,8), function(){
			return _.sample('ABCFEFGHIJKLMNOPQRSTUVWXYZ');
		}).join('');
	},

	getUniqueId: function () {
		var id;

		while (this.checkId(id)) {
			id = this.generateId();
		}

		return id;
	},

	addToken: function (token) {
		if (this.checkId(token)) {
			return false;
		} else {
			this.ids.push(token);
		}
	},

	addSocket: function (socket) {
		if (this.checkId(socket.token)) {
			return false;
		} else {
			this.sockets.push({
				token: socket.token,
				socket: socket
			});
		}
	},

	removeToken: function (token) {
		this.ids = _.without(this.ids, token);
	},

	removeSocket: function (token) {
		this.sockets = _.without(this.sockets, _.findWhere({token: token}));
	}
}

module.exports = tokenController;