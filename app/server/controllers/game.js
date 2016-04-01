'use strict';

var mapCache = require('../controllers/mapcache');
var mongoose = require('mongoose');
// var Map = require('../models/map');

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

		// Map.findOne({'name': data.mapName}, function(err,doc){
		// 	if (err) {
		// 		console.log(err);
		// 		return false;
		// 	}
		// 	console.log('doc:' + doc);
		// });
	}
};