var http = require('http'),
    https = require('https'),
    express = require('express'),
    app = express(),
    server = http.createServer(app),
    path = require('path'),
    io = require('socket.io').listen(server);

app.use(express.static('public'));

// Mount statics
app.use(express.static(path.join(__dirname, '../vendor')));
app.use(express.static(path.join(__dirname, '../client')));


server.listen(8080);

console.log('server started');

io.on('connection', function (socket) {
    socket.emit('hello', {hello: 'hello new client'});
    console.log('new client connected');

    socket.on('generate', function () {
        checkInvite(socket);
    });

    checkInvite(socket);
});

function checkInvite(socket) {
    var url = 'https://account.oneplus.net/invite/claim/';
    var body = '',
        id = makeid();

    https.get(url + id, function (resp) {
        resp.on('data', function (chunk) {
            body += chunk;
        });
        resp.on('end', function () {
            socket.emit('invite', {id: id, response: body, url: url + id});
        });
    });

    console.log('new invite checking');
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        text += i < 3 ? '-' : '';
    }

    return text;
}