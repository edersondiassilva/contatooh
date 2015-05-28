var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');

module.exports = function() {
    var app = express();

    // configuração de ambiente
    app.set('port', process.env.PORT);

    // middleware
    app.use(express.static('./public'));

    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    app.use(cookieParser());
    app.use(session({
        secret: 'homem avestruz',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(helmet());
    app.disable('x-powered-by');
    app.use(helmet.hidePoweredBy({
        setTo: 'PHP 5.5.14'
    }));
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());

    load('models', {
            cwd: 'app'
        })
        .then('controllers')
        .then('routes')
        .into(app);

    // se nenhum rota atender, direciona para página 404
    app.get('*', function(req, res) {
        res.status(404).render('404');
    });

    return app;
};