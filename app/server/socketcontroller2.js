var tokenController = require('./controllers/tokens');
var roomController = require('./controllers/rooms');

var displayInitialize = function () {
	console.log('display initialize', this.token);

	var hosting = roomController.hostRoom(this.token, this);
  	this.display = true;

  	if (hosting) {
  		this.emit('token created', this.token);
  	};
};

var controllerInitialize =  function (token) {
	console.log('controller initialize', token);

	this.controller = true;

	this.hostToken = token;

  	var joined = roomController.joinRoom(token, this);

  	if (joined) {
  		this.emit('controller joined');
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
	console.log('control: ', message);
	this.emit('control press', {
		message: message
	});
}

var onDisconnect = function(socket){
	var room = roomController.rooms[socket.token];
    console.log('user disconnected');

    if (socket.display) {
    	tokenController.removeToken(socket.token);
    	roomController.closeRoom(socket.token, socket);
    }

    if (socket.controller) {
    	roomController.leaveRoom(socket.hostToken, socket);
    }
}

module.exports = function (io) {

	io.on('connection', function (socket) {
		// console.log('connected', socket.id);
		socket.broadcast.emit('hi', socket.id);

		socket.token = tokenController.getUniqueId();
		tokenController.addToken(socket.token);

		socket.on('display initialize', displayInitialize.bind(socket));

		socket.on('controller initialize', controllerInitialize.bind(socket));

		socket.on('message test', sendBackMessage.bind(socket));

		socket.on('request token', requestToken.bind(socket));

		socket.on('control', onControl.bind(socket));

		socket.on('disconnect', onDisconnect.bind(socket));
	});
}