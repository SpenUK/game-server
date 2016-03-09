'use strict';

var startMap = require('./maps/start'),
		secondMap = require('./maps/second'),
		thirdMap = require('./maps/third');

module.exports = {
		defaultMap: 'start',
		maps: {
			'start' : startMap,
			'second' : secondMap,
			'third' : thirdMap
		}
};