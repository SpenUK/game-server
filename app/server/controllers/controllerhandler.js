module.exports = {

	namespace: 'controller',

	applySocket: function (socket) {
		socket.on(this.namespace + ': onControl', this.onControl.bind(socket));
	},

	onControl: function (message) {
		this.broadcast.emit('control press', {
			message: message,
			token: this.token
		});
	}
};