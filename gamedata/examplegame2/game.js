'use strict';

var _ = require('underscore'),
	startMap = require('./maps/start-tiled.json'),
	secondMap = require('./maps/second-tiled.json'),
	thirdMap = require('./maps/third-tiled.json');

// fixes data for the client. Needs to be a shared util though.
function parseMap (map) {
	_.each(map.tilesets, function (tilemap) {
		tilemap.src = (tilemap.image || '').replace(/^.*[\\\/]/, 'images/'),
		delete tilemap.image;
	});


	var collisions = _.chain(map.layers).filter(function (layer) {
		return layer.type === 'objectgroup' && layer.name.toLowerCase() === 'collisions';
	}).map(function (layer) {
		var objects = _.map(layer.objects, function (object) {
			return {
				code: parseInt(object.name),
				x: object.x / map.tilewidth,
				y: object.y / map.tileheight
			};
		});

		return {
			type: 'collisions',
			objects: objects
		};
	}).first();

	var portals = _.chain(map.layers).filter(function (layer) {
		return layer.type === 'objectgroup' && layer.name.toLowerCase() === 'portals';
	}).map(function (layer) {
		var objects = _.map(layer.objects, function (object) {
			return {
				x: object.x / map.tilewidth,
				y: object.y / map.tileheight,
				target: {
					map: object.properties.map,
					x: parseInt(object.properties.x),
					y: parseInt(object.properties.y)
				}
			};
		});

		return {
			type: 'collisions',
			objects: objects
		};
	}).first();

	var tilelayers = _.chain(map.layers).filter(function (layer) {
		return layer.type === 'tilelayer';
	}).each(function (layer) {
		layer.tiles = layer.data
		delete layer.data;
	});

	var objectlayers = _.chain(map.layers).filter(function (layer) {
		return layer.type === 'objectgroup' && layer.name.toLowerCase() !== 'collisions' && layer.name.toLowerCase() !== 'portals';
	});

	return {
		name: map.name,
		height: map.height,
		width: map.width,
		tilewidth: map.tilewidth,
		tileheight: map.tileheight,
		tilelayers: tilelayers,
		portals: portals,
		objectlayers: objectlayers,
		collisions: collisions,
		version: map.version,
		properties: map.properties,
		tilesets: map.tilesets,
	};
}

startMap.name = 'start';
secondMap.name = 'second';
thirdMap.name = 'third';

module.exports = {
	defaultMap: 'start',
	maps: [
		parseMap(startMap),
		parseMap(secondMap),
		parseMap(thirdMap)
	]
};