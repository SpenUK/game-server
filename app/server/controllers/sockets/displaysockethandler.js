module.exports = {
	applySocket: function (socket) {
		socket.on('start battle', this.onBattleAction.bind(socket));
		socket.on('player-interaction', this.onPlayerInteraction.bind(socket));
	},

	onBattleAction: function (data) {
		this.broadcast.emit('battle:response', {
			message: 'battle response'
		});
	},

	onPurchaseItem: function (data) {

		console.log('data----', !!data, data);
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
				interactionsController.handleInteraction.call(this, interaction);
			} else {
				console.log(interaction ? 'no id' : 'not found');
			}
		}
	}
};