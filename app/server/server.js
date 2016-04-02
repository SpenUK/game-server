var socketio = require('socket.io');
var express = require("express");
var http = require("http");
var mongoose = require('mongoose');

var routes = require('./routes');
var setViewEngine = require('./config/views/handlebars');

var port = process.env.PORT || 5000;

var app = express();

var server = http.createServer(app);
var io = socketio(server);

var router = new express.Router();
router.get('/', routes.display);
router.get('/controller/:id?', routes.controller);

setViewEngine(app);
app.use(express.static('app/public'));
app.set('views', 'app/server' + '/views');

// app.connect = function (connectionString) {
//   mongoose.connect(connectionString);

//   var db = mongoose.connection;
//   db.on('error', function(){
//     console.log('mongoose connection error');
//   });

//   db.once('open', function(){
//     console.log('mongoose connection success');
//   });
// };

// app.use(require('connect-livereload')({
//   port: 35729
// }));

// app.connect('mongodb://localhost/gamedata');

app.use(router);

var gameController = require('./controllers/game');
gameController.initialize();

var socketController = require('./controllers/sockets');
socketController(io);

server.listen(port);

console.log("http server listening on %d", port);

