const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const port  = 8080;
const limitSize = '50mb';
const accounts = {
    username: '1',
    password: '1'
};

let auth = function (req, res, next) {
    
    if(req.path.indexOf('/login') !== -1){
        next();
    }
    else if (req.session && req.session.user === accounts.username && req.session.admin)
        return next();
    else
        return res.redirect('/login?path='+req.path);
};

let filter = (app)=>{
    app.use(bodyParser.json({ limit: limitSize }));
    app.use(bodyParser.urlencoded({ limit: limitSize, extended: false }));
    //app.use(express.static('./app/'));
    app.use(express.static('./public/'));
    //app.use('/app.js',express.static('./app/app.js'));
    //app.use('/app.css',express.static('./app/app.css'));
    
    app.use(session({
        secret: 'wimapp2018',
        resave: true,
        saveUninitialized: true
    }));
    app.use(auth);
    app.use(express.static('./app/'));
    app.use(express.static('./game/'));
    
}
module.exports = {
    port,
    limitSize,
    accounts,
    auth,
    filter
}
