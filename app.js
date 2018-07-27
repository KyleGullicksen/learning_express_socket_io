var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var socket_io = require('socket.io');
var http = require('http');

var indexRouter = require('./routes/index');

//configure our app
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//module.exports = app;

//create the http server and websocket handler
var httpServer = http.Server(app);
var io = socket_io(httpServer);

//configure the event handlers
io.on('connection', function (socket) {
    console.log('A user has connected')
});

httpServer.listen(3000, function () {
    console.log("Listening on port 3000");
});
