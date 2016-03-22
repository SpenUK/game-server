'use strict';

module.exports = {
	title: 'start',
	tileSet: {
		src: 'images/rpg-tiles.png',
		tilesX: 9,
		tilesY: 6,
		tileSize: 32
	},
	tilesX: 36,
	tilesY: 20,
	tileSize: 32,
	tileMap: [
		1, 15,28,29,28,29,30,31,28,29,28,29,28,29,12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,15,28,29,28,29,30,31,28,29,12, 1,
		15,23,36,37,36,37,38,39,36,37,36,37,36,37,27,12, 1, 1, 1, 1, 1, 1, 1, 1,15,23,36,37,36,37,42,43,36,37,27,12,
		16,33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,26,11, 1, 1, 1, 1, 1, 1, 1,15,23,33, 1, 1, 1, 1, 1, 1, 1, 1,26,11,
		17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10, 1, 1, 1, 1, 1, 1,15,23,33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10,
		17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10, 1, 1, 1, 1, 1, 1,16,33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10,
		17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10, 1, 1, 1, 1, 1, 1,17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10,
		17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10, 1, 1, 1, 1, 1, 1,17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10,
		17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10, 1, 1, 1, 1, 1, 1,17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10,
		17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,18,19, 1, 1, 1, 1, 1,17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10,
		17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,26,27,19, 1, 1, 1, 1,17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10,
		17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,26,11, 1, 1, 1, 1,17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10,
		17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10, 1, 1, 1, 1,17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10,
		17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,18,19, 1, 1,24,25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10,
		17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,26,27,28,29,32,33, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10,
		17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,35,36,37,40, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10,
		17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10,
		17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10,
		17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10,
		17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,10,
		13, 5, 6, 7, 8, 5, 4, 5, 4, 8, 3, 5, 4, 5, 4, 3, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4,22
	],
	tileTypes: [
		{blocker: 1111, base: 0, props: 0, cover: 0, event: false},
		{blocker:    0, base: 1, props: 0, cover: 0, event: false},
		{blocker: 1111, base: 10, props: 0, cover: 0, event: false},
		{blocker: 1000, base: 11, props: 0, cover: 0, event: false},
		{blocker: 1000, base: 12, props: 0, cover: 0, event: false},

		{blocker: 1000, base: 13, props: 0, cover: 0, event: false},
		{blocker: 1000, base: 14, props: 0, cover: 0, event: false},
		{blocker: 1000, base: 15, props: 0, cover: 0, event: false},
		{blocker: 1000, base: 16, props: 0, cover: 0, event: false},
		{blocker: 1111, base: 17, props: 0, cover: 0, event: false},


		{blocker: 1111, base: 19, props: 0, cover: 0, portal: false},
		{blocker: 1111, base: 20, props: 0, cover: 0, portal: false},
		{blocker:    0, base: 21, props: 0, cover: 0, portal: false},
		{blocker: 1000, base: 22, props: 0, cover: 0, portal: false},
		{blocker: 1000, base: 23, props: 0, cover: 0, portal: false},

		{blocker: 1111, base: 24, props: 0, cover: 0, portal: false},
		{blocker: 1111, base: 25, props: 0, cover: 0, portal: false},
		{blocker: 1111, base: 26, props: 0, cover: 0, portal: false},
		{blocker: 1111, base: 28, props: 0, cover: 0, portal: false},
		{blocker:    0, base: 29, props: 0, cover: 0, portal: false},


		{blocker: 1111, base: 30, props: 0, cover: 0, portal: false},
		{blocker: 1000, base: 31, props: 0, cover: 0, portal:     0},
		{blocker: 1000, base: 32, props: 0, cover: 0, portal:     1},
		{blocker: 1111, base: 33, props: 0, cover: 0, portal: false},
		{blocker:    0, base: 34, props: 0, cover: 0, portal: false},

		{blocker: 1111, base: 35, props: 0, cover: 0, portal: false},
		{blocker: 1111, base: 37, props: 0, cover: 0, portal: false},
		{blocker: 1111, base: 38, props: 0, cover: 0, portal: false},
		{blocker: 1111, base: 39, props: 0, cover: 0, portal: false},
		{blocker: 1111, base: 40, props: 0, cover: 0, portal: false},


		{blocker: 1111, base: 41, props: 0, cover: 0, portal: false},
		{blocker: 1111, base: 42, props: 0, cover: 0, portal: false},
		{blocker: 1111, base: 43, props: 0, cover: 0, portal: false},
		{blocker: 1111, base: 44, props: 0, cover: 0, portal: false},
		{blocker:    0, base: 46, props: 0, cover: 0, portal: false},

		{blocker: 1111, base: 47, props: 0, cover: 0, portal: false},
		{blocker: 1111, base: 48, props: 0, cover: 0, portal: false},
		{blocker: 1111, base: 49, props: 0, cover: 0, portal: false},
		{blocker: 1010, base: 50, props: 0, cover: 0, portal:     0},
		{blocker: 1001, base: 51, props: 0, cover: 0, portal:     1},

		{blocker: 1111, base: 52, props: 0, cover: 0, portal: false},
		{blocker:    0, base: 53, props: 0, cover: 0, portal: false},
		{blocker: 1010, base: 50, props: 0, cover: 0, portal:     2},
		{blocker: 1001, base: 51, props: 0, cover: 0, portal:     3}
	],

	eventTiles: [
		{location:31, target: {map: 'second', tile: 20 }},
		{location:32, target: {map: 'third', tile: 20 }}
	],

	npcs: [
		{ref: 'npc-1', x: 3, y: 5},
		{ref: 'npc-2', x: 6, y: 8}
	],

	portals: [
		{location:31, map: 'second', x: 4, y: 9},
		{location:32, map: 'second', x: 5, y: 9},
		{location:31, map: 'third', x: 20, y: 9},
		{location:32, map: 'third', x: 21, y: 9}
	]
};