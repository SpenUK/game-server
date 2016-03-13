module.exports = {

	namespace: 'controller',

	applySocket: function (socket) {
		socket.on(this.namespace + ': onControl', this.onControl.bind(socket));
	},

	onControl: function (message) {
		console.log('control: ', message, this.token);
		this.broadcast.emit('control press', {
			message: message,
			token: this.token
		});
	}
};