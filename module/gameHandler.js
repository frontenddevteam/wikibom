

const fs = require('fs');
const dateFormat = require('dateformat');
let clientIPs = {};
let io;

let initSocket = (http) => {
    io = require('socket.io')(http);
    // send clock 
    // clock(io);
    // io.on('connection', function (socket) {
    //     let ip = socket.request.connection.remoteAddress;
    //     if (!clientIPs[ip])
    //         clientIPs[ip] = {};
    //     clientIPs[ip].connected = true;

    //     console.log('clientIPs[ip].role ' + clientIPs[ip].role);
    //     if (clientIPs[ip].role === 'operator')
    //         socket.emit('NUM_OF_CANDIDATE', { mess: Object.keys(clientIPs).length - 1 });
    //     socket.on('START_GAME', (payload) => {
    //         socket.broadcast.emit('START_GAME', { mess: 'from server' });
    //         socket.emit('START_GAME', { mess: 'from server hihi' });

    //         //socket.emit('START_GAME',{mess : 'from server'});
    //     })
    // })
}

let operatorSocketNS = () => {
    var opnsp = io.of('/operatornsp');
    opnsp.on('connection', function (socket) {
        console.log('Ip:    ' + socket.request.connection.remoteAddress);
        
        opnsp.emit('WELCOME', 'everyone!');
        
        socket.on('START_GAME', (data) => {
            console.log('From client ' + data.mess);
            opnsp.emit('START_GAME', {mess : 'Start game'});
        })
        socket.on('SEND_POP_QUIZ', (data) => {
            console.log('From client ' + data.mess);
            opnsp.emit('SEND_POP_QUIZ', {mess : 'Send pop quiz'});
        })
    });



}

let candidateSocketNS = () => {
    var nsp = io.of('/candidatensp');
    nsp.on('connection', function (socket) {
        console.log('someone   ' + socket.request.connection.remoteAddress);
        nsp.emit('WELCOME', 'hi candidate!');

    });
}

let clock = (io) => {
    setInterval(() => {
        console.log('broadcast clock ' + Date.now());
        io.emit('CLOCK', { mess: dateFormat(new Date(), 'HH:MM:ss') });
    }, 1000)
}

let handleHttp = (app, auth) => {
    app.get('/game', auth, (req, res) => {
        let role = 'operator'; req.query.role;
        fs.readFile('./game/' + role + '.html', 'utf8', (err, data) => {
            res.end(data);
        })
    })

}



module.exports = {
    initSocket,
    handleHttp,
    operatorSocketNS
}