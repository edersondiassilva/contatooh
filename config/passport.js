var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');
module.exports = function() {
    var Usuario = mongoose.model('Usuario');
    passport.use(new GitHubStrategy({
        clientID: 'e04b66af543f9731a65d',
        clientSecret: '3c9de6bd184ccb57684e672efc79f1094d420b29',
        callbackURL: 'https://contatooh-edersondiassilva.c9.io/auth/github/callback'
    }, function(accessToken, refreshToken, profile, done) {
        Usuario.findOrCreate({
                "login": profile.username
            }, {
                "nome": profile.username
            },
            function(erro, usuario) {
                if (erro) {
                    console.log(erro);
                    return done(erro);
                }
                return done(null, usuario);
            }
        );
    }));

    passport.serializeUser(function(usuario, done) {
        done(null, usuario._id);
    });

    passport.deserializeUser(function(id, done) {
        Usuario.findById(id).exec()
            .then(function(usuario) {
                done(null, usuario);
            });
    });
};