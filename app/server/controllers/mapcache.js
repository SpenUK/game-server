'use strict';

var fs = require('fs');
var _ = require('underscore');

function parseClientMap (name, map) {
	map.name = name;
	return {
		name: map.name,
		height: map.height,
		width: map.width,
		tilewidth: map.tilewidth,
		tileheight: map.tileheight,
		collisions: getCollisionLayer(map),
		objectlayers: getObjectLayers(map),
		portals: getPortals(map),
		properties: map.properties,
		tilesets: getTilesets(map),
		tilesrcmap: getTileSrcMap(map),
		tilelayers: getTileLayers(map),
		tiles: getTiles(map),
		version: map.version
	};
}

function parseServerMap (name, map) {
	map.name = name;
	return {
		name: map.name,
		height: map.height,
		width: map.width,
		// tilewidth: map.tilewidth,
		// tileheight: map.tileheight,
		collisions: getCollisionLayer(map), // sever needs to kno about collisions?
		objectlayers: getObjectLayers(map),
		interactions: getInteractions(map),
		portals: getPortals(map), // portals needed?
		properties: map.properties,
		tiles: getTiles(map),
		testLayer: getTestLayer(map),
		version: map.version
	};
}

function getInteractions (map) {
	var layer = _.first(_.filter(map.layers, function (layer) {
		return layer.type === 'objectgroup' && layer.name.toLowerCase() === 'interactions';
	})),
	tilewidth = map.tilewidth,
	tileheight = map.tileheight;

	if (!layer) {
		return [];
	}

	return _.map(layer.objects, function (interaction) {
		// console.log(interaction.name);
		return {
			id: interaction.properties.id, // or could use interaction.name?
			// could grab the details from a hash here?
			x: Math.floor(interaction.x / tilewidth),
			y: Math.floor(interaction.y / tileheight)
		};
	});
}

function getTestLayer (map) {
	return _.chain(map.layers).filter(function (layer) {
		return layer.type === 'tilelayer' && layer.name.toLowerCase() !== 'collisions';
	}).map(function (layer) {
		var width = layer.width,
			height = layer.height;

		return {
			tiles: _.map(layer.data, function (tile, i) {
				var x = i % width,
					y = parseInt(i / width);

				return 'i:' + i + ' x:' + x + ' y:' + y;
			})
		};
	});
}

function getTileSrcMap (map) {
	var sourceMap = _.chain(map.tilesets).sortBy('firstgid').map(function (tileset) {
    	return _.map(_.range(0, tileset.tilecount + 1), function () {
            return {
            	src: (tileset.image || '').replace(/^.*[\\\/]/, 'images/'),
            	width: tileset.columns,
            	height: tileset.tilecount / tileset.columns,
            	firstgid: tileset.firstgid

            };
        });
    }).flatten(true).value();

    return sourceMap;
}

function getTileLayers (map) {
	var tileSrcMap = getTileSrcMap(map);

	return _.chain(map.layers).filter(function (layer) {
		return layer.type === 'tilelayer' && layer.name.toLowerCase() !== 'collisions';
	}).map(function (layer) {
		var width = layer.width,
			height = layer.height,
			zIndex = layer.properties && layer.properties.zIndex ? parseInt(layer.properties.zIndex) : 0;

		return _.extend({}, layer, {
			tiles: _.chain(layer.data).map(function (tile, i) {
				var x = i % width,
					y = parseInt(i / width),
					tilesetData = tileSrcMap[tile],
					tilesetIndex = tile - tilesetData.firstgid;

				return {
					i: i,
					index: tile,
					tileset: {
						src: tilesetData.src,
						x: tilesetIndex % tilesetData.width,
						y: Math.floor(tilesetIndex / tilesetData.width),
					},
					zIndex: zIndex,
					x: x,
					y: y
				};
			}).filter(function (tile) {
				return tile > 0;
			}).value(),
			zIndex: zIndex,
			data: undefined
		});
	});
}

function getPortals (map) {
	var layer = _.first(_.filter(map.layers, function (layer) {
		return layer.type === 'objectgroup' && layer.name.toLowerCase() === 'portals';
	}));

	return _.extend({}, {
		type: 'portals',
		objects: _.map(layer.objects, function (object) {

			return {
				x: object.x / map.tilewidth,
				y: object.y / map.tileheight,
				target: {
					map: object.properties.map,
					x: parseInt(object.properties.x),
					y: parseInt(object.properties.y)
				}
			};
		})
	});
}

function getObjectLayers (map) {
	return _.chain(map.layers).filter(function (layer) {
		return layer.type === 'objectgroup' && layer.name.toLowerCase() !== 'collisions' && layer.name.toLowerCase() !== 'interactions' && layer.name.toLowerCase() !== 'portals';
	});
}

function getCollisionLayer (map) {
	var layer = _.first(_.filter(map.layers, function (layer) {
		return layer.type === 'objectgroup' && layer.name.toLowerCase() === 'collisions';
	}));

	return _.extend({}, {
		type: 'collisions',
		objects: _.map(layer.objects, function (object) {
			return {
				code: parseInt(object.name),
				x: object.x / map.tilewidth,
				y: object.y / map.tileheight
			}
		})
	});
}

function getTilesets (map) {
	return _.map(map.tilesets, function (tilemap) {
		return _.extend({}, tilemap, {
			src: (tilemap.image || '').replace(/^.*[\\\/]/, 'images/'),
			image: null
		});
	});
}

function getTiles (map) {
	var tileSrcMap = getTileSrcMap(map);

	return _.chain(map.layers).filter(function (layer) {
		return layer.type === 'tilelayer';
	}).map(function (layer) {
		var width = layer.width,
			height = layer.height,
			zIndex = layer.name === 'base' ? 0 : 1;

		return _.chain(layer.data).map(function (tile, i) {
			var x = i % width,
				y = parseInt(i / width),
				tilesetData = tileSrcMap[tile],
				tilesetIndex = tile - tilesetData.firstgid;

			return {
				index: tile,
				tileset: {
					src: tilesetData.src,
					x: tilesetIndex % tilesetData.width,
					y: Math.floor(tilesetIndex / tilesetData.width),
				},
				tileSize: 32,
				width: 1,
				height: 1,
				offsetY: 0,
				offsetX: 0,
				zIndex: zIndex,
				sourceX: tilesetIndex % tilesetData.width,
				sourceY: Math.floor(tilesetIndex / tilesetData.width),
				x: x,
				y: y
			};
		}).filter(function (tile) {
			return tile.index > 0;
		}).value();
	}).flatten(true);
}

module.exports = {

	clientMapCache: {},

	serverMapCache: {},

	dataPath: __dirname + '/../.././../gamedata/examplegame2/maps/',

	getClientMap: function (mapName) {
		// var cachedData = this.clientMapCache[mapName];
		// return cachedData || this.setClientMap(mapName);
		return this.clientMapCache[mapName];
	},

	setClientMap: function (mapName) {
		var filePath = this.dataPath + mapName + '.json',
			mapData = fs.existsSync(filePath) ? require(filePath) : false;

		this.clientMapCache[mapName] = parseClientMap(mapName, mapData);

		return this.clientMapCache[mapName];
	},

	getServerMap: function (mapName) {
		// var cachedData = this.serverMapCache[mapName];
		// return cachedData || this.setServerMap(mapName);
		return this.serverMapCache[mapName];
	},

	setServerMap: function (mapName) {
		var filePath = this.dataPath + mapName + '.json',
			mapData = fs.existsSync(filePath) ? require(filePath) : false;

		this.serverMapCache[mapName] = parseServerMap(mapName, mapData);

		return this.serverMapCache[mapName];
	}

};