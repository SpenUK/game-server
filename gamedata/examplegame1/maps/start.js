'use strict';

module.exports = {
	name: 'start',
	tileSet: {
		src: 'images/exampleTileSet.png',
		tilesX: 4,
		tilesY: 2,
		tileSize: 50
	},
	tilesX: 10,
	tilesY: 20,
	tileSize: 50,
	tileMap: [
		1,1,1,1,1,1,1,1,1,1,
		1,2,2,2,4,2,2,2,2,1,
		1,2,2,2,2,2,2,4,2,1,
		1,2,2,2,4,2,2,2,2,1,
		1,2,2,2,2,2,2,2,2,1,
		1,2,2,2,2,2,2,2,2,1,
		1,2,2,2,2,2,2,2,2,1,
		1,2,2,2,4,2,2,3,2,1,
		1,2,2,2,2,2,2,4,2,1,
		1,1,1,2,2,2,1,1,1,1,
		1,1,1,2,2,2,1,0,0,0,
		1,2,2,2,2,2,1,0,0,0,
		1,2,3,2,2,2,1,1,1,1,
		1,2,2,2,4,2,2,2,2,1,
		1,2,2,3,2,2,2,2,2,1,
		1,2,2,2,2,2,2,2,2,1,
		1,2,2,2,2,2,2,2,2,1,
		1,2,2,2,4,2,2,2,2,1,
		1,2,2,2,2,2,2,4,2,1,
		1,1,1,1,1,1,1,1,1,1
	],
	tileTypes: [
		{passable: false, base: 0, props: 0, cover: 0},
		{passable: false, base: 1, props: 0, cover: 0},
		{passable: true, base: 2, props: 0, cover: 0},
		{passable: false, base: 2, props: 5, cover: 0},
		{passable: true, base: 2, props: 4, cover: 0}
	],
	eventTiles: [
		{location:6, target: {map: 'second', tile: 20 }},
		{location:22, target: {map: 'third', tile: 20 }},
		{location:49, target: {map: 'third', tile: 20 }}
	]
};