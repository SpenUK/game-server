// 'use strict';

var express = require('express');
// var requireAuthenitication = require('../middleware/requireAuth');
// var Page = require('../baseClasses/page');

// var users = {};

// function generateKey (string) {
// 	// obviously make this betterer later
// 	return string + 24242;
// }

// var page = new Page({
// 	title: 'Chat!!'
// });

// page.title = 'Chat!';

// page.addStylesheet('css/modules/chat.css');
// page.addBodyScript('js/vendor/socket-io-client.js');
// page.addBodyScript('js/modules/chat.js');

// module.exports.page = page;

module.exports.router = new express.Router();

module.exports.initialize = function (app) {

	function chat(req, res) {
		var temp = 'chat/templates/chat';
		console.log(temp);
		// var user = req.user;
		// var userKey = generateKey(user.username);

		// users[userKey] = user;

		// var data = page.JSON();
		data = {
			title: 'chat'
		};
		// data.pageData.token = userKey;

	  // res.render('chat/templates/chat', data);
	  res.render(temp, data);
	}

	// var nsp = app.io.of('/chat');

	// nsp.on('connection', function(socket){
		// var userKey = socket.handshake.query.token;

// 		console.log(userKey);

// 		socket.on('disconnect', function(){
// 	    console.log('chat disconnected');
// 	  });

// 	  if (users[userKey]) {
// 	  	socket.on('chat message', function(msg) {
// 				var data = {
// 					username: users[userKey].username,
// 					msg: msg
// 				};
// 		    socket.broadcast.emit('chat message', data);
// 		  });
// 	  }

// 	});

	this.router.get('/chat', chat);

	return this;
};