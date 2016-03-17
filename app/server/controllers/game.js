'use strict';

module.exports = {

	namespace: 'game',

	applySocket: function (socket) {
		socket.on(this.namespace + ':battle:action', this.onBattleAction.bind(socket));
	},

	onBattleAction: function (message) {
		this.broadcast.emit('battle:response', {
			message: 'battle response'
		});
	}
};