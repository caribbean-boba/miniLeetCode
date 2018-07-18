const express = require('express');
const app = express();
var restApiRouter = require('./routes/rest-api');
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var path = require("path");
var http = require('http');

var socket_io = require('socket.io');
var io = socket_io();
var editorSocketService = require('./services/societ-io-service')(io);

mongoose.connect('mongodb://yanhan:lyh19970409@ds249415.mlab.com:49415/minileetcode', { useNewUrlParser: true });

app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
app.use('/api',restApiRouter);
app.use('/',function(req, res){
    res.sendFile("index.html", {root: path.join(__dirname, '../public')});
});

// app.listen(3000, () => console.log('Example app listening on port 3000!'));


var server = http.createServer(app);
io.attach(server);
server.listen(3000);

server.on('error', onError);
function onError(error){
    throw error;
}
server.on('listening', onListening);
function onListening(error){
    var addr = server.address();
    var bind = typeof addr == 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    console.log('Listening on' + bind);
}