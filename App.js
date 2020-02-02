import express from 'express'
import routesHandler from './src/routes/routes-handler'
import bodyParser from 'body-parser';
import mongoDbService from './src/services/mongo-db.service';
import passport from "passport";
import jwtAuthenticate from './src/middeleware/jwt-authenticate';

const app = express();

passport.use(jwtAuthenticate);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoDbService.connect();
mongoDbService.init();

app.get('/song',passport.authenticate('jwt', { session: false }), routesHandler.getSong)
app.post('/song/add',passport.authenticate('jwt', { session: false }), routesHandler.addSong)
app.post('/user/register', routesHandler.registerUser)
app.post('/user/login', routesHandler.loginUser)
app.put('/user/update',passport.authenticate('jwt', { session: false }), routesHandler.updateUser)
app.get('/*', routesHandler.notFound)
 
app.listen(3000, () => {
    console.log('listening on port 3000')
})