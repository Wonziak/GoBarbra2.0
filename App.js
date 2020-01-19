import express from 'express'
import routesHandler from './src/routes/routes-handler'
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/song', routesHandler.generateSong)
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000, () => {
    console.log('listening on port 3000')
})