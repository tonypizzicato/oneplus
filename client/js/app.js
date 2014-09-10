/**
 * Created by pizzicato on 10/09/14.
 */


$(document).ready(function () {
    var socket = io('http://localhost');
    socket.on('hello', function (data) {
        console.log(data.hello);
    });

    socket.on('invite', function (data) {

        if (data.response.indexOf('No invite with that code exists') > -1) {
            var h = $('<h4></h4>').text('No such invite ' + data.id);

            $('body').append(h);

            _.delay(socket.emit.bind(socket), 1000, 'generate');
        } else {
            var h = $('<h4></h4>').text(data.id),
                a = $('<a></a>').text(data.url).attr('href', data.url),
                div = $('<div></div>').html(data.response);
            $('body').html('').append(h).append(a).append(div);
        }
    })
});