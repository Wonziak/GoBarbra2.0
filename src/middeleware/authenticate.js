
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
import mongoDbService from '../services/mongo-db.service'

export default new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'secret'
    },
    function (jwtPayload, cb) {

        return mongoDbService.client.model('User').findOne({id: jwtPayload.id})
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
);