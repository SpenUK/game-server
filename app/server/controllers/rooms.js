var _ = require('underscore');

// var colorValues = ['#ff5a6e', '#00c8b4', '#244454', '#de7e44', '#0e7e44', '#0e7ec4'];

var roomController = {

	roomCapacity: 1,

	rooms: {},

	hostRoom: function (token, hostSocket) {
		var room = this.rooms[token];
		if (!room) {
			// room is free
			console.log('creating room');
			hostSocket.join(token);

			this.rooms[token] = {
				host: hostSocket,
				connections: []
			}

			return this.rooms[token];
		}
		// room is taken
		// console.log('room exists already');

		return false;
	},

	closeRoom: function (token, hostSocket) {
		var room = this.rooms[token];

		if (!room) {
			console.log('room does not exist');
			return true;
		}

		if (room.host === hostSocket) {

			// _.each(room.connections, leaveRoom)
			_.each(room.connections, function(connection){
				this.leaveRoom(token, connection);
			}, this);

			this.rooms[token] = null;

			console.log('removed:', !!this.rooms[token]);

			return true;
		} else {
			console.log('not host');
		}

		return false;
	},

	joinRoom: function (token, controllerSocket) {
		console.log('joinRoom called');
		var room = this.rooms[token];
		if (!room) {
			// no room exists
			console.log('room doesnt exist');
			return false;
		}

		console.log('room found');

		if (room.connections.length < this.roomCapacity) {
			// room exists and can be joined
			console.log('can join');
			controllerSocket.join(token);

			room.connections.push(controllerSocket);

			console.log('room.connections ' + room.connections.length, !!room.host);

			room.host.emit('controller joined');

			console.log('joined room:', room.host.id, room.connections.length);



			return true;
		}
		// room exists but is full
		//
		console.log('room is full:', room.connections.length);

		return false;
	},

	leaveRoom: function (token, controllerSocket) {
		var room = this.rooms[token];
		console.log('leaveRoom');
		if (room) {
			console.log('leaveRoom');
			room.host.emit('controller left', controllerSocket.id);
			this.rooms[token].connections = _.without(room.connections, controllerSocket);

			return true;
		} else {
			console.log('no room');
		}

		return false;
	}
};

module.exports = roomController