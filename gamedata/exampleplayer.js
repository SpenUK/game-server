'use strict';

var player = {
	spriteMap: {
		src: 'images/examplePlayerSpriteMap.png',
		tilesX: 5,
		tilesY: 4,
		tileSize: 50,
		height: 200,
		width: 250
	},
	tileSize: 50,
	width: 50,
	height: 50,
	location: {
		map: 'start',
		x: 2,
		y: 2
	}
};

module.exports = player;