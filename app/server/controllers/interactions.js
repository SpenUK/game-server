'use strict';

var _ = require('underscore');
var mapCache = require('../controllers/mapcache');
var datastore = require('../data/data');

function openStore (interaction) {

	var storeData = datastore.stores[interaction.storeId];

	var inventory = _.map(storeData.staples, function (item) {
		return _.extend({}, datastore.items[item.itemId], item);
	});

	var store = {
		name: storeData.name,
		inventory: inventory
	};

	this.emit('open store', store);
	this.broadcast.emit('open store', store);
}

module.exports = {
	handleInteraction: function (data) {
		var interaction = datastore.interactions[data.id];
		var type = datastore.interactionTypes[interaction.type];
		if (interaction.type === 'store' && interaction.storeId) {
			openStore.call(this, interaction);
		}
	}
};

// this.emit('interaction test', interaction);