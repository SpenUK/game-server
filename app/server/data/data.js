// var maps = require(./maps/maps);
var npcs = require('./npcs/npcs');
var interactions = require('./interactions/interactions');
var interactionTypes = require('./interactions/types');
var items = require('./items/items');
var stores = require('./stores/stores');

module.exports = {
	interactions: interactions,
	interactionTypes: interactionTypes,
	npcs: npcs,
	items: items,
	stores: stores
};