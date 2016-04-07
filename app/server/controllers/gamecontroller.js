'use strict';

var _ = require('underscore');
var mapCache = require('../controllers/mapcache');
var datastore = require('../data/data');
var interactionsController = require('./interactions');
// var mongoose = require('mongoose');
// var Map = require('../models/map');
// var Entity = require('../db/models/entity');

var tokenController = require('./tokens');
var roomController = require('./rooms');
var displaySocketEvents = require('./sockets/displaysockethandler');
var controllerSocketEvents = require('./sockets/controllersockethandler');

var Game = {

	create: function () {
		var instance = Object.create(this);
		instance.constructor.apply(this, arguments);
		console.log('game created');
		return instance;
	},

	constructor: function () {
		this.generateToken();
		this.sockets = {};
	},

	assignSocket: function (socket) {
		var token = this.token;

		if (socket.isDisplay && !this.sockets.display) {
			roomController.hostRoom(token, socket);
			console.log('display socket applied');
			socket.emit('display socket applied', token);
		} else if (socket.isController && !this.sockets.controller) {
			roomController.joinRoom(token, socket);
			console.log('controller socket applied');
			socket.emit('controller socket applied', token);
		}
	},

	addPlayer: function () {
		// for the future maaaaan
	},

	generateToken: function () {
		this.token = tokenController.getUniqueId();
		tokenController.addToken(this.token);

		return this.token;
	},

	getControllerSocket: function () {
		return this.sockets.controller;
	},
	getDisplaySocket: function () {
		return this.sockets.display;
	},

	sockets: {
		display: null,
		controller: null
	}

}

module.exports =  {

	games: {},

	createGame: function (options) {
		var game = Game.create(options),
			token = game.token;

		this.games[token] = game;

		return game;
	},

	getGameByToken: function (token) {
		return this.games[token];
	},

	destroyGame: function (game) {
		var token = _.isString(game) ? game : game.token;

		delete this.games[token];
	}

};
