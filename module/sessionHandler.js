const config = require('./config');
const fs = require('fs');

module.exports = (app) => {
    app.get('/login', (req, res) => {
        fs.readFile('./app/login.html', 'utf8', (err, data) => {
            res.end(data);
        })
    })

    app.post('/login', (req, res) => {
        if (!req.body.username || !req.body.password || req.body.username !== config.accounts.username || req.body.password !== config.accounts.password) {
            console.log('login fail');
            fs.readFile('./app/login.html', 'utf8', (err, data) => {
                res.end(data);
            })
        } else if (req.body.username === config.accounts.username && req.body.password === config.accounts.password) {
            req.session.user = config.accounts.username;
            req.session.admin = true;
            console.log("login success!");
            res.redirect(req.query.path);
        }
    })

    app.get('/logout', (req, res) => {
        console.log('logout');
        req.session.destroy();
        res.redirect('/');
    })
}