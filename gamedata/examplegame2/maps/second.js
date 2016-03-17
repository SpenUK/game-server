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
		0,1,1,1,1,1,1,1,1,0,
		0,1,1,1,1,1,1,1,1,0,
		0,1,1,1,1,1,1,1,1,4,
		0,1,1,1,1,1,1,1,1,5,
		0,1,1,1,1,1,1,1,1,0,
		0,1,1,1,1,1,1,1,1,0,
		0,1,1,1,1,1,1,1,1,0,
		0,0,0,0,2,3,0,0,0,0
	],
	tileTypes: [
		{blocker: 1111, base: 30, props: 0, cover: 0},
		{blocker: false, base: 1, props: 0, cover: 0},
		{blocker: false, base: 1, props: 0, cover: 0, portal: 0},
		{blocker: false, base: 1, props: 0, cover: 0, portal: 1},
		{blocker: false, base: 1, props: 0, cover: 0, portal: 2},
		{blocker: false, base: 1, props: 0, cover: 0, portal: 3}
	],
	eventTiles: [
		{tile:6, target: {map: 'start', tile: 20 }},
		{tile:49, target: {map: 'third', tile: 20 }}
	],

	portals: [
		{location:31, map: 'start', x: 6, y: 1},
		{location:31, map: 'start', x: 7, y: 1},
		{location:32, map: 'third', x: 0, y: 4},
		{location:32, map: 'third', x: 0, y: 5}
	]
};