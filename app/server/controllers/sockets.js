var tokenController = require('./tokens');
var roomController = require('./rooms');
var controllerSocketHandler = require('./controllerhandler');

var displayInitialize = function () {
	console.log('display initialize', this.token);

	var hosting = roomController.hostRoom(this.token, this);
  	this.display = true;

  	if (hosting) {
  		this.emit('token created', this.token);
  	};

  	this.removeListener('disconnect', onDisconnect);

  	this.on('disconnect', onDisplayDisconnect.bind(this));
};

var controllerInitialize =  function (token) {
	console.log('controller initialize', token);

	this.controller = true;

	this.hostToken = token;

  	var joined = roomController.joinRoom(token, this);

  	if (joined) {
  		console.log('joined');
  		this.emit('controller joined');
  		this.on('control', onControl.bind(this));

  		controllerSocketHandler.applySocket(this);

  	} else {
  		console.log('not joined');
  	}

};

var sendBackMessage = function (message) {
	if (message) {
		io.emit('message', {
			id: this.id,
			type: 'messagy',
			copy: message
		});
	}
}

var requestToken = function () {
	if (this.display) {
		this.emit('token generated', {
			token: this.token
		});
	}
}

var onControl = function (message) {
	console.log('control: ', message, this.token);
	this.broadcast.emit('control press', {
		message: message,
		token: this.token
	});
}

// var onDisplayControl = function (data) {
// 	console.log('control: ', message, this.token);
// 	this.broadcast.emit('control pressed', data);
// }

var onDisconnect = function(socket){
	var room = roomController.rooms[this.token];
    console.log('user disconnected', socket.token);

    if (this.display) {
    	tokenController.removeToken(this.token);
    	roomController.closeRoom(this.token, this);
    }

    if (this.controller) {
    	roomController.leaveRoom(this.hostToken, this);
    }
}

var onDisplayDisconnect = function(socket){
	console.log(this.token + ' disconnected');
	tokenController.removeToken(this.token);
	roomController.closeRoom(this.token, this);
}

var onControllerDisconnect = function(socket){
    console.log('controller user disconnected', socket.hostToken);
	roomController.leaveRoom(socket.hostToken, socket);
}

var onConnection = function (socket) {
	socket.broadcast.emit('hi', socket.id);

	socket.token = tokenController.getUniqueId();
	tokenController.addToken(socket.token);
	socket.emit('set token', socket.token);

	socket.on('display initialize', displayInitialize.bind(socket));

	socket.on('controller initialize', controllerInitialize.bind(socket));

	socket.on('request token', requestToken.bind(socket));

	socket.on('disconnect', onDisconnect);
}

module.exports = function (io) {
	io.on('connection', onConnection);
}