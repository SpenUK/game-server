'use strict';

var npcs = {
	'npc-1': {
		src: 'images/3264player-green.png',
		tilesX: 1,
		tilesY: 2,
		tileSize: 32,
		frameRate: 100,
		width: 1,
		height: 2,
		offsetY: -1,
		behaviours: ['vendor'],
		inventory: [
			{ref: 'thing', price: 200}
		]
	},
	'npc-2': {
		src: 'images/3264player-pink.png',
		tilesX: 1,
		tilesY: 2,
		tileSize: 32,
		frameRate: 100,
		width: 1,
		height: 2,
		offsetY: -1
	},
};

module.exports = npcs;