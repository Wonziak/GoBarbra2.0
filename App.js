import express from 'express'
import routesHandler from './src/routes/routes-handler'
import bodyParser from 'body-parser';
import mongoDbService from './src/services/mongo-db.service';
const passport = require("passport");
const auth = require('./src/middeleware/authenticate').default;


const app = express();

passport.use(auth);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

mongoDbService.connect();
mongoDbService.init();

app.post('/register', routesHandler.registerUser)
app.post('/login', routesHandler.loginUser)
app.post('/song/add',passport.authenticate('jwt', { session: false }), routesHandler.addSong)
app.post('/song',passport.authenticate('jwt', { session: false }), routesHandler.generateSong)
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000, () => {
    console.log('listening on port 3000')
})