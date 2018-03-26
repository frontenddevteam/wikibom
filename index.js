const app = require('express')();
const fs = require('fs');
const http = require('http').Server(app);
const questionHandler = require('./module/questionHandler');
const sessionHandler = require('./module/sessionHandler');
const config = require('./module/config');
const gameHandler = require('./module/gameHandler');
const host = '192.168.1.105';
const localHost = 'localhost';
config.filter(app);

sessionHandler(app);

questionHandler(app);

gameHandler.handleHttp(app, config.auth);

http.listen(config.port,'localhost',(err)=>{
    if(err) console.log('Server start fail')
    console.log('Server started on port '+config.port);
    gameHandler.initSocket(http);
    gameHandler.operatorSocketNS();
})





