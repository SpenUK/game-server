var _ = require('underscore');

var roomController = {

	roomCapacity: 1,

	rooms: {},

	hostRoom: function (token, hostSocket) {
		var room = this.rooms[token];
		if (!room) {
			hostSocket.join(token);

			this.rooms[token] = {
				host: hostSocket,
				connections: []
			}

			return this.rooms[token];
		}

		return false;
	},

	closeRoom: function (token, hostSocket) {
		var room = this.rooms[token];

		if (!room) {
			return true;
		}

		if (room.host === hostSocket) {
			_.each(room.connections, function(connection){
				this.leaveRoom(token, connection);
			}, this);

			this.rooms[token] = null;

			return true;
		}

		return false;
	},

	joinRoom: function (token, controllerSocket) {
		var room = this.rooms[token],
			errorMessage;
		if (!room) {
			errorMessage = 'No host found for: ' + token;

		} else if (room.connections.length < this.roomCapacity) {

			room.connections.push(controllerSocket);

			room.host.emit('controller joined');

			return true;

		} else {
			errorMessage = 'Room full for host: ' + token;
		}

		return {
			error: errorMessage
		};
	},

	leaveRoom: function (token, controllerSocket) {
		var room = this.rooms[token];

		if (room) {
			room.host.emit('controller left', controllerSocket.id);
			this.rooms[token].connections = _.without(room.connections, controllerSocket);

			return true;
		}

		return false;
	}
};

module.exports = roomController