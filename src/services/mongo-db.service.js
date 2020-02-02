import mongoose from 'mongoose';
import userSchema from '../models/mongo/user.model';
import songSchema from '../models/mongo/song.model';

class MongoService {

  get client() {
    return this.dbClient;
  }

  connect() {
    mongoose.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true });

    this.dbClient = mongoose.connection;

    this.dbClient.on('error', console.error.bind(console, 'connection error:'));
    this.dbClient.once('open', () => {
      console.log('Succesfully connected to database')
    });

  }

  init() {
    this.models = {
      User: mongoose.model('User', userSchema),
      Song: mongoose.model('Song', songSchema)
    }

  }

}

const mongoService = new MongoService();
export default mongoService;
