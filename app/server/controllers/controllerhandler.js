module.exports = {

	namespace: 'controller',

	applySocket: function (socket) {
		socket.on(this.namespace + ': onControl', this.onControl.bind(socket));

		socket.on('purchase-item', this.onPurchaseItem.bind(socket));
	},

	onControl: function (message) {
		this.broadcast.emit('control press', {
			message: message,
			token: this.token
		});
	},

	onPurchaseItem: function (data) {
		console.log('purchase-item', data);
	}

};