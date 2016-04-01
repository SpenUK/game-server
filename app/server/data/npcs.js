module.exports = {
	'10000' : {
		name: 'npc-1',
		spriteMap: {
			src: 'images/3264player-green.png',
			tilesX: 1,
			tilesY: 2,
			tileSize: 32,
			height: 64,
			width: 32
		},
		tileSize: 32,
		height: 2,
		width: 1,
		offsetY: -1,
		offsetX: 0,
		behaviours: [
			'wanderer'
		]
	},
	'10001' : {
		name: 'npc-2',
		spriteMap: {
			src: 'images/3264player-pink.png',
			tilesX: 1,
			tilesY: 2,
			tileSize: 32,
			height: 64,
			width: 32
		},
		height: 2,
		width: 1,
		tileSize: 32,
		offsetY: -1,
		offsetX: 0,
		behaviours: [
			'wanderer'
		]
	},
	'10002' : {
		name: 'vendor-1',
		spriteMap: {
			src: 'images/3264player-pink.png',
			tilesX: 1,
			tilesY: 2,
			tileSize: 32,
			height: 64,
			width: 32
		},
		height: 2,
		width: 1,
		tileSize: 32,
		offsetY: -1,
		offsetX: 0,
		behaviours: [
			'vendor'
		]
	},
	'10003' : {
		name: 'vendor-2',
		spriteMap: {
			src: 'images/3264player-pink.png',
			tilesX: 1,
			tilesY: 2,
			tileSize: 32,
			height: 64,
			width: 32
		},
		height: 2,
		width: 1,
		tileSize: 32,
		offsetY: -1,
		offsetX: 0,
		behaviours: [
			'vendor'
		]
	}
};