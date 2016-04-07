'use strict';

var tokenController = require('../tokens');
var roomController = require('../rooms');
var gameController = require('../game');
var displaySocketHandler = require('./controllersockethandler');
var controllerSocketHandler = require('./controllersockethandler');

var displayInitialize = function () {
	var hosting = roomController.hostRoom(this.token, this);

  	this.display = true;

  	if (hosting) {
  		this.emit('token created', this.token);

  		// set up game specific events // display
		gameController.applySocket(this);
  	};

  	this.removeListener('disconnect', onDisconnect);

  	this.on('disconnect', onDisplayDisconnect.bind(this));
};

var controllerInitialize =  function (token) {
	this.controller = true;

	this.hostToken = token;

	console.log('controller init', token);

  	var joined = roomController.joinRoom(token, this);

  	if (joined === true) {
  		this.emit('controller joined');
  		this.on('control:down', onControlDown.bind(this));
  		this.on('control:up', onControlUp.bind(this));

  		controllerSocketHandler.applySocket(this);
  	} else {
  		this.emit('controller rejected', joined.error);
  	}
};

var requestToken = function () {
	if (this.display) {
		this.emit('token generated', {
			token: this.token
		});
	}
}

var requestHost = function (token) {
	// if (this.display) {
	// 	this.emit('token generated', {
	// 		token: this.token
	// 	});
	// }
	console.log('requested host:', token);
}

var onControlDown = function (message) {
	this.to(this.hostToken).emit('control down', {
		message: message,
		token: this.token
	});
}

var onControlUp = function (message) {
	this.to(this.hostToken).emit('control up', {
		message: message,
		token: this.token
	});
}

var onDisconnect = function(socket){
	var room = roomController.rooms[this.token];

    if (this.display) {
    	tokenController.removeToken(this.token);
    	roomController.closeRoom(this.token, this);
    }

    if (this.controller) {
    	roomController.leaveRoom(this.hostToken, this);
    }
}

var onDisplayDisconnect = function(socket){
	tokenController.removeToken(this.token);
	roomController.closeRoom(this.token, this);
}

var onControllerDisconnect = function(socket){
	roomController.leaveRoom(socket.hostToken, socket);
}

var onConnection = function (socket) {
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