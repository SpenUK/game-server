var datastore = require('../../data/data');

module.exports = {

	applySocket: function (socket) {
		socket.on(this.namespace + ': onControl', this.onControl.bind(socket));

		socket.on('purchase-item', this.onPurchaseItem.bind(socket));

		socket.on('store items position change', this.onStoreItemsPositionChange.bind(socket));
	},

	onControl: function (message) {
		this.broadcast.emit('control press', {
			message: message,
			token: this.token
		});
	},

	// need to be able to access 'player' to validate purchase.
	onPurchaseItem: function (data) {
		var itemData = datastore.items[data.itemId];

		if (itemData) {
			console.log('purchase-item ', data.quantity + '*' + itemData.price + ' = ' + data.quantity * itemData.price);
		} else {
			console.log('purchase-item, item not found?');
		}
	},

	onStoreItemsPositionChange: function (data) {
		console.log('onStoreItemsPositionChange', data);
		this.broadcast.emit('store items position changed', {
			position: data.position
		});
	},
};