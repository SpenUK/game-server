var mapCache = require('../controllers/mapcache'),
	playerData = require('../../../gamedata/exampleplayer'),
	npcData = require('../../../gamedata/npcs/npcs');

exports.display = function(req, res){
	var stylesheets = [
		'/css/core.css',
		'/css/display.css',
		'/fontawesome/css/font-awesome.css'
	];

	var scripts = [
		'/socket.io/socket.io.js',
		'js/vendor/qrcode.js',
		'/js/display.js',
	];

	var maps = [
		mapCache.getClientMap('start'),
		mapCache.getClientMap('second'),
		mapCache.getClientMap('third'),
		mapCache.getClientMap('third-shop-one'),
		mapCache.getClientMap('third-shop-two')
	];

	res.render('display', {
		title: 'Display',
		stylesheets: stylesheets,
		scripts: scripts,
		initialData: JSON.stringify({
			npcs: npcData,
			player: playerData,
			map: {
				defaultMap: 'start', // will be replace by player data eventually, so for now this is fine
				maps: maps
			}
		})
	});
};

exports.controller = function (req, res) {
	var token = req.params.id;

	var stylesheets = [
		'/css/core.css',
		'/css/controller.css',
		'/fontawesome/css/font-awesome.css'
	];

	var scripts = [
		'/socket.io/socket.io.js',
		'/js/controller.js',
	];

	res.render('controller', {
		title: 'Controller',
		stylesheets: stylesheets,
		scripts: scripts,
		initialData: JSON.stringify({
			token: token
		})
	});
};

exports.controlCode = function (req, res) {
	var token = req.params.id;

	var stylesheets = [
		'/css/core.css',
		'/css/controller.css',
		'/fontawesome/css/font-awesome.css'
	];

	var scripts = [
		'/socket.io/socket.io.js',
		'/js/controller.js',
	];

	res.render('controller', {
		title: 'Controller',
		stylesheets: stylesheets,
		scripts: scripts,
		initialData: JSON.stringify({
			token: token
		})
	});
};