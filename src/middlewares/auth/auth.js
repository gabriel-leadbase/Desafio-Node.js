const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../models/user.model');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log(jwt_payload);
    // TODO: vergificar caso não venha um id de usuário válido
    try {
        const user = await User.findById(jwt_payload.sub);
        if (user) {
            const dataToJson = JSON.parse(JSON.stringify(user));
            return done(null, dataToJson);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    } catch (err) {
        return done(err, false);
    }
}))

module.exports = passport;