var mapData = require('../../../gamedata/examplegame2/game'),
	playerData = require('../../../gamedata/exampleplayer');

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

	res.render('display', {
		title: 'Display',
		stylesheets: stylesheets,
		scripts: scripts,
		initialData: JSON.stringify({
			map: mapData,
			player: playerData
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