var socketio = require('socket.io');
var express = require("express");
var http = require("http");

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

app.use(router);

var socketController = require('./controllers/sockets');
socketController(io);

server.listen(port);

console.log("http server listening on %d", port);

