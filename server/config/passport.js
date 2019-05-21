const JwtStrategy = require("passport-jwt/lib").Strategy;
const ExtractJwt = require("passport-jwt/lib").ExtractJwt;

const User = require("../models/User");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts,(jwtPayload,done) => {
        User
            .findById(jwtPayload.id)
            .then(user => {
                if(user){
                    return done(null,user);
                } else {
                    return done(null,false);
                }
            })
            .catch(err => console.log(err))
    }));
};