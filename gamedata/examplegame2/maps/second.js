'use strict';

module.exports = {
	title: 'second',
	tileSet: {
		src: 'images/rpg-tiles.png',
		tilesX: 9,
		tilesY: 6,
		tileSize: 32
	},
	tilesX: 10,
	tilesY: 10,
	tileSize: 32,
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
		0,0,0,0,0,0,0,4,0,0
	],
	tileTypes: [
		{blocker: false, base: 1, props: 0, cover: 0},
		{blocker: false, base: 2, props: 0, cover: 0},
		{blocker: false, base: 0, props: 0, cover: 0},
		{blocker: 1111, base: 0, props: 0, cover: 0},
		{blocker: false, base: 20, props: 0, cover: 0, portal: 0}
	],
	eventTiles: [
		{tile:6, target: {map: 'start', tile: 20 }},
		{tile:49, target: {map: 'third', tile: 20 }}
	],

	portals: [
		{location:31, map: 'start', x: 5, y: 5},
		{location:32, map: 'third', x: 3, y: 7}
	]
};