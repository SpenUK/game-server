'use strict';

module.exports = {
	name: 'second',
	tileSet: {
		src: 'images/exampleTileSet.png',
		tilesX: 4,
		tilesY: 2,
		tileSize: 50
	},
	tilesX: 10,
	tilesY: 10,
	tileSize: 50,
	tileMap: [
		0,0,0,0,0,0,0,0,0,0,
		0,1,1,1,1,1,1,1,1,0,
		0,1,1,1,1,1,1,3,1,0,
		0,1,1,1,3,1,1,1,1,0,
		0,1,1,1,1,1,1,1,1,0,
		0,1,1,1,1,1,1,1,1,0,
		0,1,1,1,1,1,1,1,1,0,
		0,1,1,1,3,1,1,1,1,0,
		0,1,1,1,1,1,1,3,1,0,
		0,0,0,0,0,0,0,0,0,0
	],
	tileTypes: [
		{passable: false, base: 1, props: 0, cover: 0},
		{passable: true, base: 2, props: 0, cover: 0},
		{passable: false, base: 2, props: 5, cover: 0},
		{passable: true, base: 2, props: 4, cover: 0}
	],
	eventTiles: [
		{tile:6, target: {map: 'start', tile: 20 }},
		{tile:49, target: {map: 'third', tile: 20 }}
	]
};