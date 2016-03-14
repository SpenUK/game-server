'use strict';

var player = {
	spriteMap: {
		src: 'images/3264player.png',
		tilesX: 1,
		tilesY: 2,
		tileSize: 32,
		height: 64,
		width: 32,
		frameRate: 100
	},
	tileSize: 32,
	width: 1,
	height: 2,
	offsetY: -1,
	location: {
		map: 'start',
		x: 6,
		y: 6
	}
};

module.exports = player;