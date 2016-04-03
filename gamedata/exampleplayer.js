'use strict';

var player = {
	spriteMap: {
		src: 'images/fatty.png',
		tilesX: 4,
		tilesY: 8,
		tileheight: 32,
		tilewidth: 32,
		height: 256,
		width: 128,
		frameRate: 100
	},
	tileheight: 32,
	tilewidth: 32,
	width: 1,
	height: 2,
	offsetY: -1,
	offsetX: 0,
	zIndex: 2,
	sourceX: 0,
	sourceY: 0,
	location: {
		map: 'start',
		x: 4,
		y: 5
	}
};

module.exports = player;