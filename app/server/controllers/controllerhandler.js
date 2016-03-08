// var tokenController = require('./tokens');
// var roomController = require('./rooms');

module.exports = {

	namespace: 'controller',

	applySocket: function (socket) {
		socket.on(this.namespace + ': onControl', this.onControl.bind(socket));
		socket.on(this.namespace + ': testy', this.testy.bind(socket));
		console.log(this.namespace + ': testy');
	},

	testy: function () {
		console.log('testy', this.id);
	},

	onControl: function (message) {
		console.log('control: ', message, this.token);
		this.broadcast.emit('control press', {
			message: message,
			token: this.token
		});
	}
};

// var onDisplayControl = function (data) {
// 	console.log('control: ', message, this.token);
// 	this.broadcast.emit('control pressed', data);
// }

// var onDisconnect = function(socket){
// 	var room = roomController.rooms[this.token];
//     console.log('user disconnected', socket.token);

//     if (this.display) {
//     	tokenController.removeToken(this.token);
//     	roomController.closeRoom(this.token, this);
//     }

//     if (this.controller) {
//     	roomController.leaveRoom(this.hostToken, this);
//     }
// }

// var onDisplayDisconnect = function(socket){
// 	console.log(this.token + ' disconnected');
// 	tokenController.removeToken(this.token);
// 	roomController.closeRoom(this.token, this);
// }

// var onControllerDisconnect = function(socket){
//     console.log('controller user disconnected');
// 	roomController.leaveRoom(socket.hostToken, socket);
// }

// var onConnection = function (socket) {
// 	socket.broadcast.emit('hi', socket.id);

// 	socket.token = tokenController.getUniqueId();
// 	tokenController.addToken(socket.token);
// 	socket.emit('set token', socket.token);

// 	socket.on('display initialize', displayInitialize.bind(socket));

// 	socket.on('controller initialize', controllerInitialize.bind(socket));

// 	socket.on('message test', sendBackMessage.bind(socket));

// 	socket.on('request token', requestToken.bind(socket));

// 	socket.on('disconnect', onDisconnect);
// }

// module.exports = function (io) {
// 	io.on('connection', onConnection);
// }