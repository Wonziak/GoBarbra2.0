
import * as  passportJWT from 'passport-jwt';
import mongoDbService from '../services/mongo-db.service'
import { env } from '../../config/configuration';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export default new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.jwtSecret
},
    function (jwtPayload, cb) {

        return mongoDbService.client.model('User').findOne({ id: jwtPayload.id })
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
);