'use strict';

var _ = require('underscore');
var mapCache = require('../controllers/mapcache');
var datastore = require('../data/data');
// var mongoose = require('mongoose');
// var Map = require('../models/map');
// var Entity = require('../db/models/entity');

module.exports = {

	namespace: 'game',

	initialize: function() {
		this.cacheMaps();
	},

	cacheMaps: function () {
		mapCache.setServerMap('start'),
		mapCache.setServerMap('second'),
		mapCache.setServerMap('third'),
		mapCache.setServerMap('third-shop-one'),
		mapCache.setServerMap('third-shop-two'),
		mapCache.setClientMap('start'),
		mapCache.setClientMap('second'),
		mapCache.setClientMap('third'),
		mapCache.setClientMap('third-shop-one'),
		mapCache.setClientMap('third-shop-two');
	},

	applySocket: function (socket) {
		socket.on(this.namespace + ':battle:action', this.onBattleAction.bind(socket));
		console.log('applying socket');
		socket.on('player-interaction', this.onPlayerInteraction.bind(socket));
	},

	onBattleAction: function (data) {
		this.broadcast.emit('battle:response', {
			message: 'battle response'
		});
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
				var message = datastore.interactions[interaction.id];
				console.log('interaction test', message);
				this.emit('interaction test', message);
			} else {
				console.log(interaction ? 'no id' : 'not found');
			}
		}
	}
};