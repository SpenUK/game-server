'use strict';

var _ = require('underscore');
var mapCache = require('../controllers/mapcache');
var datastore = require('../data/data');
var interactionsController = require('./interactions');
// var mongoose = require('mongoose');
// var Map = require('../models/map');
// var Entity = require('../db/models/entity');

var tokenController = require('./tokens');
var roomController = require('./rooms');
var displaySocketEvents = require('./sockets/displaysockethandler');
var controllerSocketEvents = require('./sockets/controllersockethandler');

var Game = {

	create: function () {
		var instance = Object.create(this);
		instance.constructor.apply(this, arguments);
		// console.log('game created');
		return instance;
	},

	constructor: function () {
		this.generateToken();
		_.bindAll(this, 'onControlUp',
						'onControlDown',
						'onPlayerInteraction',
						'onShowStoreItem',
						'onChangeStoreItemsPosition',
						'onPurchaseItem',
						'onDisplayDisconnect',
						'onControllerDisconnect');

		this.sockets = {};
	},

	assignSocket: function (socket) {
		var token = this.token;

		if (socket.isDisplay) {
			if (!this.sockets.display) {
				roomController.hostRoom(token, socket);

				this.sockets.display = socket;

				socket.emit('token:generated', {
					token: this.token
				});

				socket.on('player:interaction', this.onPlayerInteraction);

				socket.on('disconnect', this.onDisplayDisconnect);
			} else {
				socket.emit('display:rejected');
			}

		} else if (socket.isController) {
			if (!this.sockets.controller) {
				roomController.joinRoom(token, socket);

				this.sockets.controller = socket;

				socket.emit('controller:joined');

				// controls
				socket.on('control:down', this.onControlDown);
  				socket.on('control:up', this.onControlUp);
  				// store
  				socket.on('store:show-store-item', this.onShowStoreItem);
  				socket.on('store:change-items-position', this.onChangeStoreItemsPosition);
  				socket.on('store:purchase-item', this.onPurchaseItem);

  				socket.on('disconnect', this.onControllerDisconnect);

			} else {
				socket.emit('controller:rejected');
			}
		}
	},

	onPlayerInteraction: function (data) {
		// depending on interaction type, update controller view.
		// means keeping track of current controller view type - client or server?
		// server could mean only sending new views when needed?
		// console.log('player interaction', data.mapName, data.x, data.y, data.entityId);
		// also need to validate that this interaction is available...
		// !!mapCache.getServerMap(data.mapName);
		var map = mapCache.getServerMap(data.mapName);

		if (map && map.interactions && map.interactions.length) {
			var interaction = _.findWhere(map.interactions, {
				x: data.x, y: data.y
			});

			if (interaction && interaction.id) {
				// interactionsController.handleInteraction(interaction);
				this.handleInteraction(interaction);
			} else {
				console.log(interaction ? 'no id' : 'not found');
			}
		}
	},

	handleInteraction: function (data) {
		var interaction = datastore.interactions[data.id];
		var type = datastore.interactionTypes[interaction.type];
		if (interaction.type === 'store' && interaction.storeId) {
			this.openStore(interaction);
		}
	},

	openStore: function (interaction) {
		console.log('open store');
		var storeData = datastore.stores[interaction.storeId];

		var inventory = _.map(storeData.staples, function (item) {
			return _.extend({}, datastore.items[item.itemId], item);
		});

		var store = {
			name: storeData.name,
			storeId: storeData.Id,
			inventory: inventory
		};

		this.sockets.display.emit('store:open', store);
		this.sockets.controller.emit('store:open', store);
	},

	onShowStoreItem: function (data) {
		// could be better logic for getting non-default item price (in the case where a store sells for a higher price etc.)
		// console.log('onSelectStoreItem', datastore.items[data.itemId]);
		this.sockets.display.emit('store:show-store-item', datastore.items[data.itemId]);
	},

	onChangeStoreItemsPosition: function (data) {
		// console.log('onStoreItemsPositionChange', data);
		this.sockets.display.emit('store:update-items-position', {
			position: data.position
		});
	},

	onPurchaseItem: function (data) {
		var itemData = datastore.items[data.itemId];

		if (itemData) {
			// console.log('store:purchase-item ', data.quantity + '*' + itemData.price + ' = ' + data.quantity * itemData.price);
		} else {
			// console.log('store:purchase-item, item not found?');
		}
	},

	onControlUp: function (key) {
		this.sockets.controller.to(this.token).emit('control up', {
			key: key
		});
	},

	onControlDown: function (key) {
		this.sockets.controller.to(this.token).emit('control down', {
			key: key
		});
	},

	addPlayer: function () {
		// for the future maaaaan
	},

	generateToken: function () {
		this.token = tokenController.getUniqueId();
		tokenController.addToken(this.token);

		return this.token;
	},

	getControllerSocket: function () {
		return this.sockets.controller;
	},
	getDisplaySocket: function () {
		return this.sockets.display;
	},

	onDisplayDisconnect: function () {
		roomController.closeRoom(this.token, this.sockets.controller);

		delete this.sockets.display;
		delete this.sockets.controller;
	},

	onControllerDisconnect: function () {
		roomController.leaveRoom(this.token, this.sockets.controller);

		delete this.sockets.controller;
	},

	sockets: {
		display: null,
		controller: null
	}

}

module.exports =  {

	games: {},

	createGame: function (options) {
		var game = Game.create(options),
			token = game.token;

		this.games[token] = game;

		return game;
	},

	getGameByToken: function (token) {
		return this.games[token];
	},

	destroyGame: function (game) {
		var token = _.isString(game) ? game : game.token;

		delete this.games[token];
	}

};
