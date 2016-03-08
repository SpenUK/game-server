'use strict';

var exphbs = require('express-handlebars');
		// helpers = require('./helpers');

module.exports = function (app) {

	// var collectPartialDirs = function () {
	// 	return ['app/server/site/templates/partials/'];
	// };

	var hbs = exphbs.create({
    	layoutsDir: 'app/server/views',
    	defaultLayout: 'layout'
    	// helpers      : helpers,
    	// partialsDir: collectPartialDirs()
	});


	app.engine('handlebars', hbs.engine);
	app.set('view engine', 'handlebars');

	return app.engine;
};